import React, {FC} from "react";
import {Calendar} from "../../types";
import {Container} from "react-bootstrap";

interface Props {
    dates: Calendar[]
}

export const DateButtonsComponent: FC<Props> = (props) => {
    return (<Container>{
        // props.dates.map(date => <Button key={i} as={LinkAdapter as any}
        //                                 to="/existing-entries"
        //                                 variant="info"
        //                                 size="lg">{x}</Button>;)
    }</Container>)
}
