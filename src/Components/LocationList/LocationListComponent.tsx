import {FC, useEffect, useState} from "react";
import {FullRequest} from "../../Model/FullRequest";
import {Accordion, Spinner} from "react-bootstrap";
import LocationService, {LocationInfo} from "../../Services/LocationService";
import {LocationInfoComponent} from "../Location/LocationInfoComponent";

interface Props {
    request: FullRequest;
    onBack: () => void;
}

export const LocationListComponent: FC = () => {

    const [locations, setLocations] = useState<LocationInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const data = await LocationService.getLocations();
                setLocations(data);
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

    // if (error) {
    //     return (
    //         <div className="p-3">
    //             <Alert variant="danger">Ошибка: {error}</Alert>
    //             <Button onClick={props.onBack} variant="secondary">
    //                 ← Back
    //             </Button>
    //         </div>
    //     );
    // }

    return <div>
        {/*<Button onClick={props.onBack}>← Back</Button>*/}
        <h2 className="mb-3">Locations</h2>
        <Accordion alwaysOpen>
            {locations.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0).map((loc) => (
                <Accordion.Item eventKey={String(loc.verstId)} key={loc.verstId}>
                    <Accordion.Header>
                        <div dangerouslySetInnerHTML={{__html: loc.href}}></div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <LocationInfoComponent location={loc}/>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    </div>
}
