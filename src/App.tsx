import React, {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {GlobalProvider} from "./Common/Context/GlobalContext";
import {UserProvider} from "./Common/Context/UserContext";
import {AppRouter} from "./Components/CommonAppRouter/AppRouter";
import BreadcrumbsComponent from "./Components/BreadcrumbsComponent";
import './styles.css'
import {ToastContainer} from "react-toastify";
import {Container} from "react-bootstrap";
import {TelegramBackButtonGlobal} from "@/Common/TelegramBackButtonGlobal";

export const App: React.FC = () => {
    useEffect(() => {
        const tg = window?.Telegram?.WebApp;
        if (tg) {
            tg.ready();
            tg.disableVerticalSwipes();
            tg.expand();
        }
    }, []);

    return (
        <GlobalProvider>
            <UserProvider>
                <BrowserRouter basename="/RunVolunteerMiniApp">
                    <TelegramBackButtonGlobal/>
                    <Container>
                        <BreadcrumbsComponent/>
                        <AppRouter/>
                    </Container>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        pauseOnHover
                        theme="colored"
                    />
                </BrowserRouter>
            </UserProvider>
        </GlobalProvider>
    );
};
