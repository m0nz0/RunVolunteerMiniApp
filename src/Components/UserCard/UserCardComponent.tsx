import {FC, useState} from "react";
import {Icons} from "@/Const/Icons";
import {Link} from "react-router-dom";


interface Props {
    name: string,
    tgLogin?: string,
    verstId?: number
}


export const UserCardComponent: FC<Props> = (props) => {

    const [show, setShow] = useState<boolean>(false)

    return <div className="ms-3 me-auto">
        <span>{props.name}</span>
        {(props.tgLogin || props.verstId) &&
            <span onClick={() => setShow(!show)}>&nbsp;{!show ? Icons.EyeOpen : Icons.EyeClose}</span>}
        {show &&
            <span>
                {props.tgLogin && <span> | <Link to={`https://t.me/${props.tgLogin}`}>@{props.tgLogin}</Link></span>}
                {props.verstId &&
                    <span> | <Link to={`https://5verst.ru/userstats/${props.verstId}`}>A{props.verstId}</Link></span>}
        </span>}
    </div>
}
