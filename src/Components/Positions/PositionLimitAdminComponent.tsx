import React, {FC, useEffect, useState} from "react";
import PositionService from "../../Services/PositionService";
import {PositionAdminData} from "@/types";
import {Button, Form, Spinner, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import './styles.css'
import {toast} from "react-toastify";

export const PositionLimitAdminComponent: FC = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<PositionAdminData>()
    const [selected, setSelected] = useState<Record<number, number>>({});
    const {locationId} = useParams()

    const savePositionLimits = async () => {
        await PositionService.savePositionsForLimitsAdmin(Number(locationId), selected)
            .then(() => toast.success("Лимиты сохранены", {onClose: () => window.location.reload()}))
            .catch(reason =>
                toast.error("Ошибка сохранения лимитов позиций"))
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
                    Object.fromEntries(
                        (adminData?.location?.limits ?? []).map(l => [l.p, l.t])
                    )
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

    const handleChange = (positionId: number, limit: number) => {
        setSelected((prev) => ({
            ...prev,
            [positionId]: limit,
        }));
    };

    return <div>
        <div className={"text-center"}>
            <h5>Настройка лимитов позиций для локации {data?.location.name}</h5>
            <span className={"text-danger"}>Не забудьте сохранить после внесения изменений</span>
        </div>
        <Table striped hover>
            <thead>
            <tr>
                <th></th>
                <th>Максимум</th>
            </tr>
            </thead>
            <tbody>
            {data?.positions.map(pos => {
                    return <tr key={pos.id}>
                        <td>{pos.name}</td>
                        <td>
                            <Form.Select
                                value={selected[pos.id] ?? ""}
                                onChange={(e) => handleChange(pos.id, Number(e.target.value))}
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
        <div style={{textAlign: "right"}}>
            <Button variant={"info"}
                    onClick={() => savePositionLimits()}
                    size={"sm"}>Сохранить</Button>
        </div>
    </div>
}
