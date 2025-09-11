import {TelegramHelper} from "@/Common/TelegramHelper";
import {CalendarData, ExistingDatesInfo} from "@/types";
import {apiFetch} from "@/Common/api";


const controllerName: string = "MiniApp"
const methodNames = {
    DATES_FOR_SCHEDULE: "get-dates-for-schedule",
    EXISTING_DATES: "get-existing-dates"
}
const baseUrl: string | undefined = import.meta.env.VITE_BOT_URL;

export default class CalendarService {

    static async getDatesForSchedule(locationId: number): Promise<CalendarData> {

        let userId = TelegramHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.DATES_FOR_SCHEDULE}/${locationId}`;
        // console.log("location dates for schedule url", fetchUrl)
        return await apiFetch<CalendarData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(userId),
        })
    }

    static async getExistingDates(locationId: number): Promise<ExistingDatesInfo> {

        let userId = TelegramHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.EXISTING_DATES}/${locationId}`;
        // console.log("location dates url", fetchUrl)

        return await apiFetch<ExistingDatesInfo>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(userId),
        })
    }
}
