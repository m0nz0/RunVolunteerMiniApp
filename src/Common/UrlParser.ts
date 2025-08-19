interface UrlParams {
    [key: string]: string | string[];
}

export function extractUrlParams(): UrlParams {
    const params: UrlParams = {};
    const urlSearchParams = new URLSearchParams(window.location.search);

    for (const [key, value] of urlSearchParams.entries()) {
        // console.log(key, value);
        if (params[key]) {
            // If key already exists, convert to array or add to existing array
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
