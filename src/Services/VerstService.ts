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

//790065631
    static async authVerst(login: string, pass: string): Promise<any> {

        let baseUrl = process.env.REACT_APP_BASE_URL;
        let fetchUrl = `${baseUrl}${process.env.REACT_APP_VERST_AUTH_URL}`;
        console.log("verst auth fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json',
                // 'Accept': 'application/json',
            },
            body: JSON.stringify({username: 'A' + login, password: pass})
        });

        console.log(response)

        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных");
        }

        return response.json();
    }
}
