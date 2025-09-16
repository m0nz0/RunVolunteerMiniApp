import {TelegramHelper} from "@/Common/TelegramHelper";
import {RosterCompareData} from "@/types";
import {apiFetch} from "@/Common/api";

const methodNames = {
    COMPARE_ROSTER: "check-roster",
}
export default class RosterService {

    static async getComparedRoster(token: string | null, locationId: number, calendarId: number): Promise<RosterCompareData> {

        let baseUrl = import.meta.env.VITE_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = methodNames.COMPARE_ROSTER;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}`;

        let body = {
            c: calendarId,
            pv: locationId,
            to: token,
            tg: TelegramHelper.getUser().id
        }

        return await apiFetch(fetchUrl, {
            method: 'POST',
            body: JSON.stringify(body)
        })
    }
}
