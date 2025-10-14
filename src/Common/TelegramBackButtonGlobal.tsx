import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const TelegramBackButtonGlobal: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const tg = window?.Telegram?.WebApp;
        if (!tg?.BackButton) {
            return;
        }

        const backButton = tg.BackButton;
        backButton.show();

        const handleBack = () => {
            if (window.history.length > 1) {
                navigate(-1);
            } else {
                tg?.close?.();
            }
        };

        backButton.onClick(handleBack);

        const handlePopState = () => {
            if (window.history.length <= 1) {
                tg?.close?.();
            }
        };
        window.addEventListener("popstate", handlePopState);

        const isInlineMode = !!tg?.initDataUnsafe?.inline_query;
        if (isInlineMode) {
            window.addEventListener("popstate", () => tg?.close?.());
        }

        tg?.expand?.();
        tg?.disableVerticalSwipes?.();

        return () => {
            backButton.offClick(handleBack);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);

    return null;
};
