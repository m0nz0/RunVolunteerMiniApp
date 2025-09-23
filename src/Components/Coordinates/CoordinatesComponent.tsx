import {FC} from "react";
import {Icons} from "@/Const/Icons";
import {Link} from "react-router-dom";

interface Props {
    lat: number,
    lon: number
}

export const CoordinatesComponent: FC<Props> = props => {

    let url = `https://yandex.ru/maps/?pt=${props.lon},${props.lat}&z=15&l=map`;

    return (<span>
        {Icons.CoordinatePin}
        <span>
            <Link to="#"
                  onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      openExternal(url);
                  }}>{props.lat} {props.lon}</Link>
        </span>
    </span>)
}
