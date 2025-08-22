import {FC, useEffect, useState} from "react";
import CalendarService from "../../Services/CalendarService";
import {useParams} from "react-router-dom";
import {CalendarData} from "../../types";
import {Button, Spinner} from "react-bootstrap";
import LinkAdapter from "../../Common/LinkAdapter";
import {dateService} from "../../Common/dateService";
import {useGlobalContext} from "../../Common/Context/GlobalContext";

interface Props {
    locationId: number
}

export const DatesComponent: FC = () => {

    const [datesData, setDatesData] = useState<CalendarData>()
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId} = useParams<{ locationId: string }>();
    const {locationDict} = useGlobalContext();

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const data = await CalendarService.getDatesForSchedule(Number(locationId));

                setDatesData(data)
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
            <p>
                Выбор желаемой даты для записи для локации {locationDict[Number(locationId)].name}
            </p>
            <div className={"d-grid gap-2 buttons-list"}>
                {datesData &&
                    datesData.dates.sort((a, b) => dateService.toLocalDate(a.date).millisecond() - dateService.toLocalDate(b.date).millisecond())
                        .map(x =>
                            <Button key={x.id} as={LinkAdapter as any}
                                    to={`/locations/${locationId}/dates/${x.id}/`}
                                    variant="info"
                                    size="lg">{dateService.formatDMY(x.date)}</Button>
                        )
                }
            </div>

        </div>
    )
}
