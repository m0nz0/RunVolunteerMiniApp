import React, {ChangeEvent, FC, useState} from "react";
import '../Menu/styles.css'
import logo from '../../ico.png'
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";

declare global {
    interface Window {
        Telegram: any;
    }
}

export const MenuForm: FC = () => {

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

    return (
        <div>
            <h1>Привет, чем я могу тебе помочь?</h1>
            <img className={'app-logo'} src={logo}/>
            <div className="d-grid gap-2 buttons-list">
                {listItemTextList.map((item, i) => {
                    return <Button variant="info"
                                   size="lg" key={i}
                                   onClick={() => {
                                   }
                                   }>{item}</Button>;
                })}
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
