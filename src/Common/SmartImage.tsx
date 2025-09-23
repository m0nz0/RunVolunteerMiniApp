import {FC} from "react";

interface SmartImageProps {
    src: string;
    alt?: string;
    className?: string;
    onClick?: () => void;
}

export const SmartImage: FC<SmartImageProps> = ({src, alt, className, onClick}) => {
    return (
        <div
            onClick={onClick}
            onContextMenu={(e) => e.preventDefault()} // блокируем долгий тап
            onMouseDown={(e) => e.preventDefault()}   // дополнительная страховка
            onTouchStart={(e) => e.preventDefault()}  // блокируем всплытие на тачах
            style={{display: "inline-block", cursor: "pointer"}}
        >
            <img className={className}
                 src={src} alt={alt} style={{pointerEvents: "none"}}/>
        </div>
    );
};
