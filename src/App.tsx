import React, {FC, useState} from "react";
import {AuthForm} from "./Components/Auth/AuthForm";
import {AllParams} from "./types";
import {Source} from "./Const/Source";
import {Target} from "./Const/Target";
import {Action} from "./Const/Action";
import {Version} from "./Const/Version";
import {MenuForm} from "./Components/Menu/MenuForm";
import {extractUrlParams} from "./Common/UrlParser";
import {About} from "./Components/About/About";
import {SomeError} from "./Components/SomeError";
import {LocationListComponent} from "./Components/LocationList/LocationListComponent";


type ActiveComponent = "menu" | "about" | "locations";

export const App: FC = () => {

    const [activeComponent, setActiveComponent] = useState<ActiveComponent>("menu");

    const goBack = () => setActiveComponent("menu");

    function getUrlParams(): AllParams | any {
        const urlParams = new URLSearchParams(window.location.search);

        if (Array.from(urlParams.keys()).length === 0) {
            return null;
        }

        let params = extractUrlParams();

        let calendarId = params['c'];
        let locationId = params['l'];
        let source = params["s"];
        let target = params['t'];
        let action = params['a'];
        let version = params['v'];
        let verstId = params['vi'];

        return {
            calendarId: calendarId ? Number(calendarId) : null,
            locationId: locationId ? Number(locationId) : null,
            source: source === undefined ? null : Source[source as keyof typeof Source],
            target: target === undefined ? null : Target[target as keyof typeof Target],
            action: action === undefined ? null : Action[action as keyof typeof Action],
            version: version === undefined ? null : Version[version as keyof typeof Version],
            verstId: verstId,
        }
    }

    let params = getUrlParams();
    if (params === null) {
        if (activeComponent === "menu") {
            return <MenuForm onSelect={setActiveComponent}/>
        } else if (activeComponent === "about") {
            return <div><About onBack={goBack}/></div>
        } else if (activeComponent === "locations") {
            return <LocationListComponent onBack={goBack} request={{action: 1}}/>
        } else {
            return <SomeError/>;
        }
    } else {
        return <AuthForm data={params}/>
    }
}
