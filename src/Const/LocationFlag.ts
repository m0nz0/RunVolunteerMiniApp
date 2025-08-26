import {ReactElement} from "react";
import {Icons} from "./Icons";

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
    [LocationFlag.Favorite]: {name: "Избранные локации", icon: Icons.Favorite},
    [LocationFlag.Directed]: {name: "Вы директор", icon: Icons.Directed},
    [LocationFlag.Requested]: {name: "Вы подяли заявку в директора", icon: Icons.Requested},
    [LocationFlag.Home]: {name: "Домашняя локация", icon: Icons.Home},
    [LocationFlag.IsPrepare]: {name: "Готовится к запуску", icon: Icons.IsPrepare},
    [LocationFlag.IsCancel]: {name: "Отменено", icon: Icons.IsCancel},
    [LocationFlag.IsBotActive]: {name: "Доступна запись через бота", icon: Icons.CheckGreen},
};
