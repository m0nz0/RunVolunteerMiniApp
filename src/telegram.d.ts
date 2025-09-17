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
}
