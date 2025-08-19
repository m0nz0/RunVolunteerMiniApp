import {FC} from "react";
import {Button} from "react-bootstrap";

interface Props {
    onBack: () => void;
}

export const About: FC<Props> = (props) => {
    return (
        <div>
            <Button
                onClick={props.onBack}
            >
                ← Back
            </Button>
            <div>
                This is future about
            </div>
        </div>
    )
}
