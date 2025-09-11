import {FC, useState} from "react";
import {Team, TgUser, VerstAthlete} from "@/types";
import {Icons} from "@/Const/Icons";

interface Props {
    user?: TgUser,
    schedule?: Team,
    verstInfo?: VerstAthlete
}

export const ScheduleUserCardComponent: FC<Props> = (props) => {

    const [show, setShow] = useState<boolean>(false)
    console.log(props.user, props.schedule, props.verstInfo)
    let verstId = props.schedule ? props.schedule.verstId : (props.user?.verstIds ?? []).find(x => x.isMain)?.verstId || props.verstInfo?.id;
    let tgLogin = props.user?.tgLogin ?? props.schedule?.tgUser?.tgLogin;
    return <div className="ms-3 me-auto">
        <span>{props.verstInfo?.full_name ??
            props.schedule?.name ??
            props.user?.tgLogin ??
            ((props.user?.lastName ?? "") + " " + (props.user?.firstName ?? "")).trim()}</span>&nbsp;
        {(tgLogin || verstId) &&
            <span onClick={() => setShow(!show)}>{!show ? Icons.EyeOpen : Icons.EyeClose}</span>}&nbsp;
        {show &&
            <span>
                {tgLogin && <span> | <a href={`https://t.me/${tgLogin}`}>@{tgLogin}</a></span>}
                {verstId && <span> | <a href={`https://5verst.ru/userstats/${verstId}`}>A{verstId}</a></span>}
        </span>}
    </div>
}
