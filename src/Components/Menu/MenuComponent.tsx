import React from "react";
import '../Menu/styles.css'
import logo from '../../ico.png'
import './styles.css'
import {TelegramHelper} from "../../Common/TelegramHelper";
import {AppButtons} from "../../Const/AppButtons";

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
            <img className={'app-logo'} src={logo}/>
            <div className="d-grid gap-2 buttons-list">
                {
                    listItemTextList.map((x, i) => x)
                }
            </div>
        </p>
    );
}

export default MenuComponent;
