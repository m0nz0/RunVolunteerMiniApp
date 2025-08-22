import {FC, useEffect, useState} from "react";
import {data, useParams} from "react-router-dom";
import {PositionData} from "../../types";
import PositionService from "../../Services/PositionService";
import {Accordion, Spinner} from "react-bootstrap";
import {useGlobalContext} from "../../Common/Context/GlobalContext";
import {useUserContext} from "../../Common/Context/UserContext";

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
        <div>
            <p>Выбор позиции для локации {locationDict[Number(locationId)].name}</p>
            <p>Calendar {calendarId}</p>

            <Accordion alwaysOpen>
                {/*{Object.gr.groupBy positionData?.positions.map((loc, idx) => (*/}
                {/*//     <Accordion.Item eventKey={idx.toString()} key={idx}>*/}
                {/*//         <Accordion.Header>{loc}</Accordion.Header>*/}
                {/*//         <Accordion.Body>*/}
                {/*//             Information about {loc} goes here...*/}
                {/*//         </Accordion.Body>*/}
                {/*//     </Accordion.Item>*/}
                {/*}*/}
            </Accordion>

            // {positionData?.positions.map(x => <p>{x.name}</p>)}
        </div>
    )
}
