import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {PositionData} from "../../types";
import PositionService from "../../Services/PositionService";
import {Accordion, Alert, Button, Spinner} from "react-bootstrap";
import {useGlobalContext} from "../../Common/Context/GlobalContext";
import {PositionType, PositionTypeParams} from "../../Const/PositionType";
import LinkAdapter from "../../Common/LinkAdapter";
import {DateService} from "../../Common/dateService";
import {Icons} from "../../Const/Icons";

interface Props {
}

export const PositionComponent: FC<Props> = (props) => {
    const [error, setError] = useState<string | null>(null);
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


    return (
        positionData && <div>
            <h5 className={"text-center"}>Выбор позиции для локации {locationDict[Number(locationId)].name},
                даты {DateService.formatDayMonthNameYear(positionData.calendar.date)}</h5>

            <Alert variant={"info"}>
                <p>{Icons.ExclamationRed} - обязательная позиция</p>
                <p>{Icons.CheckGreen} - кто-то уже записался</p>
            </Alert>

            <Accordion alwaysOpen={false} defaultActiveKey={PositionType.Main.toString()}>
                {Object.entries(Object.groupBy(positionData?.positions, item => item.positionType))
                    .map(([positionType, value]) =>
                        <Accordion.Item eventKey={positionType} key={positionType.toString()}>
                            <Accordion.Header>{PositionTypeParams[Number(positionType) as keyof typeof PositionTypeParams].name}</Accordion.Header>
                            <Accordion.Body>
                                <div className={"d-grid gap-2 buttons-list"}>
                                    {value
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map(x => {
                                                let icon = positionData.team.some(t => t.positionId === x.id) ?
                                                    Icons.CheckGreen : positionType === PositionType.Main.toString() ? Icons.ExclamationRed : null;

                                                return <Button key={x.id} as={LinkAdapter as any}
                                                               to={`/new-entry/${locationId}/dates/${calendarId}/position/${x.id}`}
                                                               variant="info"
                                                               size="lg">{icon} {x.name}</Button>
                                                {/*{AppButtons.ToNameInput(Number(locationId), Number(calendarId), x.id, {{icon} x.name})}*/
                                                }
                                            }
                                        )
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
