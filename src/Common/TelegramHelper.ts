export const TgUserDict = {
    ME: 182817160,
    OTHER: 521243480
}

export class TelegramHelper {
    static getUser(): any {
        let user = this.getTg()?.initDataUnsafe?.user;
        let userId = user?.id;
        let userName = user?.username;

        return user ?? {id: TgUserDict.ME, userName: "TEST USER NAME"};
    }

    static getTg(): any {
        let tg = window?.Telegram?.WebApp
        return tg;
    }
}
