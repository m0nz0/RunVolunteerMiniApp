import {AppButton} from "@/Common/AppButton";

export const AppButtons = {
    Main: () => (
        <AppButton
            to={`/`}
            label="Главная"
        />
    ),
    About: (variant: string = "info") => (
        <AppButton
            to={`/about`}
            label="Помощь"
            variant={variant}
        />
    ),
    NewEntry: (variant: string = "info") => (
        <AppButton
            to={`/new-entry`}
            label="Записаться в волонтеры"
            variant={variant}
        />
    ),
    LocationsWithRecords: (variant: string = "info") => (
        <AppButton
            to={`/existing-entries`}
            label="Кто уже записан"
            variant={variant}
        />
    ),
    MyEntries: (variant: string = "info") => (
        <AppButton
            to={`/my-entries`}
            label="Мои записи"
            variant={variant}
        />
    ),
    Locations: (variant: string = "info") => (
        <AppButton
            to={`/locations`}
            label="Локации"
            variant={variant}
        />
    ),
    Profile: (variant: string = "info") => (
        <AppButton
            to={`/profile`}
            label="Профиль"
            variant={variant}
        />
    ),
    LinkMain: () => (
        <AppButton
            to={`/login-main`}
            label="Привязать основной аккаунт"
        />
    ),
    LinkAdditional: () => (
        <AppButton
            to={`/login-additional`}
            label="Привязать дополнительный аккаунт"
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
    ToDirectorsSchedule: (locationId: number, name: string, variant: string = "info") => (
        <AppButton
            to={`/existing-entries/${locationId}/dates/directors`}
            label={name}
            variant={variant}
        />
    ),
    ToLocationCard: (locationId: number) => (
        <AppButton
            to={`/location/${locationId}`}
            label=""
        />
    ),
    ToTeamFromExistingDate: (locationId: number, calendarId: number, btnText: string, variant: string = "info") => (
        <AppButton
            to={`/existing-entries/${locationId}/dates/${calendarId}/team`}
            label={btnText}
            variant={variant}
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
    ToPositionFromDate: (locationId: number, calendarId: number, name: string, variant: string = "info") => (
        <AppButton
            to={`/new-entry/${locationId}/dates/${calendarId}/position`}
            label={name}
            variant={variant}
        />
    ),
    ToPosition: (locationId: number, name: string) => (
        <AppButton
            to={`/existing-entries/${locationId}/dates`}
            label={name}
            // variant="secondary"
        />
    ),
    ToNameInput: (locationId: number, calendarId: number, positionId: number, name: any, variant: string = "info", disabled: boolean = false) => (
        <AppButton
            to={`/new-entry/${locationId}/dates/${calendarId}/position/${positionId}`}
            label={name}
            variant={variant}
            disabled = {disabled}
        />
    ),
    ToDirectors: (locationId: number, name: string) => (
        <AppButton
            to={`/new-entry/${locationId}/directors`}
            label={name}
        />
    ),
    // Edit: (positionId: number) => (
    //     <AppButton
    //         to={`/positions/edit/${positionId}`}
    //         label="Редактировать"
    //         variant="warning"
    //     />
    // )
    AuthNrms: (locationId: number, calendarId: number) => (
        <AppButton
            to={`/existing-entries/${locationId}/dates/${calendarId}/team/preview-roster`}
            label={"Сохранить в NRMS"}
            variant={"secondary"}
        />
    ),
    SmileReport: (locationId: number) => (
        <AppButton
            to={`/existing-entries/${locationId}/report`}
            label={"Отчёт"}
            variant={"secondary"}
        />
    )
};
