import {FC} from "react";
import {LocationFlag} from "../../Const/LocationFlag";
import {LocationListComponent} from "../LocationList/LocationListComponent";

interface Props {
    forSchedule: boolean
}

const AllLocationsComponent: FC<Props> = (props) => {
    return (
        props.forSchedule ?
            <div>
                <h5 className={"text-center"}>Выбери локацию для записи</h5>
                <LocationListComponent defaultSwitchedFilters={[LocationFlag.Favorite, LocationFlag.IsBotActive]}
                                       hiddenFilters={[LocationFlag.IsBotActive, LocationFlag.IsPrepare, LocationFlag.IsCancel]}
                                       forSchedule={props.forSchedule}/>
            </div> :
            <div>
                <h5 className="text-center">Это список всех локаций. Воспользуйтесь фильтрами и поиском, чтобы найти
                    нужную</h5>
                <LocationListComponent defaultSwitchedFilters={[LocationFlag.Favorite, LocationFlag.IsBotActive]}
                                       hiddenFilters={[]}
                                       forSchedule={props.forSchedule}/>
            </div>)
}

export default AllLocationsComponent;
