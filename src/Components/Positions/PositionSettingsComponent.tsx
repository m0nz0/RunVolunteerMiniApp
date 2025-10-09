import React, {FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import PositionService from "../../Services/PositionService";
import {Position, UserLocationDictItem} from "@/types";
import {Alert, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {PositionType, PositionTypeParams} from "@/Const/PositionType";
import './styles.css';
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {closestCenter, DndContext, PointerSensor, TouchSensor, useSensor, useSensors,} from "@dnd-kit/core";
import {GripVertical} from "lucide-react";
import {CSS} from "@dnd-kit/utilities";
import {Icons} from "@/Const/Icons";


const SortableRow = memo(function SortableRow({
                                                  pos,
                                                  handleChangeType,
                                                  handleChangeLimit,
                                                  selectedTypes,
                                                  selectedLimits,
                                                  typeOptions,
                                                  limitOptions,
                                              }: any) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: pos.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "6px 0",
        alignItems: "center",
    };

    return (
        <div ref={setNodeRef} style={style}
             className="row align-items-center py-1 border-bottom">
            <div className="col-auto d-flex align-items-center justify-content-center">
                <span {...listeners} {...attributes}
                      className={"drag-handle"}>
                    <GripVertical size={18}/>
                </span>
            </div>
            <div className="col d-flex align-items-center gap-2">
                {pos.name}
            </div>
            <div className="col">
                <select
                    className="form-select"
                    disabled={pos.id === 1}
                    value={(selectedTypes[pos.id] ?? PositionType.Rare).toString()}
                    onChange={(e) => handleChangeType(pos.id, Number(e.target.value))}
                >
                    {typeOptions.map((o: any) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </div>
            <div className="col small">
                <select
                    className="form-select"
                    value={(selectedLimits[pos.id] ?? "").toString()}
                    onChange={(e) => handleChangeLimit(pos.id, Number(e.target.value))}
                >
                    {limitOptions.map((o: any) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
});

export const PositionSettingsComponent: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [positions, setPositions] = useState<Position[]>([]);
    const [location, setLocation] = useState<UserLocationDictItem>({} as UserLocationDictItem);
    const [selectedLimits, setSelectedLimits] = useState<Record<number, number>>({});
    const [selectedTypes, setSelectedTypes] = useState<Record<number, PositionType>>({});
    const {locationId} = useParams();
    const [show, setShow] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            try {
                const adminData = await PositionService.getPositionsForAdmin(Number(locationId));
                const filtered = {
                    positions: adminData.positions.sort((a, b) => a.name.localeCompare(b.name)),
                    location: adminData.location
                };
                setPositions(filtered.positions)
                setLocation(filtered.location)

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
        return () => {
            isMounted = false;
        };
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // чтобы не срабатывало при случайных касаниях
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250, // нужно удерживать 250мс, чтобы начать drag
                tolerance: 5, // можно немного сдвинуть палец, не отменяя
            },
        })
    );

    const handleChangeLimit = useCallback((id: number, limit: number) => {
        setSelectedLimits((prev) => ({
            ...prev,
            [id]: limit,
        }));
    }, []);

    const handleChangeType = useCallback((id: number, type: number) => {
        setSelectedTypes((prev) => ({
            ...prev,
            [id]: type,
        }));
    }, []);


    const typeOptions = useMemo(() => (
        Object.entries(PositionTypeParams).map(([type, {name}]) => ({
            value: type,
            label: name,
        }))
    ), []);

    const limitOptions = useMemo(() => ([
        ...Array.from({length: 9}, (_, i) => ({
            value: (i + 1).toString(),
            label: (i + 1).toString(),
        })),
        {value: "", label: "Нет"}
    ]), []);

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        )
    }

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        if (active.id !== over?.id) {
            setPositions((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

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

    const handleSaveOrder = async () => {
        const orderedIds = positions.map(p => p.id);
        await PositionService.updateOrder(Number(locationId), orderedIds)
            .then(() => toast.success("Порядок позиций сохранён", {onClose: () => window.location.reload()}))
            .catch(() => toast.error("Ошибка сохранения порядка позиций"));
    };

    const saveAll = async () => {
        await savePositionTypes()
            .then(
                async () => await savePositionLimits())
            .then(
                async () => await handleSaveOrder());
    };


    return (
        <div>
            {/*<pre>{JSON.stringify(positions.map(x => x.id), null, 2)}</pre>*/}
            {/*<pre>{JSON.stringify(selectedTypes, null, 2)}</pre>*/}
            {/*<pre>{JSON.stringify(selectedLimits, null, 2)}</pre>*/}
            <div className="text-center">
                <h5>Настройки позиций для локации {location.name}</h5>
            </div>
            {show && <Alert variant="info" onClose={() => setShow(false)} dismissible>
                <span>Тут вы можете настроить:</span>
                <ul>
                    <li>Группы позиций (обязательные/дополнительные/редкие)</li>
                    <li>Максимальное количество волонтёров для позиции</li>
                    <li><span>Порядок отображения (удерживайте </span>{Icons.Dnd}<span> и перетягивайте позиции)</span></li>
                </ul>
                <div className="text-center">
                    <span className="text-danger"> Не забудьте сохранить после внесения изменений </span>
                </div>
            </Alert>}

            <div className={"container"}>
                <div className="row fw-bold border-bottom py-2">
                    <div className="col-auto"></div>
                    <div className="col">Название</div>
                    <div className="col">Типы</div>
                    <div className="col small">Максимум</div>
                </div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}>
                    <SortableContext items={positions.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                        {positions.map((pos) => <SortableRow
                            key={pos.id}
                            pos={pos}
                            handleChangeType={handleChangeType}
                            handleChangeLimit={handleChangeLimit}
                            selectedTypes={selectedTypes}
                            selectedLimits={selectedLimits}
                            typeOptions={typeOptions}
                            limitOptions={limitOptions}
                        />)}
                    </SortableContext>
                </DndContext>
            </div>
            {/*<div style={{textAlign: " right"}}>*/}
            {/*    <Button variant={" info"}*/}
            {/*            onClick={() => saveAll()}*/}
            {/*            size={" sm"}>Сохранить</Button>*/}
            {/*</div>*/}
        </div>
    );
};
