import React, {FC} from "react";
import {AuthForm} from "./Components/Auth/AuthForm";
import {AllParams} from "./types";
import {Source} from "./Const/Source";
import {Target} from "./Const/Target";
import {Action} from "./Const/Action";
import {Version} from "./Const/Version";
import {MenuForm} from "./Components/Menu/MenuForm";
import {extractUrlParams} from "./Common/UrlParser";

export const App: FC = () => {


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
    return params === null ?
        <MenuForm/> :
        <AuthForm data={params}/>
}
