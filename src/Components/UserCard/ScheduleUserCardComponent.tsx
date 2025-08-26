import {FC} from "react";
import {TgUser} from "../../types";

interface Props {
    user: TgUser,
    scheduledName: string
}

export const ScheduleUserCardComponent: FC<Props> = (props) => {
    let verstId = (props.user.verstIds ?? []).find(x => x.isMain)?.verstId;
    let tgLogin = props.user?.tgLogin;
    return <div className="ms-3 me-auto">
        <span>{props.scheduledName}</span>
        {tgLogin &&
            <span> | <a href={`https://t.me/${tgLogin}`}>@{tgLogin}</a></span>}
        {verstId && <span> | <a
            href={`https://5verst.ru/userstats/${verstId}`}>A{verstId}</a></span>}
    </div>
}
