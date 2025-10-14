import React, {FC, useState} from "react";
import {Alert, Button, ButtonGroup, ButtonToolbar, Card, Dropdown, DropdownButton} from "react-bootstrap";
import {TgUser, UserLocationDictItem} from "@/types";
import {LocationFlag} from "@/Const/LocationFlag";
import {AppButtons} from "@/Const/AppButtons";
import LocationService from "../../Services/LocationService";
import {useNavigate} from "react-router-dom";
import {Overlim} from "@/Const/TestConst";

interface Props {
    location: UserLocationDictItem,
    user: TgUser
}

export const LocationCardFooter: FC<Props> = (props) => {

    const navigate = useNavigate();
    let location = props.location;
    let canNewEntry = location.locationFlags.some(x => x === LocationFlag.IsBotActive)
    const [toast, setToast] = useState<boolean>(false)

    const handleOnOffClick = async () => {
        let locationId = props.location.verstId;
        let newActive = !props.location.botActive
        await LocationService.locationOnOff(locationId, newActive)
            .then(() => window.location.reload());
    }

    const handleFavoriteClick = async () => {
        let locationId = props.location.verstId;
        await LocationService.locationFavorite(locationId)
            .then(() => window.location.reload());
    }

    const handleDirectorClick = async () => {
        await LocationService.createDirectorsRequest(location.verstId)
            .then(() => setToast(true))
    }

    let addonList = []

    if (props.location.botActive) {


        if (!props.location.isRequested && !props.location.isDirected) {
            addonList.push(<Dropdown.Item as={"div"}
                                          onClick={() => handleDirectorClick()}>Стать организатором</Dropdown.Item>)
        }

        addonList.push(<Dropdown.Item as={"div"}>
            <div className={"w-100"}
                 onClick={() => handleFavoriteClick()}
            >{props.location.isFavorite ? "Исключить из избранного" : "Добавить в избранное"}</div>
        </Dropdown.Item>)


        addonList.push(<Dropdown.Item as={"div"}>
            <div onClick={() => navigate(`/locations/${location.verstId}/info/directors`)}>
                Список организаторов
            </div>
        </Dropdown.Item>)
    }
    if (location.isDirected || props.user.isAdmin) {
        addonList.length > 0 && addonList.push(<Dropdown.Divider/>)
        addonList.push(<Dropdown.Item as={"div"}>
            <div onClick={() => navigate(`/locations/${location.verstId}/info/position-type-admin`)}>
                Управление позициями
            </div>
        </Dropdown.Item>)

        if (Overlim.some(x => x == props.location.verstId)) {
            addonList.push(<Dropdown.Item as={"div"}>
                <div onClick={() => navigate(`/locations/${location.verstId}/info/position-limit-admin`)}>
                    Управление лимитами
                </div>
            </Dropdown.Item>)

            addonList.push(<Dropdown.Item as={"div"}>
                <div onClick={() => navigate(`/locations/${location.verstId}/info/position-settings-admin`)}>
                    Настройки позиций
                </div>
            </Dropdown.Item>)
        }
    }

    if (props.user.isAdmin) {
        addonList.length > 0 && addonList.push(<Dropdown.Divider/>)
        addonList.push(<Dropdown.Item as={"div"}>
            <div className={"w-100"}
                 onClick={() => handleOnOffClick()}
            >{props.location.botActive ? "Отключить" : "Включить"} в боте
            </div>
        </Dropdown.Item>)
    }

    if (toast) {
        return <Alert variant={"info"}>
            <p className={"text-center"}>Ваша заявка на роль организатора локации {location.name} отправлена на
                согласование. <br/>Дождитесь ее рассмотрения.";
            </p>
            <div className="d-flex justify-content-end">
                <Button onClick={() => window.location.reload()}>Ок</Button>
            </div>
        </Alert>
    }

    return (<Card.Footer>
            <ButtonToolbar className={"d-grip gap-2"}>
                {canNewEntry && AppButtons.NewEntryToSelectDate(location.verstId)}

                {location.botActive && AppButtons.WhoScheduled(location.verstId)}

                {addonList.length > 0 &&
                    <DropdownButton as={ButtonGroup}
                                    variant={"info"}
                                    size={"sm"}
                                    title="Дополнительно"
                                    id="location-addon">
                        {addonList.map((item, index) => <div key={index}
                                                             style={{cursor: "pointer", padding: 2}}>{item}</div>)}
                    </DropdownButton>}

            </ButtonToolbar>
        </Card.Footer>
    )
}
