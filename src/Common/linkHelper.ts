const openExternal = (url: string) => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
        tg.openLink(url);
    } else {
        window.open(url, "_blank");
    }
};
