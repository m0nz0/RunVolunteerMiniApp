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
import {MyEntriesComponent} from "./Components/MyEntries/MyEntriesComponent";
import {PositionAdminComponent} from "./Components/Positions/PositionAdminComponent";
import {AuthComponent} from "./Components/Auth/AuthComponent";
import {LoginType} from "./Const/LoginType";
import {DirectorsScheduleComponent} from "./Components/Team/DirectorsScheduleComponent";


export enum RouteCode {
    Main = "main",
    Locations = "locations",
    Location = "location",
    About = "about",
    ExistingItemsLocations = "existing-items-locations",
    ExistingItemsSelectDate = "existing-item-dates",
    Date = "date",
    Team = "team",
    NewEntrySelectLocation = "new-entry-start",
    // NewLocation = "new-location",
    // NewDate = "new-date",
    NewPosition = "new-position",
    NewName = "new-name",
    Profile = "profile",
    Directors = "directors",
    PositionAdmin = "position-admin",
    MyEntries = "my-entries",
    ExistingEntries = "existing-entries",
    DirectorsSchedule = "directors-schedule",
    NewEntrySelectDate = "new-entry-dates",
    NewEntrySelectPosition = "new-entry-position",
    NewEntryInputName = "new-entry-position",
    LinkMain = "link-main",
    LinkAdditional = "link-additional",
    LoginNrms = "login-nrms",
}

/*
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
    roteCode: RouteCode,
    path: string;
    label: string,//| ((params: Record<string, string>) => string); // текст или функция
    element: React.ComponentType<any>;  // компонент (позже отрендерим)
    extraProps?: Record<string, any>;   // кастомные пропсы
    children?: AppRoute[]
}

export const appRoutes: AppRoute[] = [
    {
        roteCode: RouteCode.Main,
        path: "/",
        label: "Главная",
        element: MenuComponent,
        extraProps: {welcome: "Добро пожаловать!"},
    },
    {
        roteCode: RouteCode.Locations,
        path: "/locations",
        label: "Локации",
        element: AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.AllLocations},
    },
    {
        roteCode: RouteCode.Profile,
        path: "/profile",
        label: "Профиль",
        element: ProfileComponent,
    },
    {
        roteCode: RouteCode.Location,
        path: "/locations/:locationId",
        label: "Локация",
        element: LocationCardComponent,
        extraProps: {},
    },
    {
        roteCode: RouteCode.Directors,
        path: "/locations/:locationId/directors",
        label: "Директора",
        element: DirectorsComponent,
    },
    {
        roteCode: RouteCode.About,
        path: "/about",
        label: "Помощь",
        element: AboutComponent,
        extraProps: {pageSize: 20},
        children: []
    },
    {
        roteCode: RouteCode.PositionAdmin,
        path: "/locations/:locationId/position-admin",
        label: "Управление позициями",
        element: PositionAdminComponent,
    },
    {
        roteCode: RouteCode.MyEntries,
        path: "/my-entries",
        label: "Мои записи",
        element: MyEntriesComponent,
    },
    {
        roteCode: RouteCode.ExistingEntries,
        path: "/existing-entries",
        label: "Кто записан",
        element: AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.WithSchedules},
        children: []
    },
    {
        roteCode: RouteCode.ExistingItemsSelectDate,
        path: "/existing-entries/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        children: [],
        extraProps: {locationViewType: LocationViewType.WithSchedules}
    },
    {
        roteCode: RouteCode.DirectorsSchedule,
        path: "/existing-entries/:locationId/dates/directors",
        label: "График директоров",
        element: DirectorsScheduleComponent,
    },
    {
        roteCode: RouteCode.Team,
        path: "/existing-entries/:locationId/dates/:calendarId/team",
        label: "Команда",
        element: TeamComponent,
    },
    {
        roteCode: RouteCode.NewEntrySelectLocation,
        path: "/new-entry",
        label: "Записаться",
        element:
        AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.ForSchedule},
        children: []
    },
    {
        roteCode: RouteCode.NewEntrySelectDate,
        path: "/new-entry/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        children: [],
        extraProps: {locationViewType: LocationViewType.ForSchedule}
    },
    {
        roteCode: RouteCode.NewEntrySelectPosition,
        path: "/new-entry/:locationId/dates/:calendarId/position",
        label: "Позиции",
        element: PositionComponent,
        children: []
    },
    {
        roteCode: RouteCode.NewEntryInputName,
        path: "/new-entry/:locationId/dates/:calendarId/position/:positionId",
        label: "Запись",
        element: NameSelectorComponent,
    },
    {
        roteCode: RouteCode.LinkMain,
        path: "/login-main",
        label: "Привязать основной аккаунт",
        element: AuthComponent,
        extraProps: {loginType: LoginType.MainAccount},
    },
    {
        roteCode: RouteCode.LinkAdditional,
        path: "/login-additional",
        label: "Привязать дополнительный аккаунт",
        element: AuthComponent,
        extraProps: {loginType: LoginType.AdditionalAccount},
    },
    {
        roteCode: RouteCode.LoginNrms,
        path: "/login-nrms",
        label: "Вход в NRMS",
        element: AuthComponent,
        extraProps: {loginType: LoginType.Nrms},
    },
]

// export function buildPath<R extends AppRoute>(
//     route: R,
//     params: typeof routes[R]["params"]
// ) {
//     return generatePath(routes[route].template, params);
// }
