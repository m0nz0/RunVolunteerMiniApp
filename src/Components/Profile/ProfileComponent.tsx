import {FC, useEffect, useState} from "react";
import {ProfileData} from "@/types";
import {Accordion, Button, ButtonGroup, ButtonToolbar, Spinner} from "react-bootstrap";
import ProfileService from "../../Services/ProfileService";
import {useGlobalContext} from "@/Common/Context/GlobalContext";
import {Icons} from "@/Const/Icons";
import LinkService from "../../Services/LinkService";
import {AppButtons} from "@/Const/AppButtons";
import {toast} from "react-toastify";

export const ProfileComponent: FC = () => {

    const [profileData, setProfileData] = useState<ProfileData>()
    const [loading, setLoading] = useState<boolean>(true);
    const {locationDict} = useGlobalContext()

    useEffect(() => {
        let isMounted = true;
        if (Object.entries(locationDict).length === 0) {
            return;
        }
        const loadData = async () => {
            try {
                let data = await ProfileService.getProfile()
                setProfileData(data)
            } catch (err) {
                if (isMounted) {
                    console.error(err)
                    toast.error("Ошибка получения данных профиля")
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();
        return () => {
            isMounted = false;
        };
    }, [locationDict]);

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    const unlink = async (verstId: number | undefined) => {

        if (verstId) {
            await LinkService.unLink(verstId).then(() => {
                window.location.reload();
            })
        } else {
            toast.error("Не задан verstId при отвязке аккаунтов")
        }
    }
    // todo Прикрутить кнопки для ПД + большая доработка бэка

    return <div>
        <p className={"text-center"}>
            <h5>Профиль</h5>
        </p>
        <Accordion alwaysOpen={false} defaultActiveKey={"-1"}>
            <Accordion.Item key={"-1"} eventKey={"-1"}>
                <Accordion.Header>Данные в боте</Accordion.Header>
                <Accordion.Body>
                    <div>
                        <div>
                            <strong>Избранные локации:</strong>
                            <ul>
                                {profileData?.tgUser.favoriteLocations.map(f => {
                                    let location = locationDict[f.locationId]

                                    return <li key={location.id}>{location.name}</li>
                                })}
                            </ul>
                        </div>
                        <div>
                            <strong> Вы директор следующих локаций:
                            </strong>
                            <ul>
                                {profileData?.tgUser.locationDirectors.map(f => {
                                    let location = locationDict[f.locationId]
                                    return <li key={location.id}>{location.name}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ButtonToolbar className={"d-grip gap-2"}>
                            <ButtonGroup>
                                {profileData?.tgUser.verstIds.length === 0 &&
                                    AppButtons.LinkMain()
                                }
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            {profileData?.tgUser.verstIds.map(value => {
                let verstData = profileData?.allUsersDict.find(x => x.key.verstId === value.verstId)
                return <Accordion.Item key={value.verstId.toString()} eventKey={value.verstId.toString()}>
                    <Accordion.Header>{value.isMain ? Icons.Favorite : null}&nbsp;{verstData?.value.full_name}&nbsp;
                        {value.isMain && <span className={"text-primary"}>основной аккаунт</span>}
                        {!value.isMain && <span className={"text-info"}>дополнительный аккаунт</span>}
                    </Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <div style={{display: "grid"}}>
                                <strong>Данные аккаунта 5 вёрст:</strong>
                                <span style={{paddingLeft: 20}}>
                                    {verstData?.value.full_name} | A{verstData?.value.id}
                                </span>
                            </div>
                            <div style={{display: "grid"}}>
                                <strong>Домашняя локация:</strong>
                                <span style={{paddingLeft: 20}}>
                                    {verstData?.value.home_event}
                                </span>
                            </div>
                            <br/>
                            <span>Посмотреть или изменить данные своего профиля (имя и домашнюю локацию) вы можете в <a
                                href="https://my.5verst.ru/">личном кабинете</a></span>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <img src={`data:image/jpeg;base64,${verstData?.value.qr_code}`}/>
                        </div>
                        <div style={{justifyItems: "center"}}>
                            <ButtonToolbar className={"d-grip gap-2"}>
                                <ButtonGroup>
                                    {value.isMain && AppButtons.LinkAdditional()}
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button variant={"info"}
                                            size={"sm"}
                                            onClick={() => unlink(verstData?.value.id)}>
                                        Отвязать аккаунт</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            })}

        </Accordion>
    </div>
}
