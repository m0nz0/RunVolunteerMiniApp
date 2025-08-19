import {FC, useEffect, useState} from "react";
import {FullRequest} from "../../Model/FullRequest";
import {Button} from "react-bootstrap";
import LocationService, {Location} from "../../Services/LocationService";
import {LocationInfo} from "../Location/LocationInfo";

interface Props {
    request: FullRequest;
    onBack: () => void;
}

export const LocationList: FC<Props> = (props) => {

    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await LocationService.getLocations();
                setLocations(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <div className="p-6">Загрузка...</div>;
    }

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-500">Ошибка: {error}</p>
                <button
                    onClick={props.onBack}
                    className="mt-4 px-3 py-2 bg-gray-500 text-white rounded-lg"
                >
                    ← Back
                </button>
            </div>
        );
    }

    return <div>
        <Button onClick={props.onBack}>← Back</Button>
        <ul className="space-y-2">
            {locations.map((loc) => (
                <LocationInfo id={loc.id} name={loc.name} address={loc.address}/>
            ))}
        </ul>
    </div>
}
