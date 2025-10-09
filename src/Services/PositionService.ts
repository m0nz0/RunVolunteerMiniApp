import {getTelegramUser} from "@/Common/TelegramHelper";
import {Position, PositionAdminData, PositionData} from "@/types";
import {PositionType} from "@/Const/PositionType";
import {apiFetch} from "@/Common/api";

const url = {
    ALL_POSITIONS: "get-all-positions",
    POSITIONS_FOR_SCHEDULE: "get-positions-for-schedule",
    POSITION_ADMIN: "position-admin",
    SAVE_POSITION_TYPES: "save-position-types",
    SAVE_POSITION_LIMITS: "save-position-limits",
    SAVE_POSITION_ORDERS: "save-position-orders"
}

export default class PositionService {
    static async getPositionsForSchedule(locationId: number, calendarId: number): Promise<PositionData> {

        let userId = getTelegramUser().id;
        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = url.POSITIONS_FOR_SCHEDULE;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}/${locationId}/calendar/${calendarId}`;
        // console.log("position for schedule fetch url", fetchUrl)

        return await apiFetch<PositionData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(userId),
        })
    }

    static async getPositionsForAdmin(locationId: number): Promise<PositionAdminData> {

        let userId = getTelegramUser().id;
        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = url.POSITION_ADMIN;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}/`;
        // console.log("position admin fetch url", fetchUrl)

        return await apiFetch<PositionAdminData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                tgId: userId,
                locationId: locationId
            }),
        })
    }

    static async savePositionsForAdmin(locationId: number, positions: Record<number, PositionType>): Promise<void> {

        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = url.SAVE_POSITION_TYPES;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/locations/${locationId}/${methodName}/`;
        // console.log("save position admin fetch url", fetchUrl)

        await apiFetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(positions),
        })
    }

    static async getAllPositions(): Promise<Position[]> {

        console.log("user", getTelegramUser())
        let userId = getTelegramUser().id;
        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = url.ALL_POSITIONS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;
        // console.log("all position fetch url", fetchUrl)

        return await apiFetch<Position[]>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(userId),
        })
    }

    static async savePositionsForLimitsAdmin(locationId: number, selected: Record<number, number>) {
        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = url.SAVE_POSITION_LIMITS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/locations/${locationId}/${methodName}/`;
        // console.log("save position limits fetch url", fetchUrl)

        await apiFetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(selected),
        })
    }

    static async updateOrder(locationId: number, orderedIds: number[]) {
        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = url.SAVE_POSITION_ORDERS;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/locations/${locationId}/${methodName}/`;
        // console.log("save position orders fetch url", fetchUrl)

        await apiFetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(orderedIds),
        })
    }
}
