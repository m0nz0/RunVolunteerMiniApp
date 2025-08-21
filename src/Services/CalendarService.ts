import {UserHelper} from "../Common/UserHelper";

export type Calendar = {
    id: number;
    date: Date;
    datetime: Date
    eventStatus: string,
    isAdditional: boolean,
}

export default class CalendarService {
    static async getDatesForSchedule(locationId: number): Promise<Calendar[]> {

        let userId = UserHelper.getUser()?.id;
        let baseUrl = process.env.REACT_APP_BOT_URL;
        let controllerName = "MiniApp";
        let methodName = "get-dates-for-schedule";
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodName}/${locationId}`;
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
