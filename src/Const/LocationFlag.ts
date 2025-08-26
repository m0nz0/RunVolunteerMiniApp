import {ReactElement} from "react";
import {icons} from "./Icons";

export enum LocationFlag {
    Favorite,
    Directed,
    Requested,
    Home,
    IsPrepare,
    IsCancel,
    IsBotActive
}

export const LocationFlagParams: { [key in LocationFlag]: { name: string, icon: ReactElement } } = {
    [LocationFlag.Favorite]: {name: "Избранные локации", icon: icons.Favorite},
    [LocationFlag.Directed]: {name: "Вы директор", icon: icons.Directed},
    [LocationFlag.Requested]: {name: "Вы подяли заявку в директора", icon: icons.Requested},
    [LocationFlag.Home]: {name: "Домашняя локация", icon: icons.Home},
    [LocationFlag.IsPrepare]: {name: "Готовится к запуску", icon: icons.IsPrepare},
    [LocationFlag.IsCancel]: {name: "Отменено", icon: icons.IsCancel},
    [LocationFlag.IsBotActive]: {name: "Доступна запись через бота", icon: icons.CheckGreen},
};
