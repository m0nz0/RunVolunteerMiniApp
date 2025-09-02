import {FC} from "react";
import {Button} from "react-bootstrap";
import LinkAdapter from "../Common/LinkAdapter";

interface AppButtonProps {
    to: string;
    label: any;
    variant?: string;
    size?: "sm" | "lg" | undefined;
}

export const AppButton: FC<AppButtonProps> = ({to, label, variant = "info", size = "sm"}) => {
    return (
        <Button
            as={LinkAdapter as any}
            to={to}
            variant={variant}
            size={size}>
            {label}
        </Button>
    );
};
