export enum LoginType {
    MainAccount = "MainAccount",
    AdditionalAccount = "AdditionalAccount",
    Nrms = "Nrms",
}

export const LoginTypeDict:
    { [key in LoginType]: { loginText: string, headerColor: string } } = {
    [LoginType.MainAccount]: {loginText: 'Логин (ваш 5 вёрст ID)', headerColor: '#6e84be'},
    [LoginType.AdditionalAccount]: {loginText: 'Логин (дополнительный 5 вёрст ID)', headerColor: '#6e84be'},
    [LoginType.Nrms]: {loginText: 'Логин (ваш 5 вёрст ID)', headerColor: '#741414'}
};
