import {TelegramHelper} from "../Common/TelegramHelper";

const methodNames = {
    ALL_LOCATIONS: "event/list",
}
export default class VerstService {
    static async getLocations(): Promise<any> {

        let userId = TelegramHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BASE_URL;
        let controllerName = "website";
        let methodName = methodNames.ALL_LOCATIONS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        console.log("location fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
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

    static async getToken(login: string, pass: string): Promise<string> {

        let baseUrl = process.env.REACT_APP_BASE_URL;
        let authUrl = process.env.REACT_APP_NRMS_AUTH_URL;
        let body = {username: 'A' + login, password: pass}

        return await fetch(`${baseUrl}${authUrl}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
            .then(value => value.json())
            .then(value => {
                if (value.errorMessage) {
                    throw new Error(value.errorMessage)
                }

                return value?.result?.token;
            })
    }

    static async getAllowedLocations(token: string): Promise<any[]> {

        let baseUrl = process.env.REACT_APP_BASE_URL;
        let authUrl = process.env.REACT_APP_ALOWED_NRMS_LOCATIONS_URL;

        return await fetch(`${baseUrl}${authUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
            .then(value => value.json())
            .then(value => {
                if (value.errorMessage) {
                    throw new Error(value.errorMessage)
                }

                return (value?.result?.event_list || []);
            })
    }
}
