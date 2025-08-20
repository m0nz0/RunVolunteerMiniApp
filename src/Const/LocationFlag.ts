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
    [LocationFlag.IsBotActive]: "Доступна запсить через бота",
};

export const LocationFlagIcon: { [key in LocationFlag]: string } = {
    [LocationFlag.Favorite]: "<FontAwesomeIcon icon={byPrefixAndName.fas['star']} />",
    [LocationFlag.Directed]: "<FontAwesomeIcon icon={byPrefixAndName.fas['crown']} />",
    [LocationFlag.Requested]: "<FontAwesomeIcon icon={byPrefixAndName.fas['hourglass-start']} />",
    [LocationFlag.Home]: "<FontAwesomeIcon icon={byPrefixAndName.fas['house']} />",
    [LocationFlag.IsPrepare]: "<FontAwesomeIcon icon={byPrefixAndName.fas['arrows-rotate']} />",
    [LocationFlag.IsCancel]: "<FontAwesomeIcon icon={byPrefixAndName.fas['ban']} />",
    [LocationFlag.IsBotActive]: "<FontAwesomeIcon icon={byPrefixAndName.fas['check']} />",
export const LocationFlagIcon: { [key in LocationFlag]: IconProp } = {
    [LocationFlag.Favorite]: faStar,
    [LocationFlag.Directed]: faCrown,
    [LocationFlag.Requested]: faHourglass,
    [LocationFlag.Home]: faHome,
    [LocationFlag.IsPrepare]: faRotate,
    [LocationFlag.IsCancel]: faBan,
    [LocationFlag.IsBotActive]: faCheck,
};
