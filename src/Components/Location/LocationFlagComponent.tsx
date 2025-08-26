import {FC} from "react";
import {LocationFlag, LocationFlagParams} from "../../Const/LocationFlag";

interface Props {
    flag: LocationFlag,
    withText: boolean
}

export const LocationFlagComponent: FC<Props> = (props) => {

    let info = LocationFlagParams[props.flag as keyof typeof LocationFlagParams];

    return (<span>
        {info.icon}
        {props.withText && <span> {info.name} </span>}
    </span>)
}
