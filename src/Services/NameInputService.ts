import {UserHelper} from "../Common/UserHelper";
import {CalendarInfo, CalendarData, Team, TeamData, OnInputNameData} from "../types";


const controllerName: string = "MiniApp"
const methodNames = {
    NAME_INPUT: "get-data-for-name-input",
}
const baseUrl: string | undefined = process.env.REACT_APP_BOT_URL;

export default class NameInputService {

    static async getDataForNameInput(locationId: number, calendarId: number): Promise<OnInputNameData> {

        let userId = UserHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.NAME_INPUT}/${locationId}/calendar/${calendarId}`;
        console.log("for name input url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(/*userId*/182817160),
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
