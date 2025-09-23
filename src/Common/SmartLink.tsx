import React from "react";
import {useNavigate} from "react-router-dom";

type SmartLinkProps = {
    to: string;
    children: React.ReactNode;
    external?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

export const SmartLink: React.FC<SmartLinkProps> = ({
                                                        to,
                                                        children,
                                                        external,
                                                        className,
                                                        onClick,
                                                    }) => {
    const navigate = useNavigate();

    const isExternal =
        external || /^https?:\/\//.test(to);

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        // // сначала вызовем пользовательский обработчик
        if (onClick) {
            onClick(e);
        }
        //
        // // если он отменил действие → выходим
        // if (e.defaultPrevented) {
        //     return;
        // }

        if (isExternal) {
            const tg = (window as any).Telegram?.WebApp;
            if (tg) {
                tg.openLink(to);
            } else {
                alert("Эта ссылка доступна только в Telegram 🚫");
            }
        } else {
            navigate(to);
        }
    };

    return (
        <span
            className={className}
            style={{
                color: "#0d6efd",
                textDecoration: "underline",
                cursor: "pointer",
            }}
            onClick={handleClick}
        >
      {children}
    </span>
    );
};
