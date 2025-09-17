import React, {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import VerstService from "../../Services/VerstService";
import {Button, Form, Spinner, Table} from "react-bootstrap";
import {toast} from "react-toastify";
import RosterService from "@/Services/RosterService";
import {RosterCompareData} from "@/types";
import {DateService} from "@/Common/DateService";
import {Icons} from "@/Const/Icons";
import {NrmsAction} from "@/Const/Source";
import {useAuth} from "@/Common/useAuth";
import './styles.css'
import {LoginType} from "@/Const/LoginType";

interface Props {
}

interface SelectedItem {
    positionId: number;
    verstId: number;
}

export const RosterComponent: FC<Props> = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [roster, setRoster] = useState<RosterCompareData>()
    const {locationId, calendarId} = useParams();
    const {token} = useAuth(LoginType.Nrms);

    const [selected, setSelected] = useState<SelectedItem[]>([])

    const handleChange = (positionId: number, verstId: number) => {
        setSelected((prev) => {
            const exists = prev.some(
                (item) => item.positionId === positionId && item.verstId === verstId
            );
            if (exists) {
                // убираем
                return prev.filter(
                    (item) =>
                        !(item.positionId === positionId && item.verstId === verstId)
                );
            } else {
                // добавляем
                return [...prev, {positionId: positionId, verstId: verstId}];
            }
        });
    };

    const isChecked = (positionId: number, verstId: number) =>
        selected.some(
            (item) => item.positionId === positionId && item.verstId === verstId
        );

    const toSaveBody = () => {
        return {
            event_id: locationId,
            date: DateService.formatDMY(roster?.date?.date ?? ""),
            upload_status_id: 1,
            volunteers: selected.map(x => ({
                    verst_id: x.verstId,
                    role_id: x.positionId
                })
            )
        }
    }

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {

            if (!token) {
                console.log("no token")
                // toast.error("Вы не авторизовались в NRMS или ваш сеанс истёк, пожалуйста, авторизуйтесь снова");
                setLoading(false);
                // return;
            }

            try {
                // шаг 1: получаем доступные локации
                const data = (await VerstService.getAllowedLocations())?.result?.event_list ?? [];
                if (!isMounted) return;

                // шаг 2: проверяем доступ к текущей локации
                const hasAccess = data.some(
                    x => x.id === Number(locationId)
                );

                if (!hasAccess) {
                    toast.error("Загрузка данной локации в NRMS для вас недоступна");
                    return; // останавливаемся, roster не грузим
                }

                // шаг 3: загружаем roster
                const roster = await RosterService.getComparedRoster(
                    token,
                    Number(locationId),
                    Number(calendarId)
                );

                if (!isMounted) {
                    return;
                }
                setRoster(roster);

            } catch (err) {
                toast.error((err as Error).message);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [token, locationId, calendarId]);

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    const handleSave = async () => {
        try {
            toast.info("Это я еще не сделал")
            // await VerstService.saveRoster(toSaveBody())
        } catch (error) {
            console.error(error);
            toast.error("Ошибка сохранения команды в NRMS")
        }
    }

    return ((roster && roster.data && roster.date) && <div>
            <p className={"text-center"}>
                <h5>Предварительные данные по записям в волонтеры
                    от {DateService.formatDayMonthNameYear(roster.date.date)} для локации {roster.location.name}</h5>
            </p>
            <div style={{"display": "flex", "justifySelf": "center"}}>
                <span style={{"paddingRight": "16px"}}>{Icons.ArrowUpLimeGreen} - есть в боте</span>
                <span style={{"paddingRight": "16px"}}>{Icons.ArrowDown} - уже в NRMS</span>
                <span>{Icons.RedCross} - не идентифицирован</span>
            </div>
            <div>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Позиция</th>
                        <th>Имя</th>
                        <th>Выгружать в NRMS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(roster.data).map(([positionId, data]) => {
                        let position = roster.positions.find(x => x.id === Number(positionId))
                        if (!position) {
                            throw new Error("Позиция не найдена")
                        }
                        const users = Object.entries(data);
                        let usersCount = users.length
                        return users.map(([volunteerName, volunteerData], idx) => {
                            return <tr>
                                {idx == 0 &&
                                    <td style={{"verticalAlign": "middle"}}
                                        rowSpan={usersCount}>{position?.name}</td>}
                                <td><span
                                    style={{"textWrap": "nowrap"}}>{volunteerName} {volunteerData.inBot && Icons.ArrowUpLimeGreen}{volunteerData.inNrms && Icons.ArrowDown}{volunteerData.action == NrmsAction.Skip && Icons.RedCross}</span>
                                </td>
                                <td style={{"textAlign": "center"}}>
                                    {volunteerData.action !== NrmsAction.Skip &&
                                        <Form.Check type={"switch"}
                                                    checked={isChecked(position?.parent_id ?? position.id, volunteerData.verstData?.id)}
                                                    onChange={() => handleChange(position?.parent_id ?? position.id, volunteerData.verstData?.id)}>
                                        </Form.Check>}</td>
                            </tr>
                        })
                    })}
                    <tr></tr>
                    </tbody>
                </Table>
            </div>
            <div className={"text-center"}>
                {selected.length > 0 &&
                    <Button variant={"info"} onClick={handleSave} size={"sm"}>Сохранить в NRMS</Button>}
            </div>
            <pre>{JSON.stringify(toSaveBody(), null, 2)}</pre>
        </div>
    )
}
