import React, {FC} from "react";
import {Card} from "react-bootstrap";
import LinkAdapter from "../../Common/LinkAdapter";
import {UserLocationDictItem} from "../../types";
import {LocationCardBody} from "./LocationCardBody";
import {LocationViewType} from "../../Const/LocationViewType";
import './styles.css'

interface Props {
    location: UserLocationDictItem,
    locationViewType: LocationViewType
}

export const LocationCardComponent: FC<Props> = (props) => {

    return (
        props.locationViewType === LocationViewType.AllLocations ?
            <div key={props.location.verstId}>
                <Card as={LinkAdapter as any}
                      to={`/locations/${props.location.verstId}`}
                      state={{location: props.location}}>
                    <LocationCardBody location={props.location}/>
                </Card>
            </div> :
            props.locationViewType === LocationViewType.WithSchedules ?
                <div key={props.location.verstId}>
                    <Card as={LinkAdapter as any}
                          to={`/existing-entries/${props.location.verstId}/dates`}
                          state={{location: props.location}}>
                        <LocationCardBody location={props.location}/>
                    </Card>
                </div> :
                props.locationViewType === LocationViewType.ForSchedule ?
                    <div key={props.location.verstId}>
                        <Card as={LinkAdapter as any}
                              to={`/new-entry/${props.location.verstId}/dates`}
                              state={{location: props.location}}>
                            <LocationCardBody location={props.location}/>
                        </Card>
                    </div> :
                    <div className="p-3 text-center text-danger">Ooops</div>
    )
}
