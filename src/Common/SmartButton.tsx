import {FC, MouseEventHandler} from "react";
import {Button} from "react-bootstrap";

interface SmartButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    variant?: string;
    size?: "sm" | "lg";
    disabled?: boolean;
    children: React.ReactNode;
    onContextMenu?: MouseEventHandler<HTMLButtonElement>;
}

export const SmartButton: FC<SmartButtonProps> = ({
                                                      onClick,
                                                      variant,
                                                      size,
                                                      disabled,
                                                      children,
                                                      onContextMenu,
                                                  }) => {
    return (
        <Button
            onClick={onClick}
            onContextMenu={onContextMenu} // запрет длинного нажатия
            variant={variant}
            size={size}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};
