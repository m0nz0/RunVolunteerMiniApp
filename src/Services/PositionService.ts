import {UserHelper} from "../Common/UserHelper";
import {Position, PositionData} from "../types";

const url = {
    ALL_POSITIONS: "get-all-positions",
    POSITIONS_FOR_SCHEDULE: "get-positions-for-schedule"
}

export default class PositionService {
    static async getPositionsForSchedule(locationId: number, calendarId: number): Promise<PositionData> {

        let userId = UserHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = url.POSITIONS_FOR_SCHEDULE;
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

    static async getAllPositions(): Promise<Position[]> {

        let userId = UserHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = url.ALL_POSITIONS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
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
