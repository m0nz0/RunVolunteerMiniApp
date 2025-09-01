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
}
