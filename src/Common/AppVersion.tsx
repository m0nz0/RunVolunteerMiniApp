import {FC} from "react";

export const AppVersion: FC = () => {
    return (
        <div className="text-xs text-gray-500">
            Версия: v{__APP_VERSION__}
        </div>
    );
}
