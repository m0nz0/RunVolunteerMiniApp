import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {PositionData} from "../../types";
import PositionService from "../../Services/PositionService";
import {Accordion, Button, Spinner} from "react-bootstrap";
import {useGlobalContext} from "../../Common/Context/GlobalContext";
import {PositionTypeParams} from "../../Const/PositionType";
import LinkAdapter from "../../Common/LinkAdapter";

interface Props {
}

export const PositionComponent: FC<Props> = (props) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId} = useParams<{ locationId: string }>();
    const {calendarId} = useParams<{ calendarId: string }>();
    const [positionData, setPositionDats] = useState<PositionData>()
    const {locationDict} = useGlobalContext()

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const data = await PositionService.getPositions(Number(locationId), Number(calendarId));

                setPositionDats(data)
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
            <p>Выбор позиции для локации {locationDict[Number(locationId)].name}</p>
            <p>Calendar {calendarId}</p>
            <p> {JSON.stringify(positionData.calendar)}</p>

            <Accordion alwaysOpen>
                {Object.entries(Object.groupBy(positionData?.positions, item => item.positionType))
                    .map(([positionType, value]) =>
                        // <div>{positionType}</div>
                        <Accordion.Item eventKey={positionType}>
                            <Accordion.Header>{PositionTypeParams[Number(positionType) as keyof typeof PositionTypeParams].name}</Accordion.Header>
                            <Accordion.Body>
                                <div className={"d-grid gap-2 buttons-list"}>
                                    {value
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map(x =>
                                            <Button key={x.id} as={LinkAdapter as any}
                                                    to={`/locations/${locationId}/dates/${x.id}/`}
                                                    variant="info"
                                                    size="lg">{x.name}</Button>
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
