import MenuComponent from "./Components/Menu/MenuComponent";
import {DatesComponent} from "./Components/Dates/DatesComponent";
import {PositionComponent} from "./Components/Positions/PositionComponent";
import {NameSelectorComponent} from "./Components/NameSelector/NameSelectorComponent";
import {AllLocationsComponent} from "./Components/Location/AllLocationsComponent";
import {TeamComponent} from "./Components/Team/TeamComponent";
import {LocationViewType} from "./Const/LocationViewType";
import {AboutComponent} from "./Components/About/AboutComponent";
import {LocationCardComponent} from "./Components/Location/LocationCardComponent";
import {ProfileComponent} from "./Components/Profile/ProfileComponent";
import {DirectorsComponent} from "./Components/Directors/DirectorsComponent";


/*export enum RouteCode {
    Main = "main",
    Locations = "locations",
    Location = "location",
    About = "about",
    ExistingItemsLocations = "existing-items-locations",
    ExistingItemDates = "existing-item-dates",
    Date = "date",
    Team = "team",
    NewEntryStart = "new-entry-start",
    // NewLocation = "new-location",
    // NewDate = "new-date",
    NewPosition = "new-position",
    NewName = "new-name",
}

type RouteConfig<Params extends Record<string, string | number> = any> = {
    path: string,
    label: string,
    element: ComponentType<any>,
    extraProps?: Record<string, any>;   // кастомные пропсы
    children?: AppRoute[]
    params?: Params;
}

export const routes: Record<RouteCode, RouteConfig> = {
    [RouteCode.Main]: {
        path: "/",
        label: "Главная",
        element: MenuComponent,
    },
    [RouteCode.Locations]: {
        path: "/locations",
        label: "Локации",
        element: AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.AllLocations},
    },
    [RouteCode.Location]: {
        path: "/locations/:locationId",
        label: "Локация",
        element: LocationCardComponent,
        params: {locationId: ""}
    },
    [RouteCode.About]: {
        path: "/about",
        label: "Помощь",
        element: AboutComponent,
    },
// {
//     path: "/my-entries",
//     label: "Мои записи",
//     element: MyEntriesComponent,
//     extraProps: {pageSize: 20},
// },

    [RouteCode.ExistingItemsLocations]: {
        path: "/existing-entries",
        label: "Кто записан",
        element: AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.WithSchedules},
        children: []
    },
    [RouteCode.ExistingItemDates]: {
        path: "/existing-entries/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        extraProps:
            {
                locationViewType: LocationViewType.WithSchedules
            },
        params: {locationId: ""}
    },
    [RouteCode.Team]: {
        path: "/existing-entries/:locationId/dates/:calendarId/team",
        label: "Команда",
        element: TeamComponent,
        params: {locationId: "", calendarId: ""}
    },
    [RouteCode.NewEntryStart]: {
        path: "/new-entry",
        label: "Записаться",
        element: AllLocationsComponent,
        extraProps:
            {
                locationViewType: LocationViewType.ForSchedule
            }
    },
    [RouteCode.Date]: {
        path: "/new-entry/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        extraProps:
            {
                locationViewType: LocationViewType.ForSchedule
            },
        params: {locationId: ""}
    },
    [RouteCode.NewPosition]: {
        path: "/new-entry/:locationId/dates/:calendarId/position",
        label: "Позиции",
        element: PositionComponent,
    },
    [RouteCode.NewName]: {
        path: "/new-entry/:locationId/dates/:calendarId/position/:positionId",
        label: "Запись",
        element: NameSelectorComponent,
    },
}*/

export interface AppRoute {
    path: string;
    label: string,//| ((params: Record<string, string>) => string); // текст или функция
    element: React.ComponentType<any>;  // компонент (позже отрендерим)
    extraProps?: Record<string, any>;   // кастомные пропсы
    children?: AppRoute[]
}

export const appRoutes: AppRoute[] = [
    {
        path: "/",
        label: "Главная",
        element: MenuComponent,
        extraProps: {welcome: "Добро пожаловать!"},
    },
    {
        path: "/locations",
        label: "Локации",
        element: AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.AllLocations},
    },
    {
        path: "/profile",
        label: "Профиль",
        element: ProfileComponent,
    },
    {
        path: "/locations/:locationId",
        label: "Локация",
        element: LocationCardComponent,
        extraProps: {showFooter: true},
    },
    {
        path: "/locations/:locationId/directors",
        label: "Директора",
        element: DirectorsComponent,
    },
    {
        path: "/about",
        label: "Помощь",
        element: AboutComponent,
        extraProps: {pageSize: 20},
        children: []
    },
    // {
    //     path: "/my-entries",
    //     label: "Мои записи",
    //     element: MyEntriesComponent,
    //     extraProps: {pageSize: 20},
    // },
    {
        path: "/existing-entries",
        label: "Кто записан",
        element: AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.WithSchedules},
        children: []
    },
    {
        path: "/existing-entries/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        children: [],
        extraProps: {locationViewType: LocationViewType.WithSchedules}
    },
    {
        path: "/existing-entries/:locationId/dates/:calendarId/team",
        label: "Команда",
        element: TeamComponent,
    },
    {
        path: "/new-entry",
        label: "Записаться",
        element:
        AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.ForSchedule},
        children: []
    },
    {
        path: "/new-entry/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        children: [],
        extraProps: {locationViewType: LocationViewType.ForSchedule}
    },
    {
        path: "/new-entry/:locationId/dates/:calendarId/position",
        label: "Позиции",
        element: PositionComponent,
        children: []
    },
    {
        path: "/new-entry/:locationId/dates/:calendarId/position/:positionId",
        label: "Запись",
        element: NameSelectorComponent,
    },
]

// export function buildPath<R extends AppRoute>(
//     route: R,
//     params: typeof routes[R]["params"]
// ) {
//     return generatePath(routes[route].template, params);
// }
