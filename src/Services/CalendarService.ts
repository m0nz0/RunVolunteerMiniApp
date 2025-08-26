import {UserHelper} from "../Common/UserHelper";
import {CalendarInfo, CalendarData, ExistingDatesInfo} from "../types";


const controllerName: string = "MiniApp"
const methodNames = {
    DATES_FOR_SCHEDULE: "get-dates-for-schedule",
    EXISTING_DATES: "get-existing-dates"
}
const baseUrl: string | undefined = process.env.REACT_APP_BOT_URL;

export default class CalendarService {

    static async getDatesForSchedule(locationId: number): Promise<CalendarData> {

        let userId = UserHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.DATES_FOR_SCHEDULE}/${locationId}`;
        console.log("location dates for schedule url", fetchUrl)
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

    static async getExistingDates(locationId: number): Promise<ExistingDatesInfo> {

        let userId = UserHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.EXISTING_DATES}/${locationId}`;
        console.log("location dates url", fetchUrl)
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
