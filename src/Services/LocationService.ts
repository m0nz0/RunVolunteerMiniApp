import {UserHelper} from "../Common/UserHelper";
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
}
export default class LocationService {
    static async getLocations(locationViewType: LocationViewType): Promise<LocationData> {

        let userId = UserHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = locationViewType === LocationViewType.AllLocations ||
        locationViewType === LocationViewType.ForSchedule ? methodNames.ALL_LOCATIONS :
            methodNames.WITH_SHEDULES_LOCATIONS;
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

    static async locationOnOff(locationId: number, isActive: boolean): Promise<void> {

        let userId = UserHelper.getUser()?.id;
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
            throw new Error("Ошибка при загрузке данных");
        }
    }

    static async locationFavorite(locationId: number): Promise<void> {

        let userId = UserHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.FAVORITE;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location favorite fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                locationId: locationId,
                tgId: /*userId*/ 182817160
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных");
        }
    }

    static async locationDirectors(locationId: number): Promise<DirectorsData> {

        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.DIRECTORS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location favorite fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(locationId),
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
