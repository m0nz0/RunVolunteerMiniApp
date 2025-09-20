import {Badge} from "react-bootstrap";
import {FC} from "react";

interface Props {
    name: string,
    badgeValue: any,
    badgeColor: string,
    isRight?: boolean,
    isBold?: boolean
}

export const NameWithBadgeComponent: FC<Props> = (props) => {

    return !(props.isRight ?? false) ?
        <div className="ms-2 me-auto">
            <div className={props.isBold ? "fw-bold" : ""}>
                <Badge
                    style={{"verticalAlign": "bottom"}}
                    className={`text-${props.badgeColor} border border-${props.badgeColor} bg-transparent`}
                    pill>
                    {props.badgeValue}
                </Badge> {props.name}
            </div>
        </div>
        :
        <div className="ms-2 me-auto">
            <div className={props.isBold ? "fw-bold" : ""}>
                {props.name} <Badge
                style={{"verticalAlign": "bottom"}}
                className={`text-${props.badgeColor} border border-${props.badgeColor} bg-transparent`}
                pill>
                {props.badgeValue}
            </Badge>
            </div>
        </div>
}
