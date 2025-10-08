import React, {FC} from "react";
import {Card} from "react-bootstrap";
import {TgUser, UserLocationDictItem} from "@/types";
import {LocationViewType} from "@/Const/LocationViewType";
import './styles.css'
import {LocationCardBody} from "./LocationCardBody";
import {useNavigate} from "react-router-dom";

interface Props {
    location: UserLocationDictItem,
    locationViewType: LocationViewType,
    user: TgUser | undefined
}

export const LocationMiniCardComponent: FC<Props> = (props) => {

    const navigate = useNavigate();

    let location = props.location;
    let locationViewType = props.locationViewType;

    let to = locationViewType === LocationViewType.AllLocations ?
        `/locations/${location.verstId}/info` :
        locationViewType === LocationViewType.WithSchedules ?
            `/existing-entries/${location.verstId}/dates` :
            locationViewType === LocationViewType.ForSchedule ?
                `/new-entry/${location.verstId}/dates` :
                "/";

    const goByRoute = () => {
        navigate(to, {})
    }

    return (
        <Card key={location.verstId}
              onClick={goByRoute}
              style={{cursor: "pointer"}}>
            <LocationCardBody location={location}/>
        </Card>)

}
