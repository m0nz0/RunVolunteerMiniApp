import React from "react";
import '../Menu/styles.css'
import {Button} from "react-bootstrap";
import logo from '../../ico.png'
import './styles.css'
import {UserHelper} from "../../Common/UserHelper";
import LinkAdapter from "../../Common/LinkAdapter";

const listItemTextList = [
    "Записаться в волонтеры",
    // "Мои Записи",
    "Кто уже записан",
    "Локации",
    "Помощь"
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
                    listItemTextList.map((x, i) => {
                        switch (x) {
                            case "Записаться в волонтеры":
                                return <Button key={i} as={LinkAdapter as any}
                                               to={"/new-entry"}
                                               variant="info"
                                               size="lg">{x}</Button>;
                            case "Мои Записи":
                                return <Button key={i} as={LinkAdapter as any}
                                               to="/my-entries"
                                               variant="info"
                                               size="lg">{x}</Button>;
                            case "Кто уже записан":
                                return <Button key={i} as={LinkAdapter as any}
                                               to="/existing-entries"
                                               variant="info"
                                               size="lg">{x}</Button>;
                            case "Локации":
                                return <Button key={i} as={LinkAdapter as any}
                                               to="/locations"
                                               variant="info"
                                               size="lg">{x}</Button>;
                            case "Помощь":
                                return <Button key={i} as={LinkAdapter as any}
                                               to="/about"
                                               variant="info"
                                               size="lg">{x} </Button>;
                            default:
                                return <Button key={i} as={LinkAdapter as any}
                                               to="/"
                                               variant="info"
                                               size="lg">{x}</Button>;
                        }
                    })
                }</div>
        </div>
    );
}

export default MenuComponent;
