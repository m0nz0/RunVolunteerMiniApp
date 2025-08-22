import MenuComponent from "./Components/Menu/MenuComponent";
import AllLocationsComponent from "./Components/AllLocations/AllLocationsComponent";
import {AboutComponent} from "./Components/About/AboutComponent";
import MyEntriesComponent from "./Components/MyEntries/MyEntriesComponent";
import ExistingEntriesComponent from "./Components/ExistingEntries/ExistingEntriesComponent";
import {DatesComponent} from "./Components/Dates/DatesComponent";
import {PositionComponent} from "./Components/Positions/PositionComponent";
import {NameSelectorComponent} from "./Components/NameSelector/NameSelectorComponent";

export interface AppRoute {
    path: string;
    label: string,//| ((params: Record<string, string>) => string); // текст или функция
    element: React.ComponentType<any>;  // компонент (позже отрендерим)
    extraProps?: Record<string, any>;   // кастомные пропсы
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
        path: "/about",
        label: "Помощь",
        element: AboutComponent,
        extraProps: {pageSize: 20},
    },

    {
        path: "/my-entries",
        label: "Мои записи",
        element: MyEntriesComponent,
        extraProps: {pageSize: 20},
    },
    {
        path: "/existing-entries",
        label: "Кто записан",
        element: ExistingEntriesComponent,
        extraProps: {pageSize: 20},
    },
    {
        path: "/new-entry",
        label: "Записаться",
        element: AllLocationsComponent,
        extraProps: {forSchedule: true},
    },
    {
        path: "/new-entry/:locationId/dates",
        label: "Дата",
        element: DatesComponent,
        extraProps: {forSchedule: true},
    },
    {
        path: "/new-entry/:locationId/dates/:calendarId/position",
        label: "Позиции",
        element: PositionComponent,
        extraProps: {forSchedule: true},
    },
    {
        path: "/new-entry/:locationId/dates/:calendarId/position/:positionId/",
        label: "Запись",
        element: NameSelectorComponent,
        extraProps: {forSchedule: true},
    },
    // {
    //     path: "/orders/:status",
    //     label: (params) => `Заказы (${params.status})`,
    //     element: OrdersPage
    //     extraProps: {showDetails: true},,
    // },
];
