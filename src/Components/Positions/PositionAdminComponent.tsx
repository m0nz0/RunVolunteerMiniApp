import React, {FC, useEffect, useState} from "react";
import PositionService from "../../Services/PositionService";
import {PositionAdminData} from "../../types";
import {Button, Form, Spinner, Table} from "react-bootstrap";
import {PositionType, PositionTypeParams} from "../../Const/PositionType";
import {useParams} from "react-router-dom";
import {NameWithBadgeComponent} from "../Team/NameWithBadgeComponent";
import './styles.css'

export const PositionAdminComponent: FC = (props) => {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<PositionAdminData>()
    const [selected, setSelected] = useState<Record<number, PositionType>>({});
    const {locationId} = useParams()

    const savePositions = async () => {
        await PositionService.savePositionsForAdmin(Number(locationId), selected)
            .then(() => window.location.reload())
    }

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const adminData = await PositionService.getPositionsForAdmin(Number(locationId))
                let filtered = {
                    positions: adminData.positions.sort((a, b) => a.name.localeCompare(b.name)),
                    location: adminData.location
                }
                setData(filtered)

                setSelected(
                    filtered.positions.reduce((acc, pos) => {
                        acc[pos.id] = Number(pos.positionType) as PositionType
                        return acc;
                    }, {} as Record<number, PositionType>)
                );
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

    return <div>
        <p className={"text-center"}>
            <h5>Настройка позиций для локации {data?.location.name}</h5>
            <span className={"text-danger"}>Не забудьте сохранить после внесения изменений</span>
        </p>
        <Table striped hover>
            <thead>
            <tr>
                <th></th>
                {Object.entries(PositionTypeParams)
                    .map(([type, {name, icon}]) =>
                        <th>
                            {name}
                            {/*<NameWithBadgeComponent name={name}*/}
                            {/*                        badgeValue={Object.entries(selected)*/}
                            {/*                            .filter(([position, positionType]) => positionType === Number(type) as PositionType)*/}
                            {/*                            .length}*/}
                            {/*                        badgeColor={"success"}*/}
                            {/*                        isRight={true}/>*/}
                        </th>)}
            </tr>
            </thead>
            <tbody>
            {data?.positions.map(pos => {
                    return <tr>
                        <td>{pos.name}</td>
                        {Object.keys(PositionTypeParams).map(
                            (type) => {
                                const t = Number(type) as PositionType;
                                return <td className={"text-center"}>
                                    <Form.Check type={"radio"}
                                                checked={selected[pos.id] === t}
                                                onChange={() => handleChange(pos.id, t)}
                                                disabled={pos.id === 1}>
                                    </Form.Check>
                                </td>
                            })}
                    </tr>
                }
            )}
            </tbody>
        </Table>
        <div style={{textAlign: "right"}}>
            <Button variant={"info"}
                    onClick={() => savePositions()}
                    size={"sm"}>Сохранить</Button>
        </div>
    </div>
}
