import {getTelegramUser} from "@/Common/TelegramHelper";
import {OnInputNameData, SaveData} from "@/types";
import {apiFetch} from "@/Common/api";


const controllerName: string = "MiniApp"
const methodNames = {
    NAME_INPUT: "get-data-for-name-input",
    SAVE: "save",
}
const baseUrl: string | undefined = import.meta.env.VITE_BOT_URL;

export default class NameInputService {

    static async getDataForNameInput(locationId: number, calendarId: number, positionId: number): Promise<OnInputNameData> {

        let userId = getTelegramUser().id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.NAME_INPUT}/${locationId}/calendar/${calendarId}/position/${positionId}`;
        // console.log("for name input url", fetchUrl)

        return await apiFetch<OnInputNameData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(userId),
        })
    }

    static async saveNewItem(body: SaveData): Promise<void> {

        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.SAVE}`;
        // console.log("save item url", fetchUrl)

        await apiFetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(body),
        })
    }
}
