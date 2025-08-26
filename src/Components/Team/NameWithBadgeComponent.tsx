import {Badge} from "react-bootstrap";
import {FC} from "react";

interface Props {
    name: string,
    badgeValue: any,
    badgeColor: string,
    isRight?: boolean
}

export const NameWithBadgeComponent: FC<Props> = (props) => {

    return !(props.isRight ?? false) ?
        <div className="ms-2 me-auto">
            <div className="fw-bold">
                <Badge
                    bg={props.badgeColor} pill>
                    {props.badgeValue}
                </Badge> {props.name}
            </div>
        </div>
        :
        <div className="ms-2 me-auto">
            <div className="fw-bold">
                {props.name} <Badge
                bg={props.badgeColor} pill>
                {props.badgeValue}
            </Badge>
            </div>
        </div>
}
