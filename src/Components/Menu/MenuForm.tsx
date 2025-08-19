import React, {FC, useState} from "react";
import '../Menu/styles.css'
import logo from '../../ico.png'
import {Button} from "react-bootstrap";
import {LocationList} from "../LocationList/LocationList";

declare global {
    interface Window {
        Telegram: any;
    }
}
type CurrentPage = 'menu' | 'location list'
export const MenuForm: FC = () => {
    const [currentPage, setCurrentPage] = useState<CurrentPage>('menu')
    let tg = window.Telegram.WebApp;
    tg.disableVerticalSwipes();
    tg.expand();

    let listItemTextList = [
        'Записаться в волонтеры',
        "Мои Записи",
        "Кто уже записан",
        "Локации",
        "Помощь"
    ]

    const onMenuBtnClick = (i: number) => {
        console.log("clicked", i)
        // if (i == 3) {
        //     setCurrentPage("location list")
        // } else {
        //     setCurrentPage("menu")
        // }
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
                {/*{currentPage == 'menu' && <MenuForm/>}*/}
                {/*{currentPage == 'location list' && <LocationList action={1}/>}*/}
            </div>
            {/*<div className={'buttons-list'}>*/}
            {/*    <ListGroup>*/}
            {/*        {listItemTextList.map((item, i) => {*/}
            {/*            return <ListGroup.Item key={i}>{item}</ListGroup.Item>*/}
            {/*        })}*/}
            {/*    </ListGroup></div>*/}
        </div>
    )
}
