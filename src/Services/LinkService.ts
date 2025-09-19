import {getTelegramUser} from "@/Common/TelegramHelper";
import {apiFetch} from "@/Common/api";

const controllerName: string = "MiniApp"
const methodNames = {
    LINK: "link",
    UNLINK: "unlink"
}
const baseUrl: string | undefined = import.meta.env.VITE_BOT_URL;

export default class LinkService {

    static async link(verstId: number): Promise<void> {

        let userId = getTelegramUser().id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.LINK}`;
        // console.log("link url", fetchUrl)

        await apiFetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                VerstId: verstId,
                TgId: userId
            }),
        })
    }

    static async unLink(verstId: number): Promise<boolean> {

        let userId = getTelegramUser().id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.UNLINK}`;
        // console.log("unlink url", fetchUrl)

        return await apiFetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                VerstId: verstId,
                TgId: userId
            }),
        })
    }
}
