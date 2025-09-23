import {FC} from "react";
import {Icons} from "@/Const/Icons";
import {SmartLink} from "@/Common/SmartLink";

interface Props {
    lat: number,
    lon: number
}

export const CoordinatesComponent: FC<Props> = props => {

    let url = `https://yandex.ru/maps/?pt=${props.lon},${props.lat}&z=15&l=map`;

    return (<span>
        {Icons.CoordinatePin}
        <span>
            <SmartLink onClick={(e) => e.preventDefault()}
                       to={url}>{props.lat} {props.lon}</SmartLink>
        </span>
    </span>)
}
