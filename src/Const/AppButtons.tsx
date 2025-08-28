import {AppButton} from "../Common/AppButton";

export const AppButtons = {
    Main: () => (
        <AppButton
            to={`/`}
            label="Главная"
        />
    ),
    About: () => (
        <AppButton
            to={`/about`}
            label="Помощь"
        />
    ),
    NewEntry: () => (
        <AppButton
            to={`/new-entry`}
            label="Записаться в волонтеры"
        />
    ),
    LocationsWithRecords: () => (
        <AppButton
            to={`/existing-entries`}
            label="Кто уже записан"
        />
    ),
    Locations: () => (
        <AppButton
            to={`/locations`}
            label="Локации"
        />
    ),
    Profile: () => (
        <AppButton
            to={`/profile`}
            label="Профиль"
        />
    ),
    NewEntryToSelectDate: (locationId: number, calendarId?: number) => (
        <AppButton
            to={`/new-entry/${locationId}/dates${calendarId ? `/${calendarId}` : ""}`}
            label="Записаться"
        />
    ),
    ToDateSelectWhenNoExistingDates: (locationId: number, name: string) => (
        <AppButton
            to={`/new-entry/${locationId}/dates`}
            label={name}
        />
    ),
    ToTeamFromExistingDate: (locationId: number, calendarId: number, btnText: string) => (
        <AppButton
            to={`/existing-entries/${locationId}/dates/${calendarId}/team`}
            label={btnText}
            // variant="secondary"
        />
    ),
    WhoScheduled: (locationId: number) => (
        <AppButton
            to={`/existing-entries/${locationId}/dates`}
            label="Кто уже записан"
            // variant="secondary"
        />
    ),
    ToPositionFromTeam: (locationId: number, calendarId: number) => (
        <AppButton
            to={`/new-entry/${locationId}/dates/${calendarId}/position`}
            label="Хочу в эту команду"
        />
    ),
    ToPositionFromDate: (locationId: number, calendarId: number, name: string) => (
        <AppButton
            to={`/new-entry/${locationId}/dates/${calendarId}/position`}
            label={name}
        />
    ),
    ToPosition: (locationId: number, name: string) => (
        <AppButton
            to={`/existing-entries/${locationId}/dates`}
            label={name}
            // variant="secondary"
        />
    ),
    ToNameInput: (locationId: number, calendarId: number, positionId: number, name: any) => (
        <AppButton
            to={`/existing-entries/${locationId}/dates/${calendarId}/position/${positionId}`}
            label={name}
        />
    )
    // Edit: (positionId: number) => (
    //     <AppButton
    //         to={`/positions/edit/${positionId}`}
    //         label="Редактировать"
    //         variant="warning"
    //     />
    // )
};
