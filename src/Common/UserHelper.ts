export class UserHelper {
    static getUser():any {
        let user = window?.Telegram?.WebApp?.initDataUnsafe?.user;
        let userId = user?.id;
        let userName = user?.username;

        return user;
    }
}
