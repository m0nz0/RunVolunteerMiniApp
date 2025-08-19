import {FC} from "react";
import {FullRequest} from "../../Model/FullRequest";

export const LocationList: FC<FullRequest> = (props) => {
    return <div>
        <h1>This is future locationList</h1>
        <div>{JSON.stringify(props)}</div>
    </div>
}
