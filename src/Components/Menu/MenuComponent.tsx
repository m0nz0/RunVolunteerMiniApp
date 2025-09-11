import React from "react";
import '../Menu/styles.css'
import './styles.css'
import {TelegramHelper} from "@/Common/TelegramHelper";
import {AppButtons} from "@/Const/AppButtons";
import {getRandomImage} from "@/Common/icons";

const listItemTextList = [
    AppButtons.NewEntry(),
    AppButtons.LocationsWithRecords(),
    AppButtons.MyEntries(),
    AppButtons.Locations(),
    AppButtons.About(),
    AppButtons.Profile()
]


export const MenuComponent: React.FC = () => {

    let user = TelegramHelper.getUser();
    let userName = user?.username;
    return (
        <p className={"text-center"}>
            <h5>Привет,{userName && <span>{userName},</span>} чем я могу тебе помочь?
            </h5>
            <img className={'app-logo'} src={getRandomImage()}/>
            <div className="d-grid gap-2 buttons-list">
                {
                    listItemTextList.map(x => x)
                }
            </div>
        </p>
    );
}

export default MenuComponent;
