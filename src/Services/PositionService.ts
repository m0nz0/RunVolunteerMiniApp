import {UserHelper} from "../Common/UserHelper";
import {Position, PositionAdminData, PositionData} from "../types";
import {PositionType} from "../Const/PositionType";

const url = {
    ALL_POSITIONS: "get-all-positions",
    POSITIONS_FOR_SCHEDULE: "get-positions-for-schedule",
    POSITION_ADMIN: "position-admin",
    SAVE_POSITIONS: "save-positions"
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

    static async getPositionsForAdmin(locationId: number): Promise<PositionAdminData> {

        let userId = UserHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = url.POSITION_ADMIN;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}/`;
        console.log("position fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                tgId: userId,
                locationId: locationId
            }),
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

    static async savePositionsForAdmin(locationId: number, positions: Record<number, PositionType>): Promise<void> {

        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = url.SAVE_POSITIONS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/locations/${locationId}/${methodName}/`;
        console.log("position fetch url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(positions),
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
