import {TelegramHelper} from "../Common/TelegramHelper";
import {DirectorsData, LocationData} from "../types";
import {LocationViewType} from "../Const/LocationViewType";

export type DefautPosition = {
    [key: number]: number[]
}

const methodNames = {
    ALL_LOCATIONS: "get-all-locations",
    WITH_SHEDULES_LOCATIONS: "locations-for-view-team",
    ON_OFF: "bot-on-off",
    FAVORITE: "favorite",
    DIRECTORS: "directors",
    NEW_DIRECTOR: "new-director",
}
export default class LocationService {
    static async getLocations(locationViewType: LocationViewType): Promise<LocationData> {

        let userId = TelegramHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = locationViewType === LocationViewType.AllLocations ||
        locationViewType === LocationViewType.ForSchedule ? methodNames.ALL_LOCATIONS :
            methodNames.WITH_SHEDULES_LOCATIONS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(userId),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных локаций");
        }

        return response.json();
    }

    static async locationOnOff(locationId: number, isActive: boolean): Promise<void> {

        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.ON_OFF;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location on off fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                locationId: locationId,
                isActive: isActive
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при включении/отключении");
        }
    }

    static async locationFavorite(locationId: number): Promise<void> {

        let userId = TelegramHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.FAVORITE;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location favorite fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                locationId: locationId,
                tgId: userId
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при обработке избраннго");
        }
    }

    static async locationDirectors(locationId: number): Promise<DirectorsData> {

        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.DIRECTORS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location directors fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(locationId),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при загрузке списка директоров");
        }
        return response.json();
    }

    static async createDirectorsRequest(locationId: number): Promise<void> {

        let userId = TelegramHelper.getUser()?.id;

        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.NEW_DIRECTOR;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location new director fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                locationId: locationId,
                tgId: userId
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при создании заявки в директора");
        }
    }
}
