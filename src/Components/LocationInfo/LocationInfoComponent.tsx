import React, {FC} from "react";
import {LocationInfo} from "../../Services/LocationService";
import {Button, ButtonGroup, Card, Container} from "react-bootstrap";
import {CoordinatesComponent} from "../Coordinates/CoordinatesComponent";
import {LocationFlagComponent} from "../LocationFlag/LocationFlagComponent";
import {LocationFlag} from "../../Const/LocationFlag";
import {Link, LinkProps} from "react-router-dom";

interface Props {
    location: LocationInfo,
    forSchedule: boolean
}

// адаптер для Link (чтобы работало в react-bootstrap + TS)
const LinkAdapter = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link ref={ref} {...props} />
));
LinkAdapter.displayName = "LinkAdapter";

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
                    <Button as={LinkAdapter as any}
                            to={`/location/${props.location.verstId}/dates`}
                            variant="info"
                            size="lg">Btn</Button>;
                </Card.Footer>
            </Card.Body>
        </Card>
        {/*</Container>*/}
    </div>
}
