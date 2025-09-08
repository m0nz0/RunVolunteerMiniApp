import React, {FC, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import VerstService from "../../Services/VerstService";
import {Alert, Spinner} from "react-bootstrap";
import {AppButtons} from "../../Const/AppButtons";

interface Props {
}

export const RosterComponent: FC<Props> = (props: any) => {

    const location = useLocation();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [allowedLocations, setAllowedLocations] = useState<any[]>()
    const {locationId, calendarId} = useParams();

    useEffect(() => {
            let isMounted = true;

            const loadData = async () => {
                try {
                    let data = await VerstService.getAllowedLocations(location.state.token)
                    setAllowedLocations(data)
                    if (!data.some(x => x.id === (Number)(locationId))) {
                        setError("Загрузка данной локации в NRMS для вас недоступна")
                    }
                } catch
                    (err) {
                    if (isMounted) setError((err as Error).message);
                } finally {
                    if (isMounted) setLoading(false);
                }
            };

            loadData();
            return () => {
                isMounted = false;
            };
        }, [location.state.token]
    )

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant={"danger"}>
            <p className={"text-center"}>{error}</p>
            <div className="d-flex justify-content-center">
                {AppButtons.ToTeamFromExistingDate((Number)(locationId), (Number)(calendarId), "К команде")}
            </div>
        </Alert>
    }

    return (
        <div>
            <p> token: {location.state.token}</p>
            <p> locationId: {locationId}</p>
            <p> calendarId: {calendarId}</p>
            <p>Это будет будущее сравление ростера</p>
            {
                allowedLocations?.map(x => <p>{x.name}</p>)
            }
        </div>
    )
}
