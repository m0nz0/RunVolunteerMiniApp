import {LocationFlag} from "./LocationFlag";

export enum LocationViewType {
    AllLocations = 'AllLocations',
    WithSchedules = 'WithSchedules',
    ForSchedule = 'ForSchedule',
}

export const LocationViewParams: {
    [key in LocationViewType]: {
        header: string,
        defaultActiveFilters: LocationFlag[],
        hiddenFilters: LocationFlag[]
    }
} = {
    [LocationViewType.AllLocations]: {
        header: "Это список всех локаций. Воспользуйтесь фильтрами и поиском, чтобы найти нужную.",
        defaultActiveFilters: [LocationFlag.Favorite, LocationFlag.IsBotActive],
        hiddenFilters: []
    },
    [LocationViewType.ForSchedule]: {
        header: "Выбери локацию для записи.",
        defaultActiveFilters: [LocationFlag.Favorite, LocationFlag.IsBotActive],
        hiddenFilters: [LocationFlag.IsBotActive, LocationFlag.IsPrepare, LocationFlag.IsCancel]

    },
    [LocationViewType.WithSchedules]: {
        header: "Это список локаций, где есть записи в волонтёры. Воспользуйтесь фильтрами и поиском, чтобы найти нужную.",
        defaultActiveFilters: [LocationFlag.Favorite],
        hiddenFilters: [LocationFlag.IsCancel, LocationFlag.IsPrepare, LocationFlag.IsBotActive]
    },
}
