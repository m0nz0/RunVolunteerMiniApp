import React from "react";
import {Breadcrumb} from "react-bootstrap";
import {Link, matchPath, useLocation} from "react-router-dom";
import {appRoutes} from "@/routes";
import {useGlobalContext} from "@/Common/Context/GlobalContext";
import {useUserContext} from "@/Common/Context/UserContext";
import {DateService} from "@/Common/DateService";


const BreadcrumbsComponent: React.FC = () => {
    const {locationDict} = useGlobalContext();
    const {userDatesDict} = useUserContext();
    const {userPositionDict} = useUserContext();
    const location = useLocation();


    const pathNames = location.pathname.split("/").filter(Boolean);

    const findRouteLabel = (url: string): string | undefined => {
        for (const route of appRoutes) {
            let match = matchPath({path: route.path, end: true}, url)
            if (match) {
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

            {pathNames.map((part, index) => {

                const url = "/" + pathNames.slice(0, index + 1).join("/");

                let label = findRouteLabel(url) ?? part;

                let isLast = index === pathNames.length - 1;

                // Если это /locations/:locationId, используем имя из справочника
                if (["new-entry", "locations", "existing-entries"].some(t => t === pathNames[index - 1]) && /^\d+$/.test(part)) {
                    label = locationDict[Number(part)]?.name ?? part;
                    isLast = true
                }
                // Если это /dates/:calendarId, используем имя из справочника
                if (pathNames[index - 1] === "dates" && /^\d+$/.test(part)) {
                    label = DateService.formatDayMonthNameYear(userDatesDict[Number(part)]?.date) ?? part;
                    isLast = true
                }
                // Если это /position/:positionId, используем имя из справочника
                if (pathNames[index - 1] === "position" && /^\d+$/.test(part)) {

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
