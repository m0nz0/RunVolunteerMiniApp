import {FC} from "react";
import {Button} from "react-bootstrap";
import LinkAdapter from "../Common/LinkAdapter";

interface AppButtonProps {
    to: string;
    label: any;
    variant?: string;
}

export const AppButton: FC<AppButtonProps> = ({to, label, variant = "info"}) => {
    return (
        <Button
            as={LinkAdapter as any}
            to={to}
            variant={variant}
            size="lg">
            {label}
        </Button>
    );
};
