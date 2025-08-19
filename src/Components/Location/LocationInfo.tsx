import {FC} from "react";
import {Location} from "../../Services/LocationService";

export const LocationInfo: FC<Location> = (props) => {
    return <div>
        this is fute location card
        <div>{JSON.stringify(props)}</div>
    </div>
}
