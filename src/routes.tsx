import MenuComponent from "./Components/Menu/MenuComponent";
import {DatesComponent} from "./Components/Dates/DatesComponent";
import {PositionComponent} from "./Components/Positions/PositionComponent";
import {NameSelectorComponent} from "./Components/NameSelector/NameSelectorComponent";
import {AllLocationsComponent} from "./Components/Location/AllLocationsComponent";
import {LocationInfoComponent} from "./Components/Location/LocationInfoComponent";
import {TeamComponent} from "./Components/Team/TeamComponent";
import {LocationViewType} from "./Const/LocationViewType";
import {AboutComponent} from "./Components/About/AboutComponent";

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
        path: "/locations/:locationId",
        label: "Локация",
        element: LocationInfoComponent,
        extraProps: {forSchedule: false},
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
