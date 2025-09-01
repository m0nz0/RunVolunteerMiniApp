import {TelegramHelper} from "../Common/TelegramHelper";
import {OnInputNameData, SaveData} from "../types";


const controllerName: string = "MiniApp"
const methodNames = {
    NAME_INPUT: "get-data-for-name-input",
    SAVE: "save",
}
const baseUrl: string | undefined = process.env.REACT_APP_BOT_URL;

export default class NameInputService {

    static async getDataForNameInput(locationId: number, calendarId: number): Promise<OnInputNameData> {

        let userId = TelegramHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.NAME_INPUT}/${locationId}/calendar/${calendarId}`;
        console.log("for name input url", fetchUrl)
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

    static async saveNewItem(body: SaveData): Promise<OnInputNameData> {

        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.SAVE}`;
        console.log("save item url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при сохранени данных о записи");
        }

        return response.json();
    }

}
