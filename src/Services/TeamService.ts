import {TelegramHelper} from "../Common/TelegramHelper";
import {Team, TeamData} from "../types";


const controllerName: string = "MiniApp"
const methodNames = {
    GET_TEAM_URL: "view-team",
    GET_MY_SCHEDULES: "my-schedules",
    UNDO: "undo-schedule",
}
const baseUrl: string | undefined = process.env.REACT_APP_BOT_URL;

export default class TeamService {

    static async getTeam(locationId: number, calendarId: number): Promise<TeamData> {

        let userId = TelegramHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.GET_TEAM_URL}/${locationId}/calendar/${calendarId}`;
        console.log("view team for schedule url", fetchUrl)
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

    static async getMySchedules(): Promise<Team[]> {

        let userId = TelegramHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.GET_MY_SCHEDULES}`;
        console.log("view team for schedule url", fetchUrl)
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

    static async undoSchedule(scheduleId: number): Promise<void> {

        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.GET_MY_SCHEDULES}`;
        console.log("view team for schedule url", fetchUrl)
        const response = await fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(scheduleId),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных");
        }
    }

}
