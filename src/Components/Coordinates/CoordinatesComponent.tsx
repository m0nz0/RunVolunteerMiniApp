import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";

interface Props {
    lat: number,
    lon: number
}

export const CoordinatesComponent: FC<Props> = props => {

    let url = `https://yandex.ru/maps/?pt=${props.lon},${props.lat}&z=15&l=map`;

    return (<span>
        <FontAwesomeIcon icon={faLocationDot} color={"red"}/>
        <span>
            <a href={url}>{props.lat} {props.lon}</a>
        </span>
    </span>)
}
