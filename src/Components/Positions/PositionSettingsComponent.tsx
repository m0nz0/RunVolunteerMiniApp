import React, {FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import PositionService from "../../Services/PositionService";
import {Position, UserLocationDictItem} from "@/types";
import {Alert, Button, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {PositionType, PositionTypeParams} from "@/Const/PositionType";
import './styles.css';
import {
    arrayMove, rectSortingStrategy,
    rectSwappingStrategy,
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {GripVertical} from "lucide-react";
import {CSS} from "@dnd-kit/utilities";


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
            <div className="col d-flex align-items-center gap-2"
                 style={{"wordBreak": "break-word"}}>
                {pos.name} - {pos.id} - {pos.positionType}
            </div>
            {/*<div className="col">*/}
            {/*    <select*/}
            {/*        className="form-select"*/}
            {/*        disabled={pos.id === 1}*/}
            {/*        value={(selectedTypes[pos.id] ?? PositionType.Rare).toString()}*/}
            {/*        onChange={(e) => handleChangeType(pos.id, Number(e.target.value))}*/}
            {/*    >*/}
            {/*        {typeOptions.map((o: any) => (*/}
            {/*            <option key={o.value} value={o.value}>{o.label}</option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</div>*/}
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
                        positions: adminData.positions,
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

        const groupedPositions = () =>
            Object.entries(
                Object.groupBy(
                    positions, item => item.positionType
                )
            )
        const handleDragEnd = (event: DragEndEvent) => {
            const {active, over} = event;

            const source = active?.data.current?.sortable?.containerId;
            let oldIndex = active?.data.current?.sortable.index;
            const target = over?.data.current?.sortable?.containerId;
            let newIndex = over?.data.current?.sortable.index;

            if (!source || !target) return;
            if (oldIndex == newIndex) return;

            console.log(source, target)
            console.log(active, over)
            // В любом случае мы меняем позицию
            console.log(`order changed from ${oldIndex} to ${newIndex}`);
            setPositions((items) => {
                return arrayMove(items, oldIndex, newIndex);
            })
            // если поменялся контейнер, то меняем тип
            if (source != target) {
                console.log(`container changed from ${source} to ${target}`);
                let newType = target == 1 ? PositionType.Main :
                    target == 2 ? PositionType.Additional :
                        PositionType.Rare;
                console.log(newType);

                // если элемент перемещён между контейнерами
                let newPositions = positions.map(x => {
                    if (x.id == active.id) {
                        x.positionType = newType
                    }
                    return x;
                })
                setPositions((items) => {
                    return arrayMove(newPositions, oldIndex, newIndex);
                })
            }
        };

        const savePositionLimits = async () => {
            await PositionService.savePositionsForLimitsAdmin(Number(locationId), selectedLimits)
                .then(() => toast.success("Лимиты сохранены", {onClose: () => window.location.reload()}))
                .catch(() => toast.error("Ошибка сохранения лимитов позиций"));
        };

        const savePositionTypes = async () => {
            await PositionService.savePositionsForAdmin(Number(locationId), selectedTypes)
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
            toast.warn("В процессе разработки")
            // await savePositionTypes();
            // await savePositionLimits();
            // await handleSaveOrder();
        };


        return (
            <div>
                {/*<pre>{JSON.stringify(positions.map(x => x.id), null, 2)}</pre>*/}
                {/*<pre>{JSON.stringify(selectedTypes, null, 2)}</pre>*/}
                {/*<pre>{JSON.stringify(selectedLimits, null, 2)}</pre>*/}
                {/*<pre>{JSON.stringify(positions.map(x => `${x.id} - ${x.positionType}`), null, 2)}</pre>*/}
                <div className="text-center">
                    <h5>Настройки позиций для локации {location.name}</h5>
                </div>
                {show && <Alert variant="info" onClose={() => setShow(false)} dismissible>
                    <span>Тут вы можете настроить:</span>
                    <ul>
                        <li>Группы позиций (обязательные/дополнительные/редкие)</li>
                        <li>Максимальное количество волонтёров для позиции</li>
                        <li><span>Порядок отображения (удерживайте </span><GripVertical size={18}/><span> и перетягивайте позиции)</span>
                        </li>
                    </ul>
                </Alert>}
                <Alert variant={"danger"} className="text-center">
                    <span className="text-danger"> Не забудьте сохранить после внесения изменений </span>
                </Alert>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}>
                    {groupedPositions()
                        .map(([type, groupedPos]) =>
                            <div id={"panel_" + type}>
                                <div className={"text-center"}>
                                    <strong>{PositionTypeParams[Number(type) as keyof typeof PositionTypeParams].name}</strong>
                                </div>
                                {/*/!*<div className="row fw-bold border-bottom py-2">*!/*/}
                                {/*    <div className="col-auto"></div>*/}
                                {/*    <div className="col">Название</div>*/}
                                {/*    <div className="col small">Максимум</div>*/}
                                {/*</div>*/}
                                <SortableContext id={type}
                                                 items={positions}
                                                 strategy={verticalListSortingStrategy}>
                                    {groupedPos
                                        .map((pos) => <SortableRow
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
                                <br/>
                                <br/>
                            </div>)}
                </DndContext>

                <div style={{textAlign: "right"}}>
                    <Button variant={"info"}
                            onClick={() => saveAll()}
                            size={"sm"}>Сохранить</Button>
                </div>
            </div>
        );
    }
;
