import {faBan, faCheck, faCrown, faHome, faHourglass, faRotate, faStar} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export enum LocationFlag {

    Favorite,
    Directed,
    Requested,
    Home,
    IsPrepare,
    IsCancel,
    IsBotActive
}

export const LocationFlagName: { [key in LocationFlag]: string } = {
    [LocationFlag.Favorite]: "Избранные локации",
    [LocationFlag.Directed]: "Вы директор",
    [LocationFlag.Requested]: "Вы подяли заявку в директора",
    [LocationFlag.Home]: "Домашняя локация",
    [LocationFlag.IsPrepare]: "Готовится к запуску",
    [LocationFlag.IsCancel]: "Отменено",
    [LocationFlag.IsBotActive]: "Доступна запись через бота",
};

export const LocationFlagIcon: { [key in LocationFlag]: IconProp } = {
    [LocationFlag.Favorite]: faStar,
    [LocationFlag.Directed]: faCrown,
    [LocationFlag.Requested]: faHourglass,
    [LocationFlag.Home]: faHome,
    [LocationFlag.IsPrepare]: faRotate,
    [LocationFlag.IsCancel]: faBan,
    [LocationFlag.IsBotActive]: faCheck,
};

export const LocationFlagColor: { [key in LocationFlag]: string } = {
    [LocationFlag.Favorite]: "goldenrod",
    [LocationFlag.Directed]: "indianred",
    [LocationFlag.Requested]: "lightblue",
    [LocationFlag.Home]: "blueviolet",
    [LocationFlag.IsPrepare]: "blue",
    [LocationFlag.IsCancel]: "red",
    [LocationFlag.IsBotActive]: "green",
};
