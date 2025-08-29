import React, {FC, useEffect, useState} from "react";
import {Card, Spinner} from "react-bootstrap";
import {LocationData, UserLocationDictItem} from "../../types";
import {LocationViewType} from "../../Const/LocationViewType";
import './styles.css'
import {LocationCardBody} from "./LocationCardBody";
import {LocationCardFooter} from "./LocationCardFooter";
import {useParams} from "react-router-dom";
import LocationService from "../../Services/LocationService";

interface Props {
    location: UserLocationDictItem,
    locationViewType: LocationViewType,
}

export const LocationCardComponent: FC<Props> = (props) => {

    const {locationId} = useParams<{ locationId: string }>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<LocationData>()

    useEffect(() => {
        let isMounted = true;
        // if (Object.entries(locationDict).length === 0) {
        //     return;
        // }
        const loadData = async () => {
            try {
                let data = await LocationService.getLocations(LocationViewType.AllLocations)
                setData({user: data.user, locations: data.locations.filter(x => x.verstId === Number(locationId))})
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
    }, []);

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }
    return (
        data && <Card>
            LocationCardComponent
            <LocationCardBody location={data.locations[0]}/>

            <LocationCardFooter location={data.locations[0]}
                                user={data?.user}/>
        </Card>)

}
