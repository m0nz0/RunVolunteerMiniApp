import React, {FC, useEffect, useState} from "react";
import PositionService from "../../Services/PositionService";
import {PositionAdminData} from "@/types";
import {Form, Spinner, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import './styles.css'
import {toast} from "react-toastify";
import {PositionType, PositionTypeParams} from "@/Const/PositionType";

export const PositionSettingsComponent: FC = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<PositionAdminData>()
    const [selectedLimits, setSelectedLimits] = useState<Record<number, number>>({});
    const [selectedTypes, setSelectedTypes] = useState<Record<number, PositionType>>({});
    const {locationId} = useParams()

    const savePositionLimits = async () => {
        await PositionService.savePositionsForLimitsAdmin(Number(locationId), selectedLimits)
            .then(() => toast.success("Лимиты сохранены", {onClose: () => window.location.reload()}))
            .catch(reason =>
                toast.error("Ошибка сохранения лимитов позиций"))
    }

    const savePositionTypes = async () => {
        await PositionService.savePositionsForAdmin(Number(locationId), selectedLimits)
            .then(() => toast.success("Позиции сохранены", {onClose: () => window.location.reload()}))
            .catch(reason =>
                toast.error("Ошибка сохранения типов позиций"))
    }

    const saveAll = async () => {
        await savePositionTypes()
            .then(async value => await savePositionLimits());
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

                setSelectedLimits(
                    Object.fromEntries(
                        (adminData?.location?.limits ?? []).map(l => [l.p, l.t])
                    )
                );

                setSelectedTypes(
                    filtered.positions.reduce((acc, pos) => {
                        acc[pos.id] = Number(pos.positionType) as PositionType
                        return acc;
                    }, {} as Record<number, PositionType>)
                );
            } catch
                (err) {
                if (isMounted) {
                    console.error(err)
                    toast.error("Ошибка получения позиций для управления")
                }
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

    const handleChangeLimit = (positionId: number, limit: number) => {
        setSelectedLimits((prev) => ({
            ...prev,
            [positionId]: limit,
        }));
    };

    const handleChangeType = (positionId: number, type: number) => {
        setSelectedTypes((prev) => ({
            ...prev,
            [positionId]: type,
        }));
    };

    return <div>
        {/*<pre>{JSON.stringify(selectedTypes, null, 2)}</pre>*/}
        <div className={"text-center"}>
            <h5>Настройка лимитов позиций для локации {data?.location.name}</h5>
            <span className={"text-danger"}>Не забудьте сохранить после внесения изменений</span>
        </div>
        <Table striped hover>
            <thead>
            <tr>
                <th></th>
                <th>Типы</th>
                <th>Максимум</th>
            </tr>
            </thead>
            <tbody>
            {data?.positions.map(pos => {
                    return <tr key={pos.id}>
                        <td>{pos.name}</td>
                        <td>
                            <Form.Select
                                disabled={pos.id === 1}
                                value={selectedTypes[pos.id] ?? PositionType.Rare}
                                onChange={(e) => handleChangeType(pos.id, Number(e.target.value))}
                            >
                                {Object.entries(PositionTypeParams)
                                    .map(([type, {name, icon}], i) => (
                                        <option key={i + 1} value={type}>
                                            {name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </td>
                        <td>
                            <Form.Select
                                value={selectedLimits[pos.id] ?? ""}
                                onChange={(e) => handleChangeLimit(pos.id, Number(e.target.value))}
                            >
                                <option value="">Нет</option>
                                {[...Array(9)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </Form.Select>
                        </td>
                    </tr>
                }
            )}
            </tbody>
        </Table>
        {/*<div style={{textAlign: "right"}}>*/}
        {/*    <Button variant={"info"}*/}
        {/*            onClick={() => saveAll()}*/}
        {/*            size={"sm"}>Сохранить</Button>*/}
        {/*</div>*/}
    </div>
}
