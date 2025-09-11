import React, {FC, useEffect, useState} from "react";
import {DirectorsData} from "@/types";
import {useParams} from "react-router-dom";
import LocationService from "../../Services/LocationService";
import {Button, Spinner} from "react-bootstrap";
import {ScheduleUserCardComponent} from "../UserCard/ScheduleUserCardComponent";
import {toast} from "react-toastify";

export const DirectorsComponent: FC = () => {

    const [data, setData] = useState<DirectorsData>()
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId} = useParams<{ locationId: string }>();

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                let data = await LocationService.locationDirectors(Number(locationId))
                setData(data)

            } catch (err) {
                if (isMounted) {
                    toast.error((err as Error).message)
                }
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
                .then(() =>
                    toast.info(<p className={"text-center"}>Ваша заявка на роль директора
                        локации {data?.location.name} отправлена на
                        согласование. <br/>Дождитесь ее рассмотрения.";
                    </p>, {
                        onClose: () => window.location.reload()
                    }),
                )
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

                                    return <li>
                                        <ScheduleUserCardComponent user={x} scheduledName={verstData?.full_name}/>
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
