import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {PositionData} from "@/types";
import PositionService from "../../Services/PositionService";
import {Accordion, Alert, Spinner} from "react-bootstrap";
import {useGlobalContext} from "@/Common/Context/GlobalContext";
import {PositionType, PositionTypeParams} from "@/Const/PositionType";
import {DateService} from "@/Common/DateService";
import {Icons} from "@/Const/Icons";
import {AppButtons} from "@/Const/AppButtons";
import {toast} from "react-toastify";
import {v4 as uuid} from "uuid";

export const PositionComponent: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId, calendarId} = useParams<{ locationId: string, calendarId: string }>();
    const [positionData, setPositionData] = useState<PositionData>()
    const {locationDict} = useGlobalContext()

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const data = await PositionService.getPositionsForSchedule(Number(locationId), Number(calendarId));

                setPositionData(data)
            } catch (err) {
                if (isMounted) {
                    console.error(err)
                    toast.error("Ошибка получения позиций для записи")
                }
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

    return (
        positionData && <div>
            <div className={"text-center"}>
                <h5>Выбор позиции для локации {locationDict[Number(locationId)].name},
                    даты {DateService.formatDayMonthNameYear(positionData.calendar.date)}</h5>
            </div>
            <Alert variant={"info"} style={{"justifySelf": "center"}}>
                {/*<p>{Icons.ExclamationRed} - обязательная позиция</p>*/}
                {/*<p>{Icons.CheckGreen} - кто-то уже записался</p>*/}
                <span style={{"paddingRight": "16"}}>{Icons.ExclamationRed} - обязательная позиция</span>
                <span>{Icons.CheckGreen} - кто-то уже записался</span>
            </Alert>
            {(positionData.overLimitPositions ?? []).length > 0 &&
                <Alert>Запись на некоторые позиции недоступна. Набрано достаточное количество волонтёров</Alert>}

            <Accordion alwaysOpen={false} defaultActiveKey={PositionType.Main.toString()}>
                {Object.entries(Object.groupBy(positionData?.positions, item => item.positionType))
                    .map(([positionType, value]) =>
                        <Accordion.Item eventKey={positionType} key={positionType.toString()}>
                            <Accordion.Header>{PositionTypeParams[Number(positionType) as keyof typeof PositionTypeParams].name}</Accordion.Header>
                            <Accordion.Body>
                                <div className={"d-grid gap-2"}>
                                    {value
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map(x => {
                                            let icon = positionData.team.some(t => t.positionId === x.id) ?
                                                Icons.CheckGreen : positionType === PositionType.Main.toString() ? Icons.ExclamationRed : null;

                                            return ({
                                                ...AppButtons.ToNameInput(
                                                    Number(locationId),
                                                    Number(calendarId),
                                                    x.id,
                                                    <div>{icon} {x.name}</div>,
                                                    "info",
                                                    (positionData.overLimitPositions ?? []).some(o => o.id == x.id)),
                                                key: uuid()
                                            });
                                        })
                                    }
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                }
            </Accordion>
        </div>
    )
}
