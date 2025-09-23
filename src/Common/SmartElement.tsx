import {CSSProperties, FC, JSX, ReactNode, SyntheticEvent} from "react";

type SmartElementTag = "span" | "button" | "div" | "img";

interface SmartElementProps {
    as?: SmartElementTag;
    children?: ReactNode;
    src?: string; // для img
    className?: string;
    onClick?: () => void;
    style?: CSSProperties;
}

export const SmartElement: FC<SmartElementProps> = ({
                                                        as = "span",
                                                        children,
                                                        src,
                                                        className,
                                                        onClick,
                                                        style,
                                                    }) => {
    const handlePreventDefault = (e: SyntheticEvent) => {
        e.preventDefault();
    };

    const commonProps = {
        className,
        onClick,
        onContextMenu: handlePreventDefault,
        onMouseDown: handlePreventDefault,
        onTouchStart: handlePreventDefault,
        style: {cursor: "pointer", display: "inline-block", ...style},
    };

    if (as === "img" && src) {
        return (
            <div {...commonProps}>
                <img
                    src={src}
                    alt=""
                    style={{pointerEvents: "none", display: "block"}}
                />
            </div>
        );
    }

    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag {...commonProps}>{children}</Tag>;
};
