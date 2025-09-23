import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {SmartButton} from "@/Common/SmartButton";

interface AppButtonProps {
    to?: string;
    label: string;
    variant?: string;
    size?: "sm" | "lg";
    disabled?: boolean;
}

export const AppButton: FC<AppButtonProps> = ({
                                                  to,
                                                  label,
                                                  variant = "info",
                                                  size = "sm",
                                                  disabled = false,
                                              }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    };

    return (
        <SmartButton
            onClick={handleClick}
            variant={variant}
            size={size}
            disabled={disabled}
            onContextMenu={(e) => e.preventDefault()}
        >
            {label}
        </SmartButton>
    );
};
