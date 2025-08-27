import React, {FC} from "react";
import {Card} from "react-bootstrap";
import {UserLocationDictItem} from "../../types";
import {LocationViewType} from "../../Const/LocationViewType";
import './styles.css'
import {LocationCardBody} from "./LocationCardBody";
import {LocationCardFooter} from "./LocationCardFooter";
import {useLocation} from "react-router-dom";

interface Props {
    location: UserLocationDictItem,
    locationViewType: LocationViewType,
}

export const LocationCardComponent: FC<Props> = (props) => {

    const inputState = useLocation()
    const location = inputState?.state?.location;
    const locationViewType = inputState?.state?.locationViewType;

    return (
        <Card>
            <LocationCardBody location={location}/>

            <LocationCardFooter location={location}
                                locationViewType={locationViewType}/>
        </Card>)

}
