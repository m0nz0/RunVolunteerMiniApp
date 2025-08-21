import {FC, useEffect, useState} from "react";
import CalendarService, {Calendar} from "../../Services/CalendarService";
import {useParams} from "react-router-dom";

interface Props {
    locationId: number
}

export const DatesComponent: FC = () => {

    const [dates, setDates] = useState<Calendar[]>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {locationId} = useParams<{ locationId: string }>();

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const data = await CalendarService.getDatesForSchedule(Number(locationId));
                let sorted = data
                    .sort((a, b) => {
                            return a.date.getMilliseconds() - b.date.getMilliseconds()
                        }
                    );

                setDates(sorted)
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

    return (<div>
        <span>
            Выберите желаемую дату для записи:
        </span>
        {
            dates.map(x => <p>{x.date.getDate()}</p>)
        }

    </div>)
}
