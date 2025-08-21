import {FC} from "react";
import {LocationFlag, LocationFlagParams} from "../../Const/LocationFlag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    flag: LocationFlag,
    withText: boolean,
}

export const LocationFlagComponent: FC<Props> = (props) => {

    let info = LocationFlagParams[props.flag as keyof typeof LocationFlagParams];

    return (<span>
        <FontAwesomeIcon icon={info.icon} color={info.color}/>
        {props.withText && <span> {info.name} </span>}
    </span>)
}
