import {LoginType} from "@/Const/LoginType";

export async function apiFetch<T>(
    url: string,
    options: RequestInit = {},
    resource?: LoginType
): Promise<T> {
    try {
        const token = localStorage.getItem(`${resource}_token`);

        const fixedPath=()=>{
            const basename="/test"
            let path = window.location.pathname + window.location.search;
            if (path.startsWith(basename)) {
                path = path.slice(basename.length);
            }
            return path;
        }

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

            // toast.error("Сессия истекла, войдите снова");

            localStorage.setItem(
                "redirectAfterLogin",
                JSON.stringify({
                    resource,
                    path: fixedPath(),
                }))

            window.location.href = `/test/login-nrms?loginType=${resource}`;
            // throw new Error("Unauthorized");
            return Promise.reject(new Error("Unauthorized"));
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
