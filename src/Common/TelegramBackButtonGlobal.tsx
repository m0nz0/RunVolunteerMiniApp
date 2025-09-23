import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";

export function TelegramBackButtonGlobal() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const backButton = window.Telegram?.WebApp?.BackButton;
        if (!backButton) return;

        const handleBack = () => {
            navigate(-1);
        };

        // На главной ("/") кнопку скрываем
        if (location.pathname === "/") {
            backButton.hide();
        } else {
            backButton.show();
            backButton.onClick(handleBack);
        }

        return () => {
            backButton.offClick(handleBack);
        };
    }, [navigate, location]);

    return null; // компонент ничего не рисует
}
