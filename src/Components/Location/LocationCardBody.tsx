import React, {FC} from "react";
import {Card} from "react-bootstrap";
import {LocationFlagComponent} from "./LocationFlagComponent";
import {LocationFlag} from "@/Const/LocationFlag";
import {CoordinatesComponent} from "@/Components/Coordinates/CoordinatesComponent";
import {UserLocationDictItem} from "@/types";

interface Props {
    location: UserLocationDictItem
}

export const LocationCardBody: FC<Props> = (props) => {
    return (<Card.Body>
        <Card.Title>
            <div>
                {/*<span dangerouslySetInnerHTML={{__html: props.location.href}}></span>*/}
                <strong className={"text-primary"}>{props.location.name}</strong>
                <span>
                    {
                        props.location.locationFlags.map(x => <LocationFlagComponent
                            key={props.location.verstId + "-" + x}
                            flag={LocationFlag[x as keyof typeof LocationFlag]}
                            withText={false}/>
                        )
                    }
                </span>
            </div>
        </Card.Title>
        <Card.Text>
            <div>
                <strong>Город: </strong>
                <span>{props.location.cityName}</span>
            </div>
            <div>
                <strong>Статус: </strong>
                <span>{props.location.verstStatusName}</span>
            </div>
            <div>
                <strong>Где: </strong>
                <CoordinatesComponent lat={props.location.lat} lon={props.location.lon}/>
            </div>
            <div>
                <a href={`https://5verst.ru/${props.location.href}`}>Страница локации</a>
            </div>
        </Card.Text>
    </Card.Body>)
}
