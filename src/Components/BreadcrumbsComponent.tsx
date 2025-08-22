import React from "react";
import {Breadcrumb} from "react-bootstrap";
import {Link, matchPath, useLocation, useMatch} from "react-router-dom";
import {appRoutes} from "../routes";
import {useGlobalContext} from "../Common/Context/GlobalContext";
import {useUserContext} from "../Common/Context/UserContext";
import {dateService} from "../Common/dateService";


const BreadcrumbsComponent: React.FC = () => {
    const {locationDict} = useGlobalContext();
    const {userDatesDict} = useUserContext();
    const {userPositionDict} = useUserContext();
    // const params = useParams<{ locationId?: string }>();
    const location = useLocation();


    const pathnames = location.pathname.split("/").filter(Boolean);
    const match = useMatch("/locations/:locationId/*");
    const locationId = match?.params.locationId;

    const findRouteLabel = (url: string): string | undefined => {
        for (const route of appRoutes) {
            let match = matchPath({path: route.path, end: true}, url)
            // console.log(match)
            if (match) {
                // console.log(route, url, match)
                return route.label; // теперь всегда string
            }
        }
        return undefined;
    };

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>
                Главная
            </Breadcrumb.Item>

            {pathnames.map((part, index) => {

                const url = "/" + pathnames.slice(0, index + 1).join("/");

                let label = findRouteLabel(url) ?? part;

                let isLast = index === pathnames.length - 1;

                // Если это /locations/:locationId, используем имя из справочника
                if (["new-entry", "locations"].some(t => t === pathnames[index - 1]) && /^\d+$/.test(part)) {
                    label = locationDict[Number(part)]?.name ?? part;
                    isLast = true
                }
                // Если это /dates/:calendarId, используем имя из справочника
                if (pathnames[index - 1] === "dates" && /^\d+$/.test(part)) {
                    label = dateService.formatDayMonthNameYear(userDatesDict[Number(part)]?.date) ?? part;
                    isLast = true
                }
                // Если это /position/:positionId, используем имя из справочника
                if (pathnames[index - 1] === "position" && /^\d+$/.test(part)) {
                    // console.log(part, userPositionDict)
                    label = userPositionDict[Number(part)]?.name ?? part;
                    isLast = true
                }

                return (<Breadcrumb.Item key={url} linkAs={Link} linkProps={{to: url}} active={isLast}>
                        {label}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default BreadcrumbsComponent;
