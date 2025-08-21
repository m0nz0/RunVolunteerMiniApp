import {FC} from "react";
import {LocationFlag} from "../../Const/LocationFlag";
import {LocationListComponent} from "../LocationList/LocationListComponent";

interface Props {
}

const NewEntryComponent: FC = () => {
    return <div>
        <h5 className={"text-center"}>Выбери локацию для записи</h5>
        <LocationListComponent defaultSwitchedFilters={[LocationFlag.Favorite, LocationFlag.IsBotActive]}
                               hiddenFilters={[LocationFlag.IsBotActive, LocationFlag.IsPrepare, LocationFlag.IsCancel]}
                               forSchedule={true}/>
    </div>
}

export default NewEntryComponent;
