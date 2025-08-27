import React from "react";
import '../Menu/styles.css'
import logo from '../../ico.png'
import './styles.css'
import {UserHelper} from "../../Common/UserHelper";
import {AppButtons} from "../../Const/AppButtons";

const listItemTextList = [
    AppButtons.NewEntry(),
    AppButtons.LocationsWithRecords(),
    AppButtons.Locations(),
    AppButtons.About()
]

interface Props {
    tgUser: any
    // onSelect: (component: "about" | "locations") => void;
    // onBack: () => void;
}

export const MenuComponent: React.FC = () => {

    let user = UserHelper.getUser();
    let userName = user?.username;
    return (
        <div>
            <h1 className={"text-center"} text->Привет,{userName && <span>{userName},</span>} чем я могу тебе
                помочь?</h1>
            <img className={'app-logo'} src={logo}/>
            <div className="d-grid gap-2 buttons-list">
                {
                    listItemTextList.map((x, i) => x)
                }</div>
        </div>
    );
}

export default MenuComponent;
