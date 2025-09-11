import {FC, useEffect, useState} from "react";
import CalendarService from "../../Services/CalendarService";
import {useParams} from "react-router-dom";
import {CalendarData} from "@/types";
import {Spinner} from "react-bootstrap";
import {DateService} from "@/Common/DateService";
import {LocationViewType} from "@/Const/LocationViewType";
import {AppButtons} from "@/Const/AppButtons";
import {useUserContext} from "@/Common/Context/UserContext";
import {toast} from "react-toastify";

interface Props {
    locationViewType: LocationViewType
}

export const DatesComponent: FC<Props> = (props) => {

    const [datesData, setDatesData] = useState<CalendarData>()
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId} = useParams<{ locationId: string }>();
    const {updateUserDates} = useUserContext()

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                if (props.locationViewType === LocationViewType.ForSchedule) {
                    let data = await CalendarService.getDatesForSchedule(Number(locationId))
                    setDatesData(data)
                    updateUserDates(data.dates)
                } else if (props.locationViewType === LocationViewType.WithSchedules) {
                    let data = await CalendarService.getExistingDates(Number(locationId));
                    setDatesData({dates: data.dates, location: data.location, locations: [], schedules: []})
                    updateUserDates(data.dates)
                }

            } catch (err) {
                if (isMounted) {
                    console.log(err)
                    toast.error("Ошибка получения списка дат")
                }
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
            {AppButtons.ToDateSelectWhenNoExistingDates(Number(locationId), "Хотите стать первым?")}
        </div>
    } else {
        return <div>
            <p className={"text-center"}>
                <h5>{props.locationViewType === LocationViewType.ForSchedule ?
                    "Выбор желаемой даты для записи" :
                    "Даты с записями"
                } для локации {datesData?.location.name}</h5>
            </p>
            <div className={"d-grid gap-2 buttons-list"}>
                {datesData &&
                    datesData.dates.sort((a, b) => DateService.toLocalDate(a.date).millisecond() - DateService.toLocalDate(b.date).millisecond())
                        .map(x => {

                            if (props.locationViewType === LocationViewType.ForSchedule) {
                                return <div className={"d-grid"} key={x.id}>
                                    {AppButtons.ToPositionFromDate(Number(locationId), x.id, DateService.formatDMY(x.date))}
                                </div>
                            }

                            return <div className={"d-grid "} key={x.id}>
                                {AppButtons.ToTeamFromExistingDate(Number(locationId), x.id, DateService.formatDMY(x.date))}
                            </div>
                        })
                }
            </div>
            <div className={"d-grid gap-2 buttons-list"}>
                {datesData?.location.isDirected && AppButtons.ToDirectorsSchedule(Number(locationId), "График директоров", "secondary")}
            </div>
        </div>
    }
}
