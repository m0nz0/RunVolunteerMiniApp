export const TgUserDict = {
    ME: 182817160,
    OTHER: 521243480
}

export class UserHelper {
    static getUser(): any {
        let user = window?.Telegram?.WebApp?.initDataUnsafe?.user;
        let userId = user?.id;
        let userName = user?.username;

        return user ?? {id: TgUserDict.ME, userName: "TEST USER NAME"};
    }
}
