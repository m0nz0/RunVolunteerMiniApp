import {TelegramHelper} from "../Common/TelegramHelper";

const controllerName: string = "MiniApp"
const methodNames = {
    LINK: "link",
    UNLINK: "unlink"
}
const baseUrl: string | undefined = process.env.REACT_APP_BOT_URL;

export default class LinkServise {

    static async link(verstId: number): Promise<void> {

        let userId = TelegramHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.LINK}`;
        console.log("link url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                VerstId: verstId,
                TgId: userId
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при привязке аккаунтов");
        }

        return response.json();
    }

    static async unLink(verstId: number): Promise<boolean> {

        let userId = TelegramHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.UNLINK}`;
        console.log("unlink url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                VerstId: verstId,
                TgId: userId
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при отвязке аккаунтов");
        }

        return response.json();
    }
}
