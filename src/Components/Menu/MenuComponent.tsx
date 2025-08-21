import React from "react";
import '../Menu/styles.css'
import {Button} from "react-bootstrap";
import {Link, LinkProps} from "react-router-dom";
import logo from '../../ico.png'
import './styles.css'
import {UserHelper} from "../../Common/UserHelper";

const listItemTextList = [
    "Записаться в волонтеры",
    "Мои Записи",
    "Кто уже записан",
    "Локации",
    "Помощь"
]

interface Props {
    tgUser: any
    // onSelect: (component: "about" | "locations") => void;
    // onBack: () => void;
}

// адаптер для Link (чтобы работало в react-bootstrap + TS)
const LinkAdapter = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link ref={ref} {...props} />
));
LinkAdapter.displayName = "LinkAdapter";

export const MenuComponent: React.FC = () => {

    let user = UserHelper.getUser();
    let userName = user?.username;
    return (
        <div>
            {userName && <strong>Hi, {userName}</strong>}
            <h1 className={"text-center"} text->Привет, чем я могу тебе помочь?</h1>
            <img className={'app-logo'} src={logo}/>
            <div className="d-grid gap-2 buttons-list">
                {
                    listItemTextList.map((x, i) => {
                        switch (x) {
                            case "Записаться в волонтеры":
                                return <Button as={LinkAdapter as any} to={"/new-entry"} variant="info"
                                               size="lg">{x}</Button>;
                            case "Мои Записи":
                                return <Button as={LinkAdapter as any} to="/my-entries" variant="info"
                                               size="lg">{x}</Button>;
                            case "Кто уже записан":
                                return <Button as={LinkAdapter as any} to="/existing-entries" variant="info"
                                               size="lg">{x}</Button>;
                            case "Локации":
                                return <Button as={LinkAdapter as any} to="/locations" variant="info"
                                               size="lg">{x}</Button>;
                            case "Помощь":
                                return <Button as={LinkAdapter as any} to="/about" variant="info"
                                               size="lg">{x} </Button>;
                            default:
                                return <Button as={LinkAdapter as any} to="/" variant="info" size="lg">{x}</Button>;
                        }
                    })
                }</div>
        </div>
    );
}

export default MenuComponent;
