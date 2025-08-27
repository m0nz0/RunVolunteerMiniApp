interface UrlParams {
    [key: string]: string | string[];
}

export function extractUrlParams(): UrlParams {
    const params: UrlParams = {};
    const urlSearchParams = new URLSearchParams(window.location.search);

    for (const [key, value] of urlSearchParams.entries()) {
        if (params[key]) {

            if (Array.isArray(params[key])) {
                (params[key] as string[]).push(value);
            } else {
                params[key] = [params[key] as string, value];
            }
        } else {
            params[key] = value;
        }
    }
    return params;
}
