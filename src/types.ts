import {Version} from "./Const/Version";
import {Action} from "./Const/Action";
import {Target} from "./Const/Target";
import {Source} from "./Const/Source";
import {LocationFlag} from "./Const/LocationFlag";
import {DefautPosition} from "./Services/LocationService";
import {PositionType} from "./Const/PositionType";

export type AllParams = {
    calendarId: number | undefined,
    locationId: number | undefined,
    source: Source,
    target: Target,
    action: Action,
    version: Version,
    verstId: string | undefined,
}

export type VerstResponse = {
    token: string,
    error: string
}

interface WebApp {
    MainButton: any;

    close(): void;

    colorScheme: string;

    expand(): void;

    initData: string;
    initDataUnsafe: object;
    isExpanded: boolean;

    isVersionAtLeast(ver: string): boolean;

    offEvent(eventType: string, callBack: Function): void;

    onEvent(eventType: string, callBack: Function): void;

    openTgLink(url: string): void;

    ready(): void;

    sendData(data: string): void;

    themeParams: object;
    version: string;
    viewportHeight: number;
    viewportStableHeight: number;
    disableVerticalSwipes: any;

    showAlert: any
}

interface Window {
    Telegram: {
        WebView: any;
        webData: any;
        WebApp: WebApp;
    };
}

export interface VerstLocation {
    id: number;
    name: string;
    url: string;
    lat: number;
    lon: number;
    city_name: string;
    subject_name: string;
    status: string
}

export interface DirectorsData {
    location: VerstLocation;
    verstDirectors: Record<number, VerstAthlete>,
    directors: TgUser[]

}

export interface GlobalLocationDictItem {
    verstId: number;
    name: string;
}

export interface LocationData {
    user: TgUser,
    locations: UserLocationDictItem[]
}

export interface UserLocationDictItem extends GlobalLocationDictItem {
    cityName: string,
    isFavorite: boolean,
    isHome: boolean,
    isDirected: boolean,
    isRequested: boolean,
    verstActive: boolean,
    verstStatusName: string,
    verstStatusCode: string,
    botActive: boolean,
    url: string,
    lat: number,
    lon: number,
    href: string,
    defaultPositions: DefautPosition,
    directorTgIds: number[],
    locationFlags: string[]
}

export interface FlagChecker {
    id: LocationFlag,
    flag: boolean,

}

export interface CalendarData {
    dates: CalendarInfo[],
    locations: UserLocationDictItem[]
    location: UserLocationDictItem,
    schedules: Team[]
}

export interface PositionData {
    positions: Position[],
    calendar: CalendarInfo,
    locations: UserLocationDictItem[]
    team: Team[]
}

export interface TeamData {
    schedules: Team[],
    location: UserLocationDictItem,
    positions: Position[],
    date: CalendarInfo,
    hasOtherLocations: boolean,

}

export interface OnInputNameData {
    location: UserLocationDictItem,
    verstUsers: VerstAthlete[],
    date: CalendarInfo
    allUsersDict: { key: VerstIdInfo; value: VerstAthlete }[];
}

export interface ProfileData {
    tgUser: TgUser,
    allUsersDict: { key: VerstIdInfo; value: VerstAthlete }[];
}

export interface VerstIdInfo {
    verstId: number;
    isMain: boolean;
}

export interface VerstAthlete {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    full_name: string;
    home_event: string;
    qr_code: string;
}

export interface Team {
    id: number,
    location: UserLocationDictItem,
    locationId: number,
    calendar: CalendarInfo,
    calendarId: number,
    position: Position,
    positionId: number,
    name: string,
    tgUserId: number,
    verstId: number,
    tgUser: TgUser
}

export interface ExistingDatesInfo {
    dates: CalendarInfo[],
    location: UserLocationDictItem,
}

export interface TgUser {
    id: number,
    tgId: number,
    tgLogin: string,
    lastName: string,
    firstName: string,
    homeLocationId?: number,
    isAdmin: boolean,
    verstIds: VerstIdInfo[],
    locationDirectors: { locationId: number }[]
    favoriteLocations: { locationId: number }[]
}

export interface Position {
    id: number,
    name: string,
    is_default: boolean,
    parentId?: number,
    positionType: PositionType
}

export interface CalendarInfo {

    id: number;
    date: string;
    datetime: string
    eventStatus: string,
    isAdditional: boolean,
}


