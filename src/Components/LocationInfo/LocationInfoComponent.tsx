import React, {FC} from "react";
import {Button, Card} from "react-bootstrap";
import {CoordinatesComponent} from "../Coordinates/CoordinatesComponent";
import {LocationFlagComponent} from "../LocationFlag/LocationFlagComponent";
import {LocationFlag} from "../../Const/LocationFlag";
import LinkAdapter from "../../Common/LinkAdapter";
import {UserLocationDictItem} from "../../types";

interface Props {
    location: UserLocationDictItem,
    forSchedule: boolean
}

export const LocationInfoComponent: FC<Props> = (props) => {

    function handleCardSelect(verstId: number) {
        console.log("clicked card ", verstId)
    }

    return <div>
        {/*<Container >*/}
        <Card onClick={() => handleCardSelect(props.location.verstId)} key={props.location.verstId}>
            <Card.Body>
                <Card.Title>
                    <div><span dangerouslySetInnerHTML={{__html: props.location.href}}></span>
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
                            <span>
                                <strong>Город: </strong>
                                <span>{props.location.cityName}</span>
                            </span>
                    <br/>
                    <span>
                                <strong>Статус: </strong>
                                <span>{props.location.verstStatusName}</span>
                            </span>
                    <br/>
                    <span>
                                <strong>Где: </strong>
                                <CoordinatesComponent lat={props.location.lat} lon={props.location.lon}/>
                            </span>
                </Card.Text>
                <Card.Footer>
                    {props.forSchedule && <Button as={LinkAdapter as any}
                                                  to={`/new-entry/${props.location.verstId}/dates`}
                                                  variant="info"
                                                  size="lg">Записаться</Button>}
                </Card.Footer>
            </Card.Body>
        </Card>
        {/*</Container>*/}
    </div>
}
