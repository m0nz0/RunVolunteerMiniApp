import React, {FC} from "react";
import {Card} from "react-bootstrap";
import {TgUser, UserLocationDictItem} from "../../types";
import {LocationViewType} from "../../Const/LocationViewType";
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
        `/locations/${location.verstId}` :
        locationViewType === LocationViewType.WithSchedules ?
            `/existing-entries/${location.verstId}/dates` :
            locationViewType === LocationViewType.ForSchedule ?
                `/new-entry/${location.verstId}/dates` :
                "/";

    let state = locationViewType === LocationViewType.AllLocations ?
        {location: location, locationViewType: locationViewType, user: props.user} :
        locationViewType === LocationViewType.WithSchedules ?
            {location: location, user: props.user} :
            locationViewType === LocationViewType.ForSchedule ?
                {location: location, user: props.user} :
                {};
    const goByRoute = () => {
        navigate(to, {
            state: state
        })
    }

    return (
        <Card key={location.verstId}
              onClick={goByRoute}
              style={{cursor: "pointer"}}>
            <LocationCardBody location={location}/>

        </Card>)

}
