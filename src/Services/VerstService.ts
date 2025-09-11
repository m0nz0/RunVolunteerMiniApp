import {apiFetch} from "@/Common/api";
import {RosterLocationResponse} from "@/types";

const methodNames = {
    ALL_LOCATIONS: "event/list",
    COMPARE_ROSTER: "event/list",
}
export default class VerstService {
    static async getLocations(): Promise<any> {

        let baseUrl = import.meta.env.VITE_BASE_URL;
        let controllerName = "website";
        let methodName = methodNames.ALL_LOCATIONS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location fetch url", fetchUrl)
        return await apiFetch<any>(fetchUrl, {
            method: "POST",
        })
    }

    static async getNrmsToken(login: string, pass: string): Promise<any> {

        let baseUrl = import.meta.env.VITE_BASE_URL;
        let authUrl = import.meta.env.VITE_NRMS_AUTH_URL;
        let body = {username: 'A' + login, password: pass}
        let fetchUrl = `${baseUrl}${authUrl}`;

        return await apiFetch<any>(fetchUrl, {
            method: 'POST',
            body: JSON.stringify(body)
        })
    }

    static async getAllowedLocations(): Promise<RosterLocationResponse> {

        let baseUrl = import.meta.env.VITE_BASE_URL;
        let authUrl = import.meta.env.VITE_ALOWED_NRMS_LOCATIONS_URL;
        let fetchUrl = `${baseUrl}${authUrl}`

        return await apiFetch<RosterLocationResponse>(fetchUrl, {
            method: 'POST',
        })
    }

    static async saveRoster(saveData: any): Promise<void> {

        let baseUrl = import.meta.env.VITE_BASE_URL;
        let saveUrl = import.meta.env.VITE_NRMS_SAVE_URL;
        let fetchUrl = `${baseUrl}${saveUrl}`

        return await apiFetch(fetchUrl, {
            method: 'POST',
            body: JSON.stringify(saveData)
        })
    }
}
