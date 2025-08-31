import {FC, useEffect, useState} from "react";
import PositionService from "../../Services/PositionService";
import {PositionAdminData} from "../../types";
import {Form, Spinner, Table} from "react-bootstrap";
import {PositionType, PositionTypeParams} from "../../Const/PositionType";
import {useParams} from "react-router-dom";


export const PositionAdminComponent: FC = (props) => {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<PositionAdminData>()
    const [selected, setSelected] = useState<Record<number, PositionType>>({});


    const {locationId} = useParams()

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const adminData = await PositionService.getPositionsForAdmin(Number(locationId))
                let filtered = {
                    positions: adminData.positions.filter(x => x.parent_id == null)
                        .sort((a, b) => a.name.localeCompare(b.name)), location: adminData.location
                }
                setData(filtered)
                // console.log("adminData", adminData)
                console.log("filtered", filtered)
                // console.log("data1", data)

                setSelected(
                    adminData.positions.reduce((acc, pos) => {
                        acc[pos.id] = Number(pos.positionType) as PositionType
                        return acc;
                    }, {} as Record<number, PositionType>)
                );
                console.log("selected", selected)
            } catch
                (err) {
                if (isMounted) setError((err as Error).message);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

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

    const handleChange = (positionId: number, type: PositionType) => {
        setSelected((prev) => ({
            ...prev,
            [positionId]: type,
        }));
    };

    return data && (<Table striped hover>
        <thead>
        <tr>
            <th></th>
            {Object.entries(PositionTypeParams)
                .map(([type, {name, icon}]) => <th>{name}</th>)}
        </tr>
        </thead>
        <tbody>
        {data?.positions.map(pos => {
                return <tr>
                    <td>{pos.name}</td>
                    {Object.entries(PositionTypeParams).map(
                        (type) =>
                            <td className={"text-center"}>
                                <Form.Check type={"radio"}
                                            checked={selected[pos.id] === Number(type) as PositionType}
                                            onChange={() => handleChange(pos.id, Number(type) as PositionType)}>
                                </Form.Check>
                            </td>
                    )}
                </tr>
            }
        )}
        </tbody>
    </Table>)
}
