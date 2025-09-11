import React, {FC, useEffect, useState} from "react";
import {Card, Spinner} from "react-bootstrap";
import {LocationData, UserLocationDictItem} from "@/types";
import {LocationViewType} from "@/Const/LocationViewType";
import './styles.css'
import {LocationCardBody} from "./LocationCardBody";
import {LocationCardFooter} from "./LocationCardFooter";
import {useParams} from "react-router-dom";
import LocationService from "../../Services/LocationService";
import {toast} from "react-toastify";

interface Props {
    location: UserLocationDictItem,
    locationViewType: LocationViewType,
}

export const LocationCardComponent: FC<Props> = () => {

    const {locationId} = useParams<{ locationId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<LocationData>()

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            try {
                let data = await LocationService.getLocations(LocationViewType.AllLocations)
                setData({user: data.user, locations: data.locations.filter(x => x.verstId === Number(locationId))})
            } catch (err) {
                if (isMounted) {
                    toast.error("Ошибка при загрузке данных локаций");
                }

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
            <LocationCardBody location={data.locations[0]}/>

            <LocationCardFooter location={data.locations[0]}
                                user={data?.user}/>
        </Card>)

}
