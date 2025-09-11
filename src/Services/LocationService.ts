import {TelegramHelper} from "@/Common/TelegramHelper";
import {DirectorsData, LocationData} from "@/types";
import {LocationViewType} from "@/Const/LocationViewType";
import {apiFetch} from "@/Common/api";

export type DefaultPosition = {
    [key: number]: number[]
}

const methodNames = {
    ALL_LOCATIONS: "get-all-locations",
    WITH_SCHEDULES_LOCATIONS: "locations-for-view-team",
    ON_OFF: "bot-on-off",
    FAVORITE: "favorite",
    DIRECTORS: "directors",
    NEW_DIRECTOR: "new-director",
}
export default class LocationService {
    static async getLocations(locationViewType: LocationViewType): Promise<LocationData> {

        let userId = TelegramHelper.getUser()?.id;
        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = locationViewType === LocationViewType.AllLocations ||
        locationViewType === LocationViewType.ForSchedule ? methodNames.ALL_LOCATIONS :
            methodNames.WITH_SCHEDULES_LOCATIONS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location fetch url", fetchUrl)

        return apiFetch<LocationData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(userId),
        })
    }

    static async locationOnOff(locationId: number, isActive: boolean): Promise<void> {

        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.ON_OFF;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location on off fetch url", fetchUrl)
        await apiFetch<LocationData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                locationId: locationId,
                isActive: isActive
            }),
        })
    }

    static async locationFavorite(locationId: number): Promise<void> {

        let userId = TelegramHelper.getUser()?.id;
        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.FAVORITE;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location favorite fetch url", fetchUrl)

        await apiFetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                locationId: locationId,
                tgId: userId
            }),

        })
    }

    static async locationDirectors(locationId: number): Promise<DirectorsData> {

        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.DIRECTORS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location directors fetch url", fetchUrl)

        return await apiFetch<DirectorsData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(locationId),

        })
    }

    static async createDirectorsRequest(locationId: number): Promise<void> {

        let userId = TelegramHelper.getUser()?.id;

        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.NEW_DIRECTOR;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location new director fetch url", fetchUrl)

        await apiFetch<DirectorsData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                locationId: locationId,
                tgId: userId
            }),
        })
    }
}
