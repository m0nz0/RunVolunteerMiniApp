import {UserHelper} from "../Common/UserHelper";

export type LocationInfo = {
    verstId: number,
    name: string,
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

export type DefautPosition = {
    [key: number]: number[]
}

export default class LocationService {
    static async getLocations(): Promise<LocationInfo[]> {

        let userId = UserHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = "get-all-locations";
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(/*userId*/182817160),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных");
        }

        return response.json();
    }
}
