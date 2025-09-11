import {FC} from "react";
import {Icons} from "@/Const/Icons";

interface Props {
    lat: number,
    lon: number
}

export const CoordinatesComponent: FC<Props> = props => {

    let url = `https://yandex.ru/maps/?pt=${props.lon},${props.lat}&z=15&l=map`;

    return (<span>
        {Icons.CoordinatePin}
        <span>
            <a href={url}>{props.lat} {props.lon}</a>
        </span>
    </span>)
}
