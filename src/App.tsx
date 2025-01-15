import React, {FC} from "react";
import {AuthForm} from "./Components/AuthForm";
import {AllParams} from "./types";
import {Source} from "./Const/Source";
import {Target} from "./Const/Target";
import {Action} from "./Const/Action";
import {Version} from "./Const/Version";

export const App: FC = () => {


    function getUrlParams(): AllParams {
        let url = document.location;
        console.log("url", url.href)
        let urlParams = url.search.split('?')[1]
            .split('&')
            .map((item) => {
                let s = item.split('=');
                return {key: s[0], value: s[1]}
            })

        let calendarId = urlParams.find(x => x.key === 'c')?.value;
        let locationId = urlParams.find(x => x.key === 'l')?.value;
        let source = urlParams.filter(x => x.key === 's')[0].value;
        let target = urlParams.filter(x => x.key === 't')[0].value;
        let action = urlParams.filter(x => x.key === 'a')[0].value;
        let version = urlParams.filter(x => x.key === 'v')[0].value;
        let verstId = urlParams.find(x => x.key === 'vi')?.value;
        return {
            calendarId: calendarId ? Number(calendarId) : undefined,
            locationId: locationId ? Number(locationId) : undefined,
            source: Source[source as keyof typeof Source],
            target: Target[target as keyof typeof Target],
            action: Action[action as keyof typeof Action],
            version: Version[version as keyof typeof Version],
            verstId: verstId,
        }
    }

    return <AuthForm data={getUrlParams()}/>
}
