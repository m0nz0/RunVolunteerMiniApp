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
                    className={`text-${props.badgeColor} border border-${props.badgeColor} bg-transparent`}
                    pill>
                    {props.badgeValue}
                </Badge> {props.name}
            </div>
        </div>
        :
        <div className="ms-2 me-auto">
            <div className="fw-bold">
                {props.name} <Badge
                className={`text-${props.badgeColor} border border-${props.badgeColor} bg-transparent`}
                pill>
                {props.badgeValue}
            </Badge>
            </div>
        </div>
}
