import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import VerstService from "@/Services/VerstService";
import {LoginType} from "@/Const/LoginType";
import {useNavigate} from "react-router-dom";

export function useAuth(resource: LoginType) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem(`${resource}_token`)
    );

    const navigate = useNavigate();

    // синхронизация state <-> localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem(`${resource}_token`, token);
        } else {
        }
    }, [token, resource]);

    // логин
    const loginNrms = useCallback(
        async (login: string, password: string) => {
            if (resource == LoginType.Nrms) {
                try {
                    const newToken = (await VerstService.getNrmsToken(login, password))?.result?.token;

                    if (!newToken) {
                        toast.error("Не удалось получить токен");
                        return null;
                    }

                    setToken(newToken);
                    const redirectRaw = localStorage.getItem("redirectAfterLogin");
                    if (redirectRaw) {
                        const {resource: savedRes, path} = JSON.parse(redirectRaw);
                        console.log("redirectRaw: ", redirectRaw)
                        localStorage.removeItem("redirectAfterLogin");

                        if (savedRes === resource) {
                            navigate(path, {replace: true});
                        } else {
                            navigate("/", {replace: true});
                        }
                    } else {
                        navigate("/", {replace: true});
                    }

                    return newToken;
                } catch (err) {
                    toast.error((err as Error).message);
                    return null;
                }
            }
        }, []);

    // логаут
    const logout = useCallback(() => {
        setToken(null);
    }, []);

    return {token, loginNrms, logout};
}
