import {Version} from "./Const/Version";
import {Action} from "./Const/Action";
import {Target} from "./Const/Target";
import {Source} from "./Const/Source";

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
