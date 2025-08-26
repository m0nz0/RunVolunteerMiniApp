import {FC} from "react";
import {LocationListComponent} from "./LocationListComponent";
import {LocationViewParams, LocationViewType} from "../../Const/LocationViewType";

interface Props {
    locationViewType: LocationViewType
}


export const AllLocationsComponent: FC<Props> = (props) => {

    let data = LocationViewParams[props.locationViewType]
    return <div>
        <h5 className="text-center">{data.header}</h5>
        <LocationListComponent defaultSwitchedFilters={data.defaultActiveFilters}
                               hiddenFilters={data.hiddenFilters}
                               locationViewType={props.locationViewType}/>
    </div>
}
