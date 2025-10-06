import React, {FC, useEffect, useState} from "react";
import {SmileReportData} from "@/types";
import {useParams} from "react-router-dom";
import TeamService from "../../Services/TeamService";
import {Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import {Icons} from "@/Const/Icons";
import {SmartLink} from "@/Common/SmartLink";

export const ReportComponent: FC = () => {
    const [data, setData] = useState<SmileReportData>()
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId, calendarId} = useParams<{ locationId: string; calendarId: string }>();

    const botName = "stavrun_bot"
    const reporterName = "astramoon17"

    useEffect(() => {
            let isMounted = true;

            const loadData = async () => {
                try {
                    let data = await TeamService.getReport(Number(locationId))
                    setData(data)
                } catch (err) {
                    if (isMounted) {
                        console.error(err)
                        toast.error("Ошибка получения данных отчёта")
                    }
                } finally {
                    if (isMounted) setLoading(false);
                }
            };

            loadData();
            return () => {
                isMounted = false;
            };
        }, [locationId, calendarId]
    )

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    const isToday = () => {
        if (data?.lastDate) {
            return new Date(data?.lastDate).getDate() == new Date().getDate()
        }

        return false
    }

    const header = () => {
        if (data?.report) {
            return data.report.split("\n")[0]
        }
        return "Нет данных"
    }

    const info = () => {
        if (data?.report) {
            return data?.report.split("\n")
                .slice(3)
                .join("\n")
                .replace(/\n/g, '<br/>')
        }
        return "Нет данных"
    }

    const link = () => {
        if (data?.report) {
            return data?.report.split("\n")
                .slice(1, 2)
        }
        return "Нет данных"
    }


    return <div>
        {!isToday() && <div className={"text-center text-danger"}>
            {Icons.ExclamationRed} Отчёт за предыдущую дату
        </div>}
        {info() &&
            <>
                <p dangerouslySetInnerHTML={{__html: header()}}></p>
                {info() && <p>
                    Общая таблица с результатами на <SmartLink to={link()[1]}>сайте</SmartLink>
                </p>}
                <p dangerouslySetInnerHTML={{__html: info()}}></p>
                <p>
                    Данные для отчёта подготовлены при помощи - <SmartLink
                    to={`https://t.me/${botName}`}>@{`${botName}`}</SmartLink>
                </p>
                <p>
                    Если у вас есть вопросы и идеи по развитию бота - пишите <SmartLink
                    to={`https://t.me/${reporterName}`}>@{`${reporterName}`}</SmartLink>
                </p>
            </>}
        {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
    </div>
}
