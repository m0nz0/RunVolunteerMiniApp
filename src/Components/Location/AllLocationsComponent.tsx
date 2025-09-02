import {FC} from "react";
import {LocationListComponent} from "./LocationListComponent";
import {LocationViewParams, LocationViewType} from "../../Const/LocationViewType";

interface Props {
    locationViewType: LocationViewType
}


export const AllLocationsComponent: FC<Props> = (props) => {

    let data = LocationViewParams[props.locationViewType]
    return <div>
        <p className={"text-center"}>
            <h5>{data.header}</h5>
        </p>
        <LocationListComponent defaultSwitchedFilters={data.defaultActiveFilters}
                               hiddenFilters={data.hiddenFilters}
                               locationViewType={props.locationViewType}/>
    </div>
}
