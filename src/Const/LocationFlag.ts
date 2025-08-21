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

export const LocationFlagParams: { [key in LocationFlag]: { name: string, icon: IconProp, color: string } } = {
    [LocationFlag.Favorite]: {name: "Избранные локации", color: "goldenrod", icon: faStar},
    [LocationFlag.Directed]: {name: "Вы директор", color: "indianred", icon: faCrown},
    [LocationFlag.Requested]: {name: "Вы подяли заявку в директора", color: "lightblue", icon: faHourglass},
    [LocationFlag.Home]: {name: "Домашняя локация", color: "blueviolet", icon: faHome},
    [LocationFlag.IsPrepare]: {name: "Готовится к запуску", color: "blue", icon: faRotate},
    [LocationFlag.IsCancel]: {name: "Отменено", color: "red", icon: faBan},
    [LocationFlag.IsBotActive]: {name: "Доступна запись через бота", color: "green", icon: faCheck},
};
