import {FC} from "react";
import {FullRequest} from "../../Model/FullRequest";
import {Button} from "react-bootstrap";

interface Props {
    request: FullRequest;
    onBack: () => void;
}

export const LocationList: FC<Props> = (props) => {
    return <div>
        <Button
            onClick={props.onBack}
        >
            ← Back
        </Button>        <h1>This is future locationList</h1>
        <div>{JSON.stringify(props.request)}</div>
    </div>
}
