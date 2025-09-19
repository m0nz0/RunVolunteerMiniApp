export const TgUserDict = {
    ME: 182817160,
}

export function getTelegramUser(): TelegramUser {
    let allowMock = import.meta.env.VITE_ALLOW_MOCK;
    if (allowMock === undefined || allowMock == 'false') {
        if (typeof window !== "undefined" && window.Telegram?.WebApp?.initDataUnsafe?.user) {
            return window.Telegram.WebApp.initDataUnsafe?.user as TelegramUser;
        }
        throw new Error("Не удалось определить данные пользователя телеграм")
    }
    return {id: TgUserDict.ME, username: "TEST_USER_NAME"} as TelegramUser;
}
