import {UserHelper} from "../Common/UserHelper";
import {TeamData} from "../types";


const controllerName: string = "MiniApp"
const methodNames = {
    GET_TEAMM_URL: "view-team",
}
const baseUrl: string | undefined = process.env.REACT_APP_BOT_URL;

export default class TeamService {

    static async getTeam(locationId: number, calendarId: number): Promise<TeamData> {

        let userId = UserHelper.getUser()?.id;
        let fetchUrl = `${baseUrl}/api/v1/${controllerName}/${methodNames.GET_TEAMM_URL}/${locationId}/calendar/${calendarId}`;
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

}
