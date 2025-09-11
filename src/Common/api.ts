import {toast} from "react-toastify";

export async function apiFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    try {
        const token = localStorage.getItem("token");

        const headers: HeadersInit = {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(options.headers || {}),
            ...(token ? {Authorization: token} : {}),
        };

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            localStorage.removeItem("token");
            toast.error("Сессия истекла, войдите снова");
            // window.location.href = "/login";
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            const text = await response.text();
            const message = text || response.statusText;
            // toast.error(message);
            throw new Error(message);
        }

        return (await response.json()) as T;
    } catch (err: any) {
        // toast.error(err.message || "Неизвестная ошибка");
        throw err;
    }
}
