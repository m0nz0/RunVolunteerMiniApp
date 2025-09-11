import {TelegramHelper} from "@/Common/TelegramHelper";
import {ProfileData} from "@/types";
import {apiFetch} from "@/Common/api";

const methodNames = {
    GET_PROFILE: "get-profile",
}
export default class ProfileService {
    static async getProfile(): Promise<ProfileData> {

        let userId = TelegramHelper.getUser()?.id;
        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.GET_PROFILE;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        // console.log("profile fetch url", fetchUrl)

        return await apiFetch<ProfileData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(userId),
        })
    }
}
