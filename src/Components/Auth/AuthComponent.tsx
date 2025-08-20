import React, {ChangeEvent, FC, useState} from "react";
import './styles.css'
import {Button, Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {AllParams} from "../../types";
import {HeaderColor} from "../../Const/HeaderColor";
import {LoginText} from "../../Const/LoginText";
import {Target} from "../../Const/Target";
import {Version} from "../../Const/Version";
import {Action} from "../../Const/Action";
import {Source} from "../../Const/Source";

type Props = {
    data: AllParams | any
}

declare global {
    interface Window {
        Telegram: any;
    }
}

export const AuthComponent: FC<Props> = (props) => {

    let tg = window.Telegram.WebApp;
    tg.disableVerticalSwipes();
    tg.expand();
    const [isPassVisible, setPassVisible] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const eyeClick = () => {
        setPassVisible(!isPassVisible)
    }

    const singClick = async () => {

        if (!login) {
            tg.showAlert('Введите логин')
        }
        if (!password) {
            tg.showAlert('Введите пароль')
        }

        if ((props.data.action === Action.Auth || props.data.action === Action.AdditionalLink) && props.data.source === Source.Inline && props.data.target === Target.Verst) {
            let url = (props.data.action === Action.Auth ?
                process.env.REACT_APP_VERST_AUTH_URL :
                process.env.REACT_APP_ADDITIONAL_LINK_URL) as string;
            authVerstAndCallLinkController(login, password, url, props.data.version);
        } else if (props.data.action === Action.CheckRoster) {
            if (props.data.calendarId && props.data.locationId) {
                authNrmsAndCallNrmsController(login, password, props.data.calendarId, props.data.locationId, props.data.version)
            } else {
                tg.showAlert("Не удалось определить дату или локацию")
            }
        } else {
            tg.showAlert("Действие не поддерживается")
        }
    }
    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value.match(/^\d{0,9}$/)) {
            setLogin(e.target.value);
        }
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const getLoginText = () => {
        let version = props.data.version;
        let target = props.data.target;
        let action = props.data.action;
        let versionText = LoginText[version as keyof typeof Version]
        let targetText = versionText[target as keyof typeof Target]
        return targetText[action];
    }

    // получение токена и сохранение команды
    const authNrmsAndCallNrmsController = (login: string, pass: string, calendarId: number, locationId: number, version: Version) => {
        let body = {username: 'A' + login, password: pass}

        console.log('Save team. Nrms auth start ')

        let baseUrl = process.env.REACT_APP_BASE_URL;
        fetch(`${baseUrl}${process.env.NRMS_AUTH_URL}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(resLogin => {

                if (!resLogin.errorMessage) {
                    console.log('Save team. Nrms auth success')

                    let token = resLogin.result.token;
                    let saveNrmsRequest = {
                        c: calendarId,
                        pv: locationId,
                        to: token,
                        tg: tg.initDataUnsafe.user.id
                    }

                    let headers = {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*'
                    };

                    console.log('Save team. Save team start')
                    let botUrl = process.env.REACT_APP_BOT_URL;
                    fetch(`${botUrl}${process.env.REACT_APP_SAVE_TEAM_URL}`, {
                        method: 'POST',
                        body: JSON.stringify(saveNrmsRequest),
                        headers: headers,
                    })
                        .then(res => {
                            console.log('Save team. Save team continue')
                            tg.close()
                        })
                        .catch((err) => {
                            tg.showAlert(err.message);

                        })
                } else {
                    if (resLogin.errorCode === -1) {
                        tg.showAlert("Ошибка авторизации");
                    }
                    tg.showAlert(resLogin.errorMessage);
                }
            })
    }

    // авторизация verst и запрос на линковку
    const authVerstAndCallLinkController = (login: string, pass: string, url: string, version: Version) => {
        let body = {username: 'A' + login, password: pass}

        console.log('Verst link. Verst auth start')
        let verstAuthUrl = process.env.REACT_APP_VERST_AUTH_URL;
        console.log(verstAuthUrl)
        let baseUrl = process.env.REACT_APP_BASE_URL;
        console.log(baseUrl)
        fetch(`${baseUrl}${verstAuthUrl}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(resLogin => {

                if (!resLogin.errorMessage) {

                    console.log('Verst link. Verst auth success')

                    let headers = {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*'
                    };

                    console.log('Verst link. Link start')

                    let botUrl = process.env.REACT_APP_BOT_URL;
                    fetch(`${botUrl}${url}`, {
                        method: 'POST',
                        body: JSON.stringify({tg: tg.initDataUnsafe.user.id, vid: login}),
                        headers: headers,
                    })
                        .then(res => {

                            console.log('Verst link. Link continue')

                            tg.close()
                        })
                        .catch((err) => {
                            tg.showAlert(err.message);

                        })
                } else {
                    tg.showAlert(resLogin.errorMessage);
                }
            })
    }

    // авторизация Verst и отправка данных обратно в бота
    const authVerstAndSendDataBackToBot = (login: string, pass: string, version: Version) => {
        let body = {username: 'A' + login, password: pass}

        console.log('Verst link button. Verst auth start')

        let baseUrl = process.env.REACT_APP_BASE_URL;
        fetch(`${baseUrl}${process.env.REACT_APP_VERST_AUTH_URL}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(resLogin => {

                console.log('Verst link button. Verst auth success')

                if (!resLogin.errorMessage) {
                    console.log('Verst link button. Verst send data back to bot')
                    tg.sendData(JSON.stringify({token: resLogin.result.token}))
                    tg.close()
                } else {
                    tg.showAlert(resLogin.errorMessage);
                }
            })
    }


    return (
        <div className="SignInScreen_wrapper">
            <main>
                <div className="SignInScreen_logo" id="header"
                     style={{backgroundColor: HeaderColor[props.data.target as keyof typeof HeaderColor]}}>
                    <img src="https://nrms.5verst.ru/img/Logo_B.png" alt="logo"/>
                </div>
                <section>
                    <Form className="form-group">
                        <Form.Label htmlFor="login">
                            <span id="login_text">{getLoginText()}</span>:
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="id-a">A</InputGroup.Text>
                            <Form.Control
                                placeholder="123456789"
                                aria-label="login"
                                type="number"
                                id="login"
                                aria-describedby="id-a"
                                value={props.data.verstId}
                                className="no-left-border"
                                onChange={handleLoginChange}
                            />
                        </InputGroup>
                    </Form>
                    <Form>
                        <Form.Label htmlFor="password">Пароль:</Form.Label>
                        <InputGroup className="input-group">
                            <Form.Control className="form-control no-right-border"
                                          type={isPassVisible ? "text" : "password"}
                                          name="password"
                                          id="password"
                                          aria-describedby="id-eye"
                                          aria-label="password"
                                          onChange={handlePasswordChange}/>
                            <InputGroup.Text id="id-eye"
                                             onClick={eyeClick}>
                                <FontAwesomeIcon icon={isPassVisible ? faEye : faEyeSlash}/>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form>
                    <Button type="button"
                            className="sign-btn btn btn-danger"
                            id="btn"
                            onClick={singClick}>Вход
                    </Button>
                </section>
                <div className="link-section">
                    <a href="https://nrms.5verst.ru/#/remindpassword">Забыли пароль?</a>
                    <a href="https://5verst.ru/reminder/">Забыли ID?</a>
                </div>
            </main>
        </div>
    )
}
