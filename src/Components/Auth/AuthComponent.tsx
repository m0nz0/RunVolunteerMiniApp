import React, {ChangeEvent, FC, useState} from "react";
import './styles.css'
import {Button, Form, InputGroup} from "react-bootstrap";
import {Icons} from "@/Const/Icons";
import {LoginType, LoginTypeDict} from "@/Const/LoginType";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/Common/hooks/useAuth";
import {getTelegramUser} from "@/Common/TelegramHelper";
import {SmartLink} from "@/Common/SmartLink";

type Props = {
    loginType: LoginType,
    verstId: number
}

export const AuthComponent: FC<Props> = (props) => {

    const [isPassVisible, setPassVisible] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {loginNrms} = useAuth(props.loginType);
    const navigate = useNavigate();

    const eyeClick = () => {
        setPassVisible(!isPassVisible)
    }

    const singClick = async (e: React.FormEvent) => {

        e.preventDefault()

        if (props.loginType === LoginType.MainAccount ||
            props.loginType === LoginType.AdditionalAccount) {
            await authVerstAndCallLinkController(login, password)
                .then(() => {
                    navigate("/profile");
                })
        } else if (props.loginType === LoginType.Nrms) {
            await loginNrms(login, password);
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

    const getPageParams = () => {
        return LoginTypeDict[props.loginType]
    }

    // авторизация verst и запрос на линковку
    const authVerstAndCallLinkController = async (login: string, pass: string) => {
        let body = {username: 'A' + login, password: pass}

        console.log('Verst link. Verst auth start')
        let verstAuthUrl = import.meta.env.VITE_VERST_AUTH_URL;
        let baseUrl = import.meta.env.VITE_BASE_URL;
        let authLinkUrl = `${baseUrl}${verstAuthUrl}`
        // console.log("authLinkUrl: ", authLinkUrl)

        await fetch(authLinkUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(async resLogin => {

                if (!resLogin.errorMessage) {

                    console.log('Verst link. Verst auth success')

                    let headers = {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*'
                    };

                    console.log('Verst link. Link start')

                    let botUrl = import.meta.env.VITE_BOT_URL;
                    await fetch(`${botUrl}${props.loginType === LoginType.AdditionalAccount ?
                        import.meta.env.VITE_ADDITIONAL_LINK_URL :
                        import.meta.env.VITE_MAIN_LINK_URL}`, {
                        method: 'POST',
                        body: JSON.stringify({tg: getTelegramUser()?.id, vid: login}),
                        headers: headers,
                    })
                        .catch((err) => {
                            throw new Error(err.message);

                        })
                } else {
                    throw new Error(resLogin.errorMessage);
                }
            })
    }
    return (
        <div className="SignInScreen_wrapper"
             onSubmit={singClick}>
            <main>
                <div className="SignInScreen_logo" id="header"
                     style={{backgroundColor: getPageParams().headerColor}}>
                    <img src="https://nrms.5verst.ru/img/Logo_B.png" alt="logo"/>
                </div>
                <section>
                    <Form className="form-group">
                        <Form.Label htmlFor="login">
                            <span id="login_text">{getPageParams().loginText}</span>:
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="id-a">A</InputGroup.Text>
                            <Form.Control
                                placeholder="123456789"
                                aria-label="login"
                                type="number"
                                id="login"
                                aria-describedby="id-a"
                                value={props.verstId}
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
                                {isPassVisible ? Icons.EyeOpen : Icons.EyeClose}
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
                    <SmartLink to="https://nrms.5verst.ru/#/remindpassword">Забыли пароль?</SmartLink>
                    <SmartLink to="https://5verst.ru/reminder/">Забыли ID?</SmartLink>
                </div>
            </main>
        </div>
    )
}
