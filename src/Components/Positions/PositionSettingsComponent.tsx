import React, {FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import PositionService from "../../Services/PositionService";
import {Position, UserLocationDictItem} from "@/types";
import {Alert, Button, Container, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {PositionType, PositionTypeParams} from "@/Const/PositionType";
import './styles.css';
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {createPortal} from "react-dom";
import {GripVertical} from "lucide-react";
import {CSS} from "@dnd-kit/utilities";

interface LimitOption {
    value: string;
    label: string;
}

interface SortableRowProps {
    pos: Position;
    handleChangeLimit: (id: number, limit: number) => void;
    selectedLimits: Record<number, number>;
    limitOptions: LimitOption[];
}

const SortableRow: FC<SortableRowProps> = memo(
    ({pos, handleChangeLimit, selectedLimits, limitOptions}) => {
        const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
            id: pos.id,
        });

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
                <div className="col d-flex align-items-center gap-2"
                     style={{"wordBreak": "break-word"}}>
                    {pos.name}
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
                <div className="col-auto d-flex align-items-center justify-content-center">
                    <span {...listeners} {...attributes}
                          className={"drag-handle"}>
                        <GripVertical size={18}/>
                    </span>
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
        const [activeId, setActiveId] = useState<number | null>(null);

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

        const groupedPositions = () => {
            return Object.groupBy(
                positions, item => item.positionType
            ) as Record<number, Position[]>;
        };

        const handleDragStart = (event: any) => {
            setActiveId(event.active.id);
        };

        const handleDragEnd = (event: DragEndEvent) => {
            const {active, over} = event;
            setActiveId(null); // сбрасываем overlay

            if (!over || active.id === over.id) return;

            setPositions((prev) => {
                const activeItem = prev.find(p => p.id === active.id);
                const overItem = prev.find(p => p.id === over.id);
                if (!activeItem || !overItem) return prev;

                const activeGroup = activeItem.positionType;
                const overGroup = overItem.positionType;

                if (activeGroup === overGroup) {
                    const filtered = prev.filter(p => p.positionType === activeGroup);
                    const oldIndex = filtered.findIndex(p => p.id === active.id);
                    const newIndex = filtered.findIndex(p => p.id === over.id);

                    const reordered = arrayMove(filtered, oldIndex, newIndex);
                    const others = prev.filter(p => p.positionType !== activeGroup);
                    return [...others, ...reordered];
                }

                const withoutActive = prev.filter(p => p.id !== active.id);
                const targetGroupItems = withoutActive.filter(p => p.positionType === overGroup);
                const insertIndex = targetGroupItems.findIndex(p => p.id === over.id);

                const updatedActive = {...activeItem, positionType: overGroup};

                const before = targetGroupItems.slice(0, insertIndex);
                const after = targetGroupItems.slice(insertIndex);

                const newGroupItems = [...before, updatedActive, ...after];
                const otherGroups = withoutActive.filter(p => p.positionType !== overGroup);

                return [...otherGroups, ...newGroupItems];
            });
        };

        const handleDragCancel = () => setActiveId(null);

        const handleDragOver = (event: any) => {
            const {active, over} = event;
            if (!over) return;

            setPositions((prev) => {
                const activeItem = prev.find(p => p.id === active.id);
                const overItem = prev.find(p => p.id === over.id);
                if (!activeItem || !overItem) return prev;

                const activeGroup = activeItem.positionType;
                const overGroup = overItem.positionType;

                // Если перетаскиваем внутри той же группы — ничего не делаем
                if (activeGroup === overGroup) return prev;

                // Перемещаем элемент временно в новую группу
                const withoutActive = prev.filter(p => p.id !== active.id);
                const targetGroupItems = withoutActive.filter(p => p.positionType === overGroup);
                const insertIndex = targetGroupItems.findIndex(p => p.id === over.id);

                const updatedActive = {...activeItem, positionType: overGroup};

                const before = targetGroupItems.slice(0, insertIndex);
                const after = targetGroupItems.slice(insertIndex);
                const newGroupItems = [...before, updatedActive, ...after];
                const otherGroups = withoutActive.filter(p => p.positionType !== overGroup);

                return [...otherGroups, ...newGroupItems];
            });
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
            <Container>
                {/*<pre>{JSON.stringify(positions.map(x => x.id), null, 2)}</pre>*/}
                {/*<pre>{JSON.stringify(selectedLimits, null, 2)}</pre>*/}
                {/*{<pre>{JSON.stringify(window?.Telegram?.WebApp?.initDataUnsafe?.user, null, 2)}</pre>}*/}
                <div className="text-center">
                    <h5>Настройки позиций для локации {location.name}</h5>
                </div>
                {show && <Alert variant="info" onClose={() => setShow(false)} dismissible>
                    <span>Тут вы можете настроить:</span>
                    <ul>
                        <li>Группы позиций (обязательные/дополнительные/редкие) и их порядок внутри группы. Для этого
                            удерживайте <GripVertical size={18}/> и перетягивайте позиции.
                        </li>
                        <li>Максимальное количество волонтёров для позиции.</li>
                    </ul>
                </Alert>}
                <Alert variant={"danger"} className="text-center">
                    <span className="text-danger"> Не забудьте сохранить после внесения изменений </span>
                </Alert>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    onDragCancel={handleDragCancel}
                    onDragOver={handleDragOver}>
                    {Object.entries(groupedPositions())
                        .map(([type, groupedPos]) =>
                            <div id={`panel-${type}`}
                                 key={`panel-${type}`}>
                                <div className={"text-center"}>
                                    <strong>{PositionTypeParams[Number(type) as keyof typeof PositionTypeParams].name}</strong>
                                </div>
                                <div className="row fw-bold border-bottom py-2">
                                    <div className="col">Название</div>
                                    <div className="col small">Максимум</div>
                                    <div className="col-auto"></div>
                                </div>
                                <SortableContext
                                    id={type}
                                    key={type}
                                    items={groupedPos.map(x => x.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {groupedPos
                                        .map((pos: any) => <SortableRow
                                            key={pos.id}
                                            pos={pos}
                                            handleChangeLimit={handleChangeLimit}
                                            selectedLimits={selectedLimits}
                                            limitOptions={limitOptions}
                                        />)}
                                </SortableContext>
                                <br/>
                                <br/>
                            </div>)}

                    {createPortal(
                        <DragOverlay>
                            {activeId ? (
                                <SortableRow
                                    pos={positions.find(p => p.id === activeId)!}
                                    handleChangeLimit={handleChangeLimit}
                                    selectedLimits={selectedLimits}
                                    limitOptions={limitOptions}
                                />
                            ) : null}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>

                <div style={{textAlign: "right"}}>
                    <Button variant={"info"}
                            onClick={() => saveAll()}
                            size={"sm"}>Сохранить</Button>
                </div>
            </Container>
        );
    }
;
