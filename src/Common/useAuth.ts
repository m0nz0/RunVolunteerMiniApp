import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import VerstService from "@/Services/VerstService";

export function useAuth() {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("token")
    );

    // синхронизация state <-> localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    // логин
    const loginNrms = useCallback(async (login: string, password: string) => {
        try {
            const newToken = (await VerstService.getNrmsToken(login, password))?.result?.token;

            if (!newToken) {
                toast.error("Не удалось получить токен");
                return null;
            }

            setToken(newToken);
            return newToken;
        } catch (err) {
            toast.error((err as Error).message);
            return null;
        }
    }, []);

    // логаут
    const logout = useCallback(() => {
        setToken(null);
    }, []);

    return { token, loginNrms, logout };
}
