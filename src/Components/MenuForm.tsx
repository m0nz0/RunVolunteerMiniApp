import React, {ChangeEvent, FC, useState} from "react";
import './styles.css'
import {Button, Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {AllParams} from "../types";
import {HeaderColor} from "../Const/HeaderColor";
import {LoginText} from "../Const/LoginText";
import {Target} from "../Const/Target";
import {Version} from "../Const/Version";
import {Action} from "../Const/Action";
import {Source} from "../Const/Source";
import {ApiRoute, BaseRoute} from "../Const/Route";

declare global {
    interface Window {
        Telegram: any;
    }
}

export const MenuForm: FC = () => {

    let tg = window.Telegram.WebApp;
    tg.disableVerticalSwipes();
    tg.expand();

    return (
        <div>
            This is menu form
        </div>
    )
}
