import React, {FC} from "react";
import {Card} from "react-bootstrap";
import LinkAdapter from "../../Common/LinkAdapter";
import {UserLocationDictItem} from "../../types";
import {LocationViewType} from "../../Const/LocationViewType";
import './styles.css'
import {LocationCardBody} from "./LocationCardBody";
import {useNavigate, useNavigation} from "react-router-dom";

interface Props {
    location: UserLocationDictItem,
    locationViewType: LocationViewType,
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
        {location: location, locationViewType: locationViewType} :
        locationViewType === LocationViewType.WithSchedules ?
            {location: location} :
            locationViewType === LocationViewType.ForSchedule ?
                {location: location} :
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
