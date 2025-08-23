import {FC} from "react";
import {useParams} from "react-router-dom";
import {UserHelper} from "../../Common/UserHelper";
import {useUserContext} from "../../Common/Context/UserContext";
import {dateService} from "../../Common/dateService";
import {useGlobalContext} from "../../Common/Context/GlobalContext";

interface Props {
}

export const NameSelectorComponent: FC<Props> = () => {
    const {locationId} = useParams<{ locationId: string }>();
    const {calendarId} = useParams<{ calendarId: string }>();
    const {positionId} = useParams<{ positionId: string }>();

    const {userPositionDict, userDatesDict} = useUserContext()
    const {locationDict} = useGlobalContext()

    // console.log(locationId, calendarId, positionId)
    // console.log(locationDict, userDatesDict, userPositionDict)

    let position = userPositionDict[Number(positionId)].name;
    let location = locationDict[Number(locationId)].name;
    let date = dateService.formatDayMonthNameYear(userDatesDict[Number(calendarId)].date);
    return (<div>
        <p>Вы выбрали локацию {location} выбрали дату {date} и позицию {position}"</p>

        <br/>
        <h3>Тут пока ничего нет, но будут кнопки для записи ебя или доп аккаунта</h3>
    </div>)
}
