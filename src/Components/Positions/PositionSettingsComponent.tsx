import React, {FC, useEffect, useState} from "react";
import PositionService from "../../Services/PositionService";
import {PositionAdminData} from "@/types";
import {Col, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import Select from "react-select";
import {PositionType, PositionTypeParams} from "@/Const/PositionType";
import './styles.css';

export const PositionSettingsComponent: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<PositionAdminData>();
    const [selectedLimits, setSelectedLimits] = useState<Record<number, number>>({});
    const [selectedTypes, setSelectedTypes] = useState<Record<number, PositionType>>({});
    const {locationId} = useParams();

    const savePositionLimits = async () => {
        await PositionService.savePositionsForLimitsAdmin(Number(locationId), selectedLimits)
            .then(() => toast.success("Лимиты сохранены", {onClose: () => window.location.reload()}))
            .catch(() => toast.error("Ошибка сохранения лимитов позиций"));
    };

    const savePositionTypes = async () => {
        await PositionService.savePositionsForAdmin(Number(locationId), selectedLimits)
            .then(() => toast.success("Позиции сохранены", {onClose: () => window.location.reload()}))
            .catch(() => toast.error("Ошибка сохранения типов позиций"));
    };

    const saveAll = async () => {
        await savePositionTypes().then(async () => await savePositionLimits());
    };

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            try {
                const adminData = await PositionService.getPositionsForAdmin(Number(locationId));
                const filtered = {
                    positions: adminData.positions.sort((a, b) => a.name.localeCompare(b.name)),
                    location: adminData.location
                };
                setData(filtered);

                setSelectedLimits(Object.fromEntries(
                    (adminData?.location?.limits ?? []).map(l => [l.p, l.t])
                ));

                setSelectedTypes(
                    filtered.positions.reduce((acc, pos) => {
                        acc[pos.id] = Number(pos.positionType) as PositionType;
                        return acc;
                    }, {} as Record<number, PositionType>)
                );
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                    toast.error("Ошибка получения позиций для управления");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();
        return () => { isMounted = false; };
    }, []);

    if (loading) return (
        <div className="p-3 text-center">
            <Spinner animation="border" role="status"/>
            <p className="mt-2">Загрузка...</p>
        </div>
    );

    const handleChangeLimit = (positionId: number, limit: number) => {
        setSelectedLimits(prev => ({...prev, [positionId]: limit}));
    };

    const handleChangeType = (positionId: number, type: number) => {
        setSelectedTypes(prev => ({...prev, [positionId]: type}));
    };

    const typeOptions = Object.entries(PositionTypeParams).map(([type, {name}]) => ({
        value: type,
        label: name,
    }));

    const limitOptions = [
        ...Array.from({length: 9}, (_, i) => ({
            value: (i + 1).toString(),
            label: (i + 1).toString(),
        })),
        {value: "", label: "Нет"},
    ];

    return (
        <div className="container">
            <div className="text-center mb-3">
                <h5>Настройка лимитов позиций для локации {data?.location.name}</h5>
                <span className="text-danger">Не забудьте сохранить после внесения изменений</span>
            </div>

            {/* Header */}
            {/* Header */}
            <div className="row fw-bold border-bottom py-2">
                <div className="col">Название</div>
                <div className="col">Типы</div>
                <div className="col">Максимум</div>
            </div>

            {/* Rows */}
            {data?.positions.map(pos => (
                <div className="row align-items-center border-bottom py-2" key={pos.id}>
                    <Col className="fw-bold text-break">{pos.name}</Col>
                    <Col className="rel z2" >
                        <Select
                            className="react-select-bootstrap"
                            classNamePrefix="rsb"
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            styles={{
                                menuPortal: base => ({...base, zIndex: 9999}),
                                menu: base => ({...base, minWidth: "100%", width: "auto"}),
                            }}
                            isSearchable={false}
                            isDisabled={pos.id === 1}
                            value={typeOptions.find(
                                o => o.value == (selectedTypes[pos.id] ?? PositionType.Rare).toString()
                            )}
                            onChange={(opt: any) => handleChangeType(pos.id, Number(opt.value))}
                            options={typeOptions}
                        />
                    </Col>
                    <Col className="rel z1" style={{position: "relative", zIndex: 1}}>
                        <Select
                            className="react-select-bootstrap react-select-wide"
                            classNamePrefix="rsb"
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            styles={{
                                menuPortal: base => ({...base, zIndex: 9999}),
                                menu: base => ({...base, minWidth: "100%", width: "auto"}),
                            }}
                            isSearchable={false}
                            value={limitOptions.find(
                                o => o.value == (selectedLimits[pos.id] ?? "").toString()
                            )}
                            onChange={(opt: any) => handleChangeLimit(pos.id, Number(opt.value))}
                            options={limitOptions}
                        />
                    </Col>
                </div>
            ))}
            {/*<div style={{textAlign: "right"}}>*/}
            {/*    <Button variant={"info"}*/}
            {/*            onClick={() => saveAll()}*/}
            {/*            size={"sm"}>Сохранить</Button>*/}
            {/*</div>*/}
        </div>
    );
};
