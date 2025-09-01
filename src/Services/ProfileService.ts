import {TelegramHelper} from "../Common/TelegramHelper";
import {ProfileData} from "../types";

const methodNames = {
    GET_PROFILE: "get-profile",
}
export default class ProfileService {
    static async getProfile(): Promise<ProfileData> {

        let userId = TelegramHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.GET_PROFILE;
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
            throw new Error("Ошибка при загрузке данных");
        }

        return response.json();
    }
}
