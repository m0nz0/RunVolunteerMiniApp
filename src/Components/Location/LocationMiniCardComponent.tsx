import React, {FC} from "react";
import {Card} from "react-bootstrap";
import LinkAdapter from "../../Common/LinkAdapter";
import {UserLocationDictItem} from "../../types";
import {LocationViewType} from "../../Const/LocationViewType";
import './styles.css'
import {LocationCardBody} from "./LocationCardBody";

interface Props {
    location: UserLocationDictItem,
    locationViewType: LocationViewType,
}

export const LocationMiniCardComponent: FC<Props> = (props) => {

    let location = props.location;
    let locationViewType = props.locationViewType;

    let to = locationViewType === LocationViewType.AllLocations ?
        `/locations/${location.verstId}` :
        locationViewType === LocationViewType.WithSchedules ?
            `/existing-entries/${location.verstId}/dates` :
            locationViewType === LocationViewType.ForSchedule ?
                `/new-entry/${location.verstId}/dates` :
                null;

    let state = locationViewType === LocationViewType.AllLocations ?
        {location: location, locationViewType: locationViewType} :
        locationViewType === LocationViewType.WithSchedules ?
            {location: location} :
            locationViewType === LocationViewType.ForSchedule ?
                {location: location} :
                null;

    return (
        <Card key={location.verstId}
              as={LinkAdapter as any}
              to={to}
              state={state}>
            <LocationCardBody location={location}/>

        </Card>)

}
