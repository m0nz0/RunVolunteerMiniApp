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
import {RosterComponent} from "./Components/Roster/RosterComponent";
import {ComponentType} from "react";
import {ReportComponent} from "@/Components/Report/ReportComponent";


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
    NewEntrySelectPosition = "new-entry-positЯion",
    NewEntryInputName = "new-entry-position",
    LinkMain = "link-main",
    LinkAdditional = "link-additional",
    LoginNrms = "login-nrms",
    CheckRoster = "CheckRoster",
    PreviewRoster = "PreviewRoster",
    Report="Report"
}

export interface AppRoute {
    routeCode: RouteCode,
    path: string;
    label: string,//| ((params: Record<string, string>) => string); // текст или функция
    element: ComponentType<any>;  // компонент (позже отрендерим)
    extraProps?: Record<string, any>;   // кастомные пропсы
    children?: AppRoute[]
}

export const appRoutes: AppRoute[] = [
    {
        routeCode: RouteCode.Main,
        path: "/",
        label: "Главная",
        element: MenuComponent,
        extraProps: {welcome: "Добро пожаловать!"},
    },
    {
        routeCode: RouteCode.Locations,
        path: "/locations",
        label: "Локации",
        element: AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.AllLocations},
    },
    {
        routeCode: RouteCode.Profile,
        path: "/profile",
        label: "Профиль",
        element: ProfileComponent,
    },
    {
        routeCode: RouteCode.Location,
        path: "/locations/:locationId",
        label: "Локация",
        element: LocationCardComponent,
        extraProps: {},
    },
    {
        routeCode: RouteCode.Directors,
        path: "/locations/:locationId/directors",
        label: "Директора",
        element: DirectorsComponent,
    },
    {
        routeCode: RouteCode.About,
        path: "/about",
        label: "Помощь",
        element: AboutComponent,
        extraProps: {pageSize: 20},
        children: []
    },
    {
        routeCode: RouteCode.PositionAdmin,
        path: "/locations/:locationId/position-admin",
        label: "Управление позициями",
        element: PositionAdminComponent,
    },
    {
        routeCode: RouteCode.MyEntries,
        path: "/my-entries",
        label: "Мои записи",
        element: MyEntriesComponent,
    },
    {
        routeCode: RouteCode.ExistingEntries,
        path: "/existing-entries",
        label: "Кто записан",
        element: AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.WithSchedules},
        children: []
    },
    {
        routeCode: RouteCode.ExistingItemsSelectDate,
        path: "/existing-entries/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        children: [],
        extraProps: {locationViewType: LocationViewType.WithSchedules}
    },
    {
        routeCode: RouteCode.DirectorsSchedule,
        path: "/existing-entries/:locationId/dates/directors",
        label: "График директоров",
        element: DirectorsScheduleComponent,
    },
    {
        routeCode: RouteCode.Team,
        path: "/existing-entries/:locationId/dates/:calendarId/team",
        label: "Команда",
        element: TeamComponent,
    },
    {
        routeCode: RouteCode.NewEntrySelectLocation,
        path: "/new-entry",
        label: "Записаться",
        element:
        AllLocationsComponent,
        extraProps: {locationViewType: LocationViewType.ForSchedule},
        children: []
    },
    {
        routeCode: RouteCode.NewEntrySelectDate,
        path: "/new-entry/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        children: [],
        extraProps: {locationViewType: LocationViewType.ForSchedule}
    },
    {
        routeCode: RouteCode.NewEntrySelectPosition,
        path: "/new-entry/:locationId/dates/:calendarId/position",
        label: "Позиции",
        element: PositionComponent,
        children: []
    },
    {
        routeCode: RouteCode.NewEntryInputName,
        path: "/new-entry/:locationId/dates/:calendarId/position/:positionId",
        label: "Запись",
        element: NameSelectorComponent,
    },
    {
        routeCode: RouteCode.LinkMain,
        path: "/login-main",
        label: "Привязать основной аккаунт",
        element: AuthComponent,
        extraProps: {loginType: LoginType.MainAccount},
    },
    {
        routeCode: RouteCode.LinkAdditional,
        path: "/login-additional",
        label: "Привязать дополнительный аккаунт",
        element: AuthComponent,
        extraProps: {loginType: LoginType.AdditionalAccount},
    },
    {
        routeCode: RouteCode.LoginNrms,
        path: "/login-nrms",
        label: "Вход в NRMS",
        element: AuthComponent,
        extraProps: {loginType: LoginType.Nrms},
    },
    {
        routeCode: RouteCode.CheckRoster,
        path: "/existing-entries/:locationId/dates/:calendarId/team/auth-roster",
        label: "Вход в NRMS",
        element: AuthComponent,
        extraProps: {loginType: LoginType.Nrms}
    },
    {
        routeCode: RouteCode.PreviewRoster,
        path: "/existing-entries/:locationId/dates/:calendarId/team/preview-roster",
        label: "Проверка данных для заливки",
        element: RosterComponent,
    },
    {
        routeCode: RouteCode.Report,
        path: "/existing-entries/:locationId/report",
        label: "Отчет",
        element: ReportComponent,
    },
]
