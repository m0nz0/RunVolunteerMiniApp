import {Alert} from "react-bootstrap";
import {FC, useState} from "react";

interface Props {
    text: string
}

export const AlertComponent: FC<Props> = (props) => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Ooops!</Alert.Heading>
                <p>{props.text}</p>
            </Alert>
        );
    }
}
