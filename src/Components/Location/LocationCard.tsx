import {FC} from "react";
import {LocationInfo} from "../../Services/LocationService";
import {Container} from "react-bootstrap";

interface Props {
    location: LocationInfo;
    // onBack: () => void;
}

export const LocationCard: FC<Props> = (props) => {
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
    </div>
}
