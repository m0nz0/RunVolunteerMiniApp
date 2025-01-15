export enum ApiRoute {
    NrmsAuth = '/api/v1/auth/login',
    VerstAuth = '/api/v1/account/login',
    SaveTeam = '/api/v1/webapp/save-nrms',
    Link = '/api/v1/webapp/link',
    AdditionalLink = '/api/v1/webapp/additional-link'
}

export const BaseRoute: { [key: string]: any } = {
    Dev: {
        UrlBase: 'https://nrms.dev.5verst.ru',
        UrlBot: 'https://150c-83-221-24-133.ngrok-free.app',
    },
    Prod: {
        UrlBase: 'https://nrms.5verst.ru',
        UrlBot: 'https://old-bot.dev.5verst.ru',
    }
}
