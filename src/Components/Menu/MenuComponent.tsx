import React from "react";
import '../Menu/styles.css'
import './styles.css'
import {AppButtons} from "@/Const/AppButtons";
import {getRandomImage} from "@/Common/icons";
import {getTelegramUser} from "@/Common/TelegramHelper";
import {v4 as uuid} from "uuid";

const listItemTextList = [
    AppButtons.NewEntry(),
    AppButtons.LocationsWithRecords(),
    AppButtons.MyEntries(),
    AppButtons.Locations(),
    AppButtons.Profile(),
    AppButtons.About(),
]


export const MenuComponent: React.FC = () => {

    const user = getTelegramUser();

    let userName = user?.username;
    return (
        <div className={"text-center"}>
            <h5>Привет, {userName && <span>{userName},</span>} чем я могу тебе помочь?</h5>
            <img className={'app-logo'} src={getRandomImage()}/>
            <div className="d-grid gap-2">
                {
                    listItemTextList.map(x => ({...x, key: uuid()}))
                }
            </div>
            {/*<pre>{JSON.stringify(window?.Telegram?.WebApp?.initDataUnsafe?.user, null, 2)}</pre>*/}
            {/*<pre>{JSON.stringify(getTelegramUser(), null, 2)}</pre>*/}
            {/*<pre>{JSON.stringify(user, null, 2)}</pre>*/}
        </div>
    );
}

export default MenuComponent;
