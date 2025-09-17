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

export const App: React.FC = () => {
    useEffect(() => {
        const tg = window?.Telegram?.WebApp;
        if (tg) {
            tg.disableVerticalSwipes();
            tg.expand();
        }
    }, []);

    return (
        <GlobalProvider>
            <UserProvider>
                <Container>
                    <BrowserRouter basename="/test">
                        <BreadcrumbsComponent/>
                        <AppRouter/>
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
                </Container>
            </UserProvider>
        </GlobalProvider>
    );
};
