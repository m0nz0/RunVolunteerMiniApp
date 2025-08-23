import React, {FC} from "react";
import {Card} from "react-bootstrap";
import LinkAdapter from "../../Common/LinkAdapter";
import {UserLocationDictItem} from "../../types";
import {LocationCardBody} from "./LocationCardBody";

interface Props {
    location: UserLocationDictItem,
    forSchedule: boolean
}

export const LocationCardComponent: FC<Props> = (props) => {

    return (<div key={props.location.verstId}>
            {/*<Container >*/}
            <Card as={LinkAdapter as any}
                  to={`/locations/${props.location.verstId}`}
                  state={{loc: props.location}}>
                <LocationCardBody location={props.location}/>
            </Card>
            {/*</Container>*/}</div>
    )
}
