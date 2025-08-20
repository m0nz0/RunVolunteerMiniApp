import {FC} from "react";
import {LocationFlag, LocationFlagColor, LocationFlagIcon, LocationFlagName} from "../../Const/LocationFlag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    flag: LocationFlag,
    withText: boolean,
}

export const LocationFlagComponent: FC<Props> = (props) => {

    return (<span>
        <FontAwesomeIcon icon={LocationFlagIcon[props.flag]} color={LocationFlagColor[props.flag]}/>
        {props.withText && <span> {LocationFlagName[props.flag]} </span>}
    </span>)
}
