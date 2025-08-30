export class UserHelper {
    static getUser(): any {
        let user = window?.Telegram?.WebApp?.initDataUnsafe?.user;
        let userId = user?.id;
        let userName = user?.username;

        return user ?? {id: 182817160, userName:"MY TEST USER NAME"};
    }
}
