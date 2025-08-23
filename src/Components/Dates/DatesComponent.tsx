import {FC, useEffect, useState} from "react";
import CalendarService from "../../Services/CalendarService";
import {useLocation, useParams} from "react-router-dom";
import {CalendarData} from "../../types";
import {Button, Spinner} from "react-bootstrap";
import LinkAdapter from "../../Common/LinkAdapter";
import {dateService} from "../../Common/dateService";
import {useGlobalContext} from "../../Common/Context/GlobalContext";
import {useUserContext} from "../../Common/Context/UserContext";

interface Props {
    forSchedule: boolean
}

export const DatesComponent: FC<Props> = (props) => {

    const location = useLocation()
    const [datesData, setDatesData] = useState<CalendarData>()
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId} = useParams<{ locationId: string }>();
    const {locationDict} = useGlobalContext();
    const {updateUserDates} = useUserContext()

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                if (props.forSchedule) {
                    let data = await CalendarService.getDatesForSchedule(Number(locationId))
                    setDatesData(data)
                    updateUserDates(data.dates)
                } else {
                    let data = await CalendarService.getExistingDates(Number(locationId));
                    setDatesData({dates: data, location: location.state.loc, locations: [], schedules: []})
                    // updateUserDates(data)
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
    }, []);

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    return (<div>
            <p className={"text-center"}>{location.state.forSchedule ?
                "Выбор желаемой даты для записи"
                : "Даты с записями"
            } для локации {locationDict[Number(locationId)].name}</p>
            <div className={"d-grid gap-2 buttons-list"}>
                {datesData &&
                    datesData.dates.sort((a, b) => dateService.toLocalDate(a.date).millisecond() - dateService.toLocalDate(b.date).millisecond())
                        .map(x => {
                            let to = `/${props.forSchedule ? "new-entry" : "existing-entries"}/${locationId}/dates/${x.id}/${props.forSchedule ? "position" : "team"}`;
                            console.log("to", to)
                            return <Button key={x.id} as={LinkAdapter as any}
                                           to={to}
                                           variant="info"
                                           state={{locationId: locationId, calendarId: x.id}}
                                           size="lg">{dateService.formatDMY(x.date)}</Button>
                        })
                }
            </div>

        </div>
    )
}
