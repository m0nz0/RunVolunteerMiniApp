import React, {FC, useEffect, useState} from "react";
import {DirectorScheduleData} from "@/types";
import {useParams} from "react-router-dom";
import TeamService from "../../Services/TeamService";
import {Spinner} from "react-bootstrap";
import {DateService} from "@/Common/DateService";
import {UserCardComponent} from "../UserCard/UserCardComponent";
import {Icons} from "@/Const/Icons";
import {toast} from "react-toastify";

export const DirectorsScheduleComponent: FC = () => {
    const [data, setData] = useState<DirectorScheduleData>()
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
                    if (isMounted) {
                        console.error(err)
                        toast.error("Ошибка получения графика директоров")
                    }
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
        <div className={"text-center"}>
            <h5>График директоров</h5>
        </div>
        <div>{data?.dates.map(d => {
            let dirs = data?.schedules.filter(x => x.calendarId === d.id)
            return <div key={d.id}>
                <span>{DateService.formatDayMonthNameYear(d.date)}</span>
                {dirs.length === 0 && <ul>{Icons.ExclamationRed}Нет</ul>}
                {dirs.length > 0 &&
                    <ul>
                        {dirs.map(d => <li key={d.id}>
                            <UserCardComponent name={d.name}
                                               verstId={d.verstId}
                                               tgLogin={d.tgUser?.tgLogin}/>
                        </li>)}
                    </ul>}
            </div>
        })}
        </div>
    </div>
}
