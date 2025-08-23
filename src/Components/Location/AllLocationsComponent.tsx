import {FC} from "react";
import {LocationFlag} from "../../Const/LocationFlag";
import {LocationListComponent} from "./LocationListComponent";

interface Props {
    forSchedule: boolean
}

export const AllLocationsComponent: FC<Props> = (props) => {
    return (<div>
        {props.forSchedule ?
            (<div>
                <h5 className={"text-center"}>Выбери локацию для записи</h5>
                <LocationListComponent defaultSwitchedFilters={[LocationFlag.Favorite, LocationFlag.IsBotActive]}
                                       hiddenFilters={[LocationFlag.IsBotActive, LocationFlag.IsPrepare, LocationFlag.IsCancel]}
                                       forSchedule={props.forSchedule}/>
            </div>) :
            (<div>
                <h5 className="text-center">Это список всех локаций. Воспользуйтесь фильтрами и поиском, чтобы найти
                    нужную</h5>
                <LocationListComponent defaultSwitchedFilters={[LocationFlag.Favorite, LocationFlag.IsBotActive]}
                                       hiddenFilters={[]}
                                       forSchedule={props.forSchedule}/>
            </div>)}
    </div>)
}
