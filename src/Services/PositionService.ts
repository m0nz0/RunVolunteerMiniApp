import {UserHelper} from "../Common/UserHelper";
import {PositionData, UserLocationDictItem} from "../types";

export type DefautPosition = {
    [key: number]: number[]
}

export default class PositionService {
    static async getPositions(locationId: number, calendarId: number): Promise<PositionData> {

        let userId = UserHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = "get-positions-for-schedule";
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}/${locationId}/calendar/${calendarId}`;
        console.log("position fetch url", fetchUrl)
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
