import {getTelegramUser} from "@/Common/TelegramHelper";
import {DirectorScheduleData, Team, TeamData} from "@/types";
import {apiFetch} from "@/Common/api";


const controllerName: string = "MiniApp"
const methodNames = {
    GET_TEAM_URL: "view-team",
    GET_MY_SCHEDULES: "my-schedules",
    UNDO: "undo-schedule",
    DIRECTOR_SCHEDULES: "director-schedule",
    CREATE_POLL: "create-poll",
}
const botUrl: string | undefined = import.meta.env.VITE_BOT_URL;

export default class TeamService {

    static async getTeam(locationId: number, calendarId: number): Promise<TeamData> {

        let userId = getTelegramUser().id;
        let fetchUrl = `${botUrl}/api/v1/${controllerName}/${methodNames.GET_TEAM_URL}/${locationId}/calendar/${calendarId}`;
        // console.log("get team for schedule url", fetchUrl)

        return await apiFetch<TeamData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(userId),
        })
    }

    static async getMySchedules(): Promise<Team[]> {

        let userId = getTelegramUser().id;
        let fetchUrl = `${botUrl}/api/v1/${controllerName}/${methodNames.GET_MY_SCHEDULES}`;
        // console.log("get my schedules url", fetchUrl)

        return await apiFetch<Team[]>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(userId),
        })
    }

    static async getDirectorSchedule(locationId: number): Promise<DirectorScheduleData> {

        let userId = getTelegramUser().id;
        let fetchUrl = `${botUrl}/api/v1/${controllerName}/${methodNames.DIRECTOR_SCHEDULES}`;
        // console.log("get directors schedule url", fetchUrl)

        return await apiFetch<DirectorScheduleData>(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                locationId: locationId,
                tgId: userId
            }),
        })
    }

    static async undoSchedule(scheduleId: number): Promise<Team> {

        let fetchUrl = `${botUrl}/api/v1/${controllerName}/${methodNames.UNDO}`;
        // console.log("undo schedule url", fetchUrl)

        return await apiFetch<Team>(fetchUrl, {
            method: "POST",
            body: JSON.stringify(scheduleId),
        })
    }

    static async startPoll(initiatorId?: number) {
        let userId = getTelegramUser().id;

        let fetchUrl = `${botUrl}/api/v1/${controllerName}/${methodNames.CREATE_POLL}`;
        // console.log("start poll url", fetchUrl)

        return await apiFetch<Team>(fetchUrl, {
            method: "POST",
            body: JSON.stringify({
                tg: userId,
                s: initiatorId
            }),
        })
    }
}
