import {FC, useEffect, useState} from "react";
import CalendarService from "../../Services/CalendarService";
import {useParams} from "react-router-dom";
import {CalendarData} from "../../types";
import {Button, Spinner} from "react-bootstrap";
import LinkAdapter from "../../Common/LinkAdapter";
import {DateService} from "../../Common/dateService";
import {LocationViewType} from "../../Const/LocationViewType";

interface Props {
    locationViewType: LocationViewType
}

export const DatesComponent: FC<Props> = (props) => {

    const [datesData, setDatesData] = useState<CalendarData>()
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId} = useParams<{ locationId: string }>();

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                if (props.locationViewType === LocationViewType.ForSchedule) {
                    let data = await CalendarService.getDatesForSchedule(Number(locationId))
                    setDatesData(data)
                } else if (props.locationViewType === LocationViewType.WithSchedules) {
                    let data = await CalendarService.getExistingDates(Number(locationId));
                    setDatesData({dates: data.dates, location: data.location, locations: [], schedules: []})
                }
            } catch (err) {
                if (isMounted) setError((err as Error).message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();
        return () => {
            isMounted = false;
        };
    }, [locationId, props.locationViewType]);

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    if (props.locationViewType === LocationViewType.WithSchedules && datesData?.dates.length === 0) {
        return <div className={"text-center"}>
            <h5>Еще никто не записался в волонтеры локации {datesData?.location.name}</h5>
            <Button as={LinkAdapter as any}
                    to={`/new-entry/${locationId}/dates`}
                    variant="info"
                    size="lg">Хотите стать первым?</Button>
        </div>
    } else {
        return <div>
            <h5 className={"text-center"}>{props.locationViewType === LocationViewType.ForSchedule ?
                "Выбор желаемой даты для записи" :
                "Даты с записями"
            } для локации {datesData?.location.name}</h5>
            <div className={"d-grid gap-2 buttons-list"}>
                {datesData &&
                    datesData.dates.sort((a, b) => DateService.toLocalDate(a.date).millisecond() - DateService.toLocalDate(b.date).millisecond())
                        .map(x => {

                            let toPosition = `/new-entry/${locationId}/dates/${x.id}/position`;
                            let toViewTeam = `/existing-entries/${locationId}/dates/${x.id}/team`;

                            let to = props.locationViewType === LocationViewType.ForSchedule ?
                                toPosition :
                                toViewTeam;


                            return <Button key={x.id} as={LinkAdapter as any}
                                           to={to}
                                           variant="info"
                                           state={{locationId: locationId, calendarId: x.id}}
                                           size="lg">{DateService.formatDMY(x.date)}</Button>
                            {/*{AppButtons.ToTeamFromExistingDate(Number(locationId), x.id, DateService.formatDMY(x.date))}*/
                            }
                        })
                }
            </div>
        </div>
    }
}
