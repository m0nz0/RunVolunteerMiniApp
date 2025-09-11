import React from "react";
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";
import {GlobalProvider} from "./Common/Context/GlobalContext";
import {UserProvider} from "./Common/Context/UserContext";
import {AppRouter} from "./Components/CommonAppRouter/AppRouter";
import BreadcrumbsComponent from "./Components/BreadcrumbsComponent";
import './styles.css'
import {ToastContainer} from "react-toastify";

declare global {
    interface Window {
        Telegram: any;
    }
}

export const App: React.FC = () => {
    let tg = window?.Telegram?.WebApp;
    if (tg) {
        tg.disableVerticalSwipes();
        tg.expand();
    }

    return (
        <GlobalProvider>
            <UserProvider>
                <BrowserRouter basename="/test">
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
                    />                </BrowserRouter>
            </UserProvider>
        </GlobalProvider>
    );
};

// import React, {FC, useState} from "react";
// import {AuthComponent} from "./Components/Auth/AuthComponent";
// import {AllParams} from "./types";
// import {Source} from "./Const/Source";
// import {Target} from "./Const/Target";
// import {Action} from "./Const/Action";
// import {Version} from "./Const/Version";
// import {MenuComponent} from "./Components/Menu/MenuComponent";
// import {extractUrlParams} from "./CommonAppRouter/UrlParser";
// import {AboutComponent} from "./Components/AboutComponent/AboutComponent";
// import {SomeError} from "./Components/SomeError";
// import {LocationListComponent} from "./Components/Location/LocationListComponent";
//
//
// type ActiveComponent = "menu" | "about" | "locations";
//
// export const App: FC = () => {
//
//     const [activeComponent, setActiveComponent] = useState<ActiveComponent>("menu");
//
//     const goBack = () => setActiveComponent("menu");
//
//     function getUrlParams(): AllParams | any {
//         const urlParams = new URLSearchParams(window.location.search);
//
//         if (Array.from(urlParams.keys()).length === 0) {
//             return null;
//         }
//
//         let params = extractUrlParams();
//
//         let calendarId = params['c'];
//         let locationId = params['l'];
//         let source = params["s"];
//         let target = params['t'];
//         let action = params['a'];
//         let version = params['v'];
//         let verstId = params['vi'];
//
//         return {
//             calendarId: calendarId ? Number(calendarId) : null,
//             locationId: locationId ? Number(locationId) : null,
//             source: source === undefined ? null : Source[source as keyof typeof Source],
//             target: target === undefined ? null : Target[target as keyof typeof Target],
//             action: action === undefined ? null : Action[action as keyof typeof Action],
//             version: version === undefined ? null : Version[version as keyof typeof Version],
//             verstId: verstId,
//         }
//     }
//
//     let params = getUrlParams();
//     if (params === null) {
//         if (activeComponent === "menu") {
//             return <MenuComponent onSelect={setActiveComponent}/>
//         } else if (activeComponent === "about") {
//             return <div><AboutComponent onBack={goBack}/></div>
//         } else if (activeComponent === "locations") {
//             return <LocationListComponent onBack={goBack} request={{action: 1}}/>
//         } else {
//             return <SomeError/>;
//         }
//     } else {
//         return <AuthComponent data={params}/>
//     }
// }
