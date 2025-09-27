import {LocationFlag} from "./Const/LocationFlag";
import {DefaultPosition} from "./Services/LocationService";
import {PositionType} from "./Const/PositionType";
import {NrmsAction} from "@/Const/Source";

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

export interface RosterCompareData {
    date: CalendarInfo,
    location: UserLocationDictItem,
    positions: Position[],
    data: Record<number, Record<string, VolunteerCompareResult>>
}

export interface VolunteerCompareResult {
    tgId?: number,
    verstData: VerstAthlete,
    action: NrmsAction,
    inNrms: boolean,
    inBot: boolean
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
    defaultPositions: DefaultPosition,
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

export interface PositionAdminData {
    positions: Position[],
    location: UserLocationDictItem
}

export interface PositionData extends PositionAdminData {
    calendar: CalendarInfo,
    team: Team[]
}

export interface TeamData {
    schedules: Team[],
    location: UserLocationDictItem,
    positions: Position[],
    date: CalendarInfo,
    hasOtherLocations: boolean,
    canDelete: boolean,
    verstAthlete: VerstAthlete,
    pollParameters: PollParameters,
    lastEvent?: LastEventData
}

export interface LastEventData {
    eventNumber: number,
    lastDate: string
}
export interface PollParameters {
    initiatorId?: number;
    canCreate: boolean;
    canUndo: boolean;
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

export interface DirectorScheduleData {

    schedules: Team[];
    location: UserLocationDictItem
    dates: CalendarInfo[]
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
    parent_id?: number,
    positionType: PositionType
}

export interface CalendarInfo {

    id: number;
    date: string;
    datetime: string
    eventStatus: string,
    isAdditional: boolean,
}

export interface SaveData {
    locationId: number,
    calendarId: number,
    positionId: number,
    name?: string | null,
    verstId?: number | null,
    tgId: number
}

export interface RosterLocation {
    id: number;
    name: string;
    url: string;
}

export interface RosterLocationResponse {
    result: RosterLocationResult
}

export interface RosterLocationResult {
    event_list: RosterLocation[]
}
