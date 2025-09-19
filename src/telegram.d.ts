export {};
declare global {
    interface Window {
        Telegram: {
            WebApp?: {
                // BackButton?: {
                //     show: () => void;
                //     hide: () => void;
                //     onClick: (cb: () => void) => void;
                //     offClick: (cb: () => void) => void;
                // },
                // ready: () => {};
                /**
                 * Расширяет WebApp на весь экран
                 */
                expand: () => void;

                /**
                 * Отключает вертикальные свайпы в миниаппе
                 */
                disableVerticalSwipes: () => void;

                /**
                 * Служебные поля Telegram.WebApp
                 */
                initData?: string;
                initDataUnsafe?: any;
                close?: () => void;
            };
        };
    }

    type TelegramUser = {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
        is_premium?: boolean;
        allows_write_to_pm?: boolean;
        photo_url?: string;
    }
}
