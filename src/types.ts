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

export interface GlobalLocationDictItem {
    verstId: number;
    name: string;
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

export interface PositionDict {
    id: string;
    name: string;
    locationId: string;
}

export interface FlagChecker {
    id: LocationFlag,
    flag: boolean,

}

export interface CalendarData {
    dates: Calendar[],
    locations: UserLocationDictItem[]
    location: UserLocationDictItem,
    schedules: Team[]
}

export interface PositionData {
    positions: Position[],
    calendar: Calendar,
    locations: UserLocationDictItem[]
    team: Team[]
}

export interface Team {
    id: number,
    location: UserLocationDictItem,
    locatinId: number,
    calendar: Calendar,
    calendarId: number,
    position: Position,
    positionId: number,
    name: string,
    tgUserId: number,
    verstId: number,
    tgUser: any
}

export interface Position {
    id: number,
    name: string,
    isDEfault: boolean,
    parentId?: number,
    positionType: PositionType
}

export interface Calendar {

    id: number;
    date: string;
    datetime: string
    eventStatus: string,
    isAdditional: boolean,
}


