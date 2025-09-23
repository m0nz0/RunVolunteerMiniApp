import React from "react";
import {Link, LinkProps, useNavigate} from "react-router-dom";

type SmartLinkProps = LinkProps & {
    external?: boolean;
};

export const SmartLink: React.FC<SmartLinkProps> = ({to, children, external, ...rest}) => {
    const navigate = useNavigate();

    const isExternal =
        external || (typeof to === "string" && /^https?:\/\//.test(to));

    const openExternal = (url: string) => {
        const tg = (window as any).Telegram?.WebApp;
        if (tg) {
            tg.openLink(url);
        } else {
            window.open(url, "_blank");
        }
    };

    if (isExternal && typeof to === "string") {
        // ВНЕШНЯЯ ссылка → Telegram openLink
        return (
            <a
                href={to}
                onClick={(e) => {
                    e.preventDefault();
                    openExternal(to);
                }}
                {...rest}
            >
                {children}
            </a>
        );
    }

    // ВНУТРЕННЯЯ ссылка → react-router navigate
    return (
        <Link
            to={to}
            onClick={(e) => {
                // если Link используется как <SmartLink to="/route" />
                if (typeof to === "string" && !to.startsWith("http")) {
                    e.preventDefault();
                    navigate(to);
                }
            }}
            {...rest}
        >
            {children}
        </Link>
    );
};
