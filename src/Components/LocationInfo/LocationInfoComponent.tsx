import {FC} from "react";
import {LocationInfo} from "../../Services/LocationService";
import {Button, ButtonGroup, Container} from "react-bootstrap";
import {CoordinatesComponent} from "../Coordinates/CoordinatesComponent";

interface Props {
    location: LocationInfo;
    // onBack: () => void;
}

export const LocationInfoComponent: FC<Props> = (props) => {
    const onBtnClick = (btn: string) => {
        console.log("clicked", btn)
    }
    return <div>
        <Container>
            <p>
                <strong>Город: </strong>
                <span>{props.location.cityName}</span>
            </p>
            <p>
                <strong>Страница локации: </strong>
                <span dangerouslySetInnerHTML={{__html: props.location.href}}></span>
            </p>
            <p>
                <strong>Статус: </strong>
                <span>{props.location.verstStatusName}</span>
            </p>
            <p>
                <strong>Где: </strong>
                <CoordinatesComponent lat={props.location.lat} lon={props.location.lon}/></p>

        </Container>
        {/*<ButtonGroup vertical>*/}
        {/*    {props.location.locationFlags.map(x =>*/}
        {/*        <Button variant={"light"} key={x}*/}
        {/*            onClick={() => onBtnClick(x)}>x</Button>)}*/}
        {/*</ButtonGroup>*/}
    </div>
}
