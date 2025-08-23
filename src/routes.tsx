import MenuComponent from "./Components/Menu/MenuComponent";
import {AboutComponent} from "./Components/About/AboutComponent";
import MyEntriesComponent from "./Components/MyEntries/MyEntriesComponent";
import ExistingEntriesComponent from "./Components/ExistingEntries/ExistingEntriesComponent";
import {DatesComponent} from "./Components/Dates/DatesComponent";
import {PositionComponent} from "./Components/Positions/PositionComponent";
import {NameSelectorComponent} from "./Components/NameSelector/NameSelectorComponent";
import {AllLocationsComponent} from "./Components/Location/AllLocationsComponent";
import {LocationCardComponent} from "./Components/Location/LocationCardComponent";
import {LocationInfoComponent} from "./Components/Location/LocationInfoComponent";
import {TeamComponent} from "./Components/Team/TeamComponent";

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
        extraProps: {forSchedule: false},
    },
    {
        path: "/locations/:locationId",
        label: "Локация",
        element: LocationInfoComponent,
        extraProps: {forSchedule: false},
    },
    // {
    //     path: "/about",
    //     label: "Помощь",
    //     element: AboutComponent,
    //     extraProps: {pageSize: 20},
    //     children: []
    // },
    // {
    //     path: "/my-entries",
    //     label: "Мои записи",
    //     element: MyEntriesComponent,
    //     extraProps: {pageSize: 20},
    // },
    {
        path: "/existing-entries",
        label: "Кто записан",
        element: ExistingEntriesComponent,
        extraProps: {pageSize: 20},
        children: []
    },
    {
        path: "/existing-entries/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        children: [],
        extraProps:{forSchedule: false}
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
        extraProps: {forSchedule: true},
        children: []
    },
    {
        path: "/new-entry/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        children: []
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
