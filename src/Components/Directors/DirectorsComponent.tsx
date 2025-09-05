import React, {FC, useEffect, useState} from "react";
import {DirectorsData} from "../../types";
import {useParams} from "react-router-dom";
import LocationService from "../../Services/LocationService";
import {Alert, Button, Spinner} from "react-bootstrap";
import {ScheduleUserCardComponent} from "../UserCard/ScheduleUserCardComponent";

interface Props {
}

export const DirectorsComponent: FC<Props> = (props) => {

    const [data, setData] = useState<DirectorsData>()
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId} = useParams<{ locationId: string }>();
    const [toast, setToast] = useState<boolean>(false)

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                let data = await LocationService.locationDirectors(Number(locationId))
                setData(data)

            } catch (err) {
                if (isMounted) setError((err as Error).message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();
        return () => {
            isMounted = false;
        };
    }, [locationId]);

    const handleDirectorClick = async () => {
        if (data?.location.id) {
            await LocationService.createDirectorsRequest(data?.location.id)
                .then(() => setToast(true))
        } else {
            throw new Error("Нет данных локации")
        }
    }

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    if (toast) {
        return <Alert variant={"info"}>
            <p className={"text-center"}>Ваша заявка на роль директора локации {data?.location.name} отправлена на
                согласование. <br/>Дождитесь ее рассмотрения.";
            </p>
            <div className="d-flex justify-content-end">
                <Button onClick={() => window.location.reload()}>Ок</Button>
            </div>
        </Alert>
    }

    return (
        <div>
            {data && data.directors ?
                <div>
                    <p className={"text-center"}>
                        <h5>Директора локации {data?.location.name}</h5>
                    </p>
                    <ul>
                        {data &&
                            data.directors.length > 0
                            && data.directors.map(x => {
                                    let verstData = data.verstDirectors[x.tgId];
                                    let tgName = `${x.firstName ?? ""} ${x.lastName ?? ""}`.trim();
                                    let name = verstData ? verstData.full_name : tgName;

                                    return <li>
                                    <ScheduleUserCardComponent user={x} scheduledName={verstData?.full_name} />
                                        {/*<span>{name}</span>*/}
                                        {/*{x.tgLogin &&*/}
                                        {/*    <span> | <a href={`https://t.me/${x.tgLogin}`}>@{x.tgLogin}</a></span>}*/}
                                        {/*{verstData && <span> | <a*/}
                                        {/*    href={`https://5verst.ru/userstats/${verstData.id}`}>A{verstData.id}</a></span>}*/}
                                    </li>
                                }
                            )}
                    </ul>
                </div>
                :
                <div>Еще нет ни одного директора</div>}

            <div className={"text-center"}>
                <Button variant={"info"}
                        size={"sm"}
                        onClick={() => handleDirectorClick()}>Стать директором</Button>
            </div>
        </div>
    )


}
