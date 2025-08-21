import {FC} from "react";
import {LocationFlag} from "../../Const/LocationFlag";
import {LocationListComponent} from "../LocationList/LocationListComponent";

interface Props {
}

const AllLocationsComponent: FC = () => {
    return <div>
        <h5 className="text-center">Это список всех локаций. Воспользуйтесь фильтрами и поиском, чтобы найти нужную</h5>
        <LocationListComponent defaultSwitchedFilters={[LocationFlag.Favorite, LocationFlag.IsBotActive]}
                               hiddenFilters={[]}
                               forSchedule={false}/>
    </div>
}

export default AllLocationsComponent;
