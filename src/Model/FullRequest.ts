export type FullRequest = {
    action: number;
    body?: RequestBody;
}

export type RequestBody = {
    locationId?: number;
    positionId?: number;
    calendarId?: number;
}
