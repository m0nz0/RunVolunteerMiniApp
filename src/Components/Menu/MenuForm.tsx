import React, {FC, useState} from "react";
import '../Menu/styles.css'
import logo from '../../ico.png'
import {Button} from "react-bootstrap";
import {LocationList} from "../LocationList/LocationList";

interface Props {
    onSelect: (component: "about" | "locations") => void;
    // onBack: () => void;
}

export const MenuForm: FC<Props> = ({onSelect}) => {

    let listItemTextList = [
        'Записаться в волонтеры',
        "Мои Записи",
        "Кто уже записан",
        "Локации",
        "Помощь"
    ]

    const onMenuBtnClick = (i: number) => {
        console.log("clicked", i)
        if (i == 3) {
            onSelect("locations")
        } else if (i == 4) {
            onSelect("about")
        }
    };
    return (
        <div>
            <h1>Привет, чем я могу тебе помочь?</h1>
            <img className={'app-logo'} src={logo}/>
            <div className="d-grid gap-2 buttons-list">
                {listItemTextList.map((item, i) => {
                    return <Button variant="info"
                                   size="lg" key={i}
                                   onClick={() => {
                                       onMenuBtnClick(i)
                                   }
                                   }>{item}</Button>;
                })}

            </div>
        </div>
    )
}
