import React, {FC} from "react";
import {Button, ButtonGroup, ButtonToolbar, Card} from "react-bootstrap";
import LinkAdapter from "../../Common/LinkAdapter";
import {UserLocationDictItem} from "../../types";
import {useLocation} from "react-router-dom";
import {LocationCardBody} from "./LocationCardBody";

interface Props {
    location: UserLocationDictItem,
    forSchedule: boolean
}

export const LocationInfoComponent: FC<Props> = (props) => {

    const location = useLocation();

    return <div>
        {/*<Container >*/}
        <Card>
            <Card.Body>
                <LocationCardBody location={location.state.loc}/>
                <Card.Footer>
                    <ButtonToolbar className={"d-grip gap-2"}>
                        <ButtonGroup>
                            <Button as={LinkAdapter as any}
                                    to={`/new-entry/${location.state.loc.verstId}/dates`}
                                    variant="info"
                                    state={{forSchedule: true}}
                                    size="lg">Записаться</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button as={LinkAdapter as any}
                                    to={`/existing-entries/${location.state.loc.verstId}/dates`}
                                    state={{loca: location}}
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
