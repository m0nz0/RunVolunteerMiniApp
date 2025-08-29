import {FC, useEffect, useState} from "react";
import {DirectorsData} from "../../types";
import {useParams} from "react-router-dom";
import LocationService from "../../Services/LocationService";
import {Spinner} from "react-bootstrap";

interface Props {
}

export const DirectorsComponent: FC<Props> = (props) => {

    const [data, setData] = useState<DirectorsData>()
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId} = useParams<{ locationId: string }>();

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


    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    if (data && data.directors) {
        return <div>
            <strong>Директора локации {data?.location.name}</strong>
            <ul>
                {data &&
                    data.directors.length > 0
                    && data.directors.map(x => {
                            let verstData = data.verstDirectors[x.tgId];
                            let tgName = `${x.firstName ?? ""} ${x.lastName ?? ""}`.trim();
                            let name = verstData ? verstData.full_name : tgName;

                            return <li>
                                <span>{name}</span>
                                {x.tgLogin && <span> | <a href={`https://t.me/${x.tgLogin}`}>@{x.tgLogin}</a></span>}
                                {verstData && <span> | <a
                                    href={`https://5verst.ru/userstats/${verstData.id}`}>A{verstData.id}</a></span>}
                            </li>
                        }
                    )}
            </ul>
        </div>
    } else {
        return <div>Еще нет ни одного директорра</div>
    }


}
