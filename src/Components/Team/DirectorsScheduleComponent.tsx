import {FC, useEffect, useState} from "react";
import {DirectorScheduleData, Team} from "../../types";
import {useParams} from "react-router-dom";
import TeamService from "../../Services/TeamService";
import {Spinner} from "react-bootstrap";
import {DateService} from "../../Common/DateService";
import {ScheduleUserCardComponent} from "../UserCard/ScheduleUserCardComponent";
import {Icons} from "../../Const/Icons";

interface Props {
}

export const DirectorsScheduleComponent: FC<Props> = (props) => {
    const [data, setData] = useState<DirectorScheduleData>()
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const {locationId} = useParams<{ locationId: string }>();

    useEffect(() => {
            let isMounted = true;

            const loadData = async () => {
                try {
                    let data = await TeamService.getDirectorSchedule(Number(locationId))
                    setData(data)
                } catch
                    (err) {
                    if (isMounted) setError((err as Error).message);
                } finally {
                    if (isMounted) setLoading(false);
                }
            };

            loadData();
            return () => {
                isMounted = false;
            };
        }, [locationId]
    )

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    return <div>
        <p>
            <strong>График директоров</strong>
        </p>
        <div>{data?.dates.map(d => {
            let dirs = data?.schedules.filter(x => x.calendarId === d.id)
            return <div>
                <span>{DateService.formatDayMonthNameYear(d.date)}</span>
                {dirs.length === 0 && <ul>{Icons.ExclamationRed}Нет</ul>}
                {dirs.length > 0 &&
                    <ul>
                        {dirs.map(d => <li><ScheduleUserCardComponent user={d.tgUser} scheduledName={d.name}/></li>)}
                    </ul>}
            </div>
        })}
        </div>
    </div>
}
