import {FC} from "react";
import {LocationInfo} from "../../Services/LocationService";
import {Button, ButtonGroup, Container} from "react-bootstrap";

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
                <strong>Название локации: </strong>
                <span>{props.location.name}</span>
            </p>
            <p>
                <strong>Статус: </strong>
                <span>{props.location.verstStatusName}</span>
            </p>
        </Container>
        {/*<ButtonGroup vertical>*/}
        {/*    {props.location.locationFlags.map(x =>*/}
        {/*        <Button variant={"light"} key={x}*/}
        {/*            onClick={() => onBtnClick(x)}>x</Button>)}*/}
        {/*</ButtonGroup>*/}
    </div>
}
