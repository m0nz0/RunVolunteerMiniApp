import React, {FC} from "react";
import {Button, ButtonGroup, ButtonToolbar, Card} from "react-bootstrap";
import LinkAdapter from "../../Common/LinkAdapter";
import {useLocation} from "react-router-dom";
import {LocationCardBody} from "./LocationCardBody";

interface Props {
    forSchedule: boolean
}

export const LocationInfoComponent: FC<Props> = (props) => {

    const loc = useLocation();

    return <div>
        {/*<Container >*/}
        <Card>
            <Card.Body>
                <LocationCardBody location={loc.state.location}/>
                <Card.Footer>
                    <ButtonToolbar className={"d-grip gap-2"}>
                        <ButtonGroup>
                            <Button as={LinkAdapter as any}
                                    to={`/new-entry/${loc.state.location.verstId}/dates`}
                                    variant="info"
                                    state={{location: loc.state.location}}
                                    size="lg">Записаться</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button as={LinkAdapter as any}
                                    to={`/existing-entries/${loc.state.location.verstId}/dates`}
                                    // state={{location: loc.state.location}}
                                    variant="info"
                                    size="lg">Кто уже записан</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Card.Footer>
            </Card.Body>
        </Card>
        {/*</Container>*/}
    </div>
}
