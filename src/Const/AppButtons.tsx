import {AppButton} from "../Common/AppButton";

export const AppButtons = {
    NewEntry: (locationId: number, calendarId?: number) => (
        <AppButton
            to={`/new-entry/${locationId}/dates${calendarId ? `/${calendarId}` : ""}`}
            label="Записаться"
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
            label="Кто уже записан1"
            // variant="secondary"
        />
    ),
    ToPosition: (locationId: number, name: string) => (<AppButton
        to={`/existing-entries/${locationId}/dates`}
        label="Кто уже записан1"
        // variant="secondary"
    />),
    ToNameInput: (locationId: number, calendarId: number, positionId: number, name: any) => (<AppButton
        to={`/existing-entries/${locationId}/dates/${calendarId}/position/${positionId}`}
        label={name}
        // variant="secondary"
    />)
    // Edit: (positionId: number) => (
    //     <AppButton
    //         to={`/positions/edit/${positionId}`}
    //         label="Редактировать"
    //         variant="warning"
    //     />
    // )
};
