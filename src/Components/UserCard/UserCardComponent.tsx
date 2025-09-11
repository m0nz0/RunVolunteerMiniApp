import {FC, useState} from "react";
import {Icons} from "@/Const/Icons";


interface Props {
    name: string,
    tgLogin?: string,
    verstId?: number
}


export const UserCardComponent: FC<Props> = (props) => {

    const [show, setShow] = useState<boolean>(false)

    return <div className="ms-3 me-auto">
        <span>{props.name}</span>&nbsp;
        {(props.tgLogin || props.verstId) &&
            <span onClick={() => setShow(!show)}>{!show ? Icons.EyeOpen : Icons.EyeClose}</span>}&nbsp;
        {show &&
            <span>
                {props.tgLogin && <span> | <a href={`https://t.me/${props.tgLogin}`}>@{props.tgLogin}</a></span>}
                {props.verstId &&
                    <span> | <a href={`https://5verst.ru/userstats/${props.verstId}`}>A{props.verstId}</a></span>}
        </span>}
    </div>
}
