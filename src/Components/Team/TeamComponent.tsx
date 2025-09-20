import React, {FC, useEffect, useState} from "react";
import {Position, TeamData} from "@/types";
import {useParams} from "react-router-dom";
import TeamService from "../../Services/TeamService";
import {Button, ButtonGroup, ListGroup, Spinner} from "react-bootstrap";
import {DateService} from "@/Common/DateService";
import {NameWithBadgeComponent} from "./NameWithBadgeComponent";
import {AppButtons} from "@/Const/AppButtons";
import {PositionType} from "@/Const/PositionType";
import {toast} from "react-toastify";
import {UserCardComponent} from "@/Components/UserCard/UserCardComponent";
import {useUserContext} from "@/Common/Context/UserContext";
import {getTelegramUser} from "@/Common/TelegramHelper";
import {useGlobalContext} from "@/Common/Context/GlobalContext";
import {useConfirmModal} from "@/Common/hooks/useConfirmModal";

export const TeamComponent: FC = () => {
    const [team, setTeam] = useState<TeamData>()
    const {positionDict} = useGlobalContext();
    const [loading, setLoading] = useState<boolean>(true);
    const {updateUserDates} = useUserContext();
    const {confirm, ConfirmModal} = useConfirmModal();
    const {locationId, calendarId} = useParams<{ locationId: string; calendarId: string }>();
    const [disabled, setDisabled] = useState<boolean>(false);
    let userId = getTelegramUser().id;

    useEffect(() => {
            let isMounted = true;

            const loadData = async () => {
                try {
                    let data = await TeamService.getTeam(Number(locationId), Number(calendarId))
                    setTeam(data)
                    updateUserDates([data.date])

                } catch (err) {
                    if (isMounted) {
                        console.error(err)
                        toast.error("Ошибка получения данных команды")
                    }
                } finally {
                    if (isMounted) setLoading(false);
                }
            };

            loadData();
            return () => {
                isMounted = false;
            };
        }, [locationId, calendarId]
    )

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    function thisPositions() {
        return team?.positions
            .filter(p => p.positionType == PositionType.Main ||
                team?.schedules.map(s => s.positionId).some(s => s === p.id));
    }

    const test =
        Object.entries(
            Object.groupBy((team?.positions ?? [])
                    .filter(p => p.positionType == PositionType.Main ||
                        team?.schedules.map(s => s.positionId).some(s => s === p.id)),
                (item: Position, index: number) => item.parent_id ?? item.id))
            .map(([key, values]) => {
                return {
                    position: positionDict[Number(key)],
                    users: team?.schedules.filter(s => s.positionId === Number(key)),
                    subPositions: (values ?? []).length == 1 ? [] : (values ?? [])
                        .map((sp) => {
                            return {
                                position: sp,
                                users: team?.schedules.filter(s => s.positionId === sp.id),
                            }
                        })
                }
            })
            .sort((a, b) => {
                // ключ=1 всегда первый
                if (a?.position?.id === 1) {
                    return -1
                }

                if (b?.position?.id === 1) return 1;

                let namea = team?.positions.find(x => x.id === Number(a?.position?.id))?.name
                let nameb = team?.positions.find(x => x.id === Number(b?.position?.id))?.name

                if (namea && nameb) {
                    return namea.localeCompare(nameb)
                }
                return 1;
            })


    let canSchedule = !team?.schedules.some(x => x.tgUser.tgId === userId) && !team?.hasOtherLocations

    let canTrySaveNrms = team?.verstAthlete?.id != null

    const startPoll = async () => {
        try {
            await TeamService.startPoll(team?.pollParameters?.initiatorId)
                .then(() => toast.success("Перекличка запущена. Следите за результатами в боте", {
                    onClose: () => window.location.reload()
                }))
        } catch (err) {
            toast.error("Ошибка при запуске переклички.")
        }
    }

    const deleteItem = async (scheduleId: number) => {
        setDisabled(true)
        try {
            await TeamService.undoSchedule(scheduleId)
            toast.success("Запись удалена", {onClose: () => window.location.reload()});
        } catch (error) {
            console.error("Ошибка удаления записи")
        }
    }

    const handleDelete = (scheduleId: number) => {
        confirm(
            {
                title: "Подтвердите удаление записи",
                message: "Вы уверены, что хотите удалить этого волонтёра?",
                confirmText: "Удалить",
                cancelText: "Отмена",
            },
            () => deleteItem(scheduleId)
        );
    };

    return <div>
        <p className={"text-center"}>
            <h5>
                Команда локации {team?.location?.name} за {DateService.formatDayMonthNameYear(team?.date?.date ?? "")}
            </h5>
        </p>
        <div style={{"display": "flex", "justifyContent": "space-between"}}>
            <NameWithBadgeComponent name={"Записалось волонтёров"}
                                    badgeColor="success"
                                    badgeValue={(team?.schedules ?? []).length}
                                    isRight={true}/>
            <NameWithBadgeComponent name={"Незакрытых позиций"}
                                    badgeColor={"danger"}
                                    badgeValue={(thisPositions() ?? []).filter(p => !team?.schedules.some(s => s.positionId === p.id)).length}
                                    isRight={true}/>
            <NameWithBadgeComponent name={"Частично закрыто позиций"}
                                    badgeColor={"warning"}
                                    badgeValue={(test ?? []).filter(p => p.subPositions.length > 0 && !p.subPositions.every(sp => sp.users?.length == 0)).length}
                                    isRight={true}/>
        </div>
        <ListGroup>
            {(test ?? [])
                .map((x, index, array) => {

                    // danger success warning
                    let rootColor = "success";
                    if (x.subPositions.length == 0) {
                        if (x.users?.length == 0) {
                            rootColor = "danger";
                        }
                    } else {
                        if (x.subPositions.every(sp => sp.users?.length == 0)) {
                            rootColor = "danger"
                        } else {
                            rootColor = "warning"
                        }
                    }
                    return <ListGroup.Item
                        key={x.position.id}
                        as={"li"}
                        className="justify-content-between">

                        <div>
                            <NameWithBadgeComponent name={x.position.name}
                                                    badgeValue={x?.users?.length}
                                                    badgeColor={rootColor}
                                                    isBold={true}/>
                            {(x.users ?? [])
                                .map(u => {
                                    return <div key={x.position.id + "-" + u.verstId}
                                                style={{"display": "flex", "alignItems": "baseline"}}>
                                        <UserCardComponent key={u.id}
                                                           name={u.name}
                                                           verstId={u.verstId}
                                                           tgLogin={u.tgUser.tgLogin}/>
                                        {team?.canDelete && <Button variant={"link"}
                                                                    className={"py-0"}
                                                                    onClick={() => handleDelete(u.id)}
                                                                    disabled={disabled}>Удалить</Button>}
                                    </div>;
                                })
                            }
                            {(x.subPositions ?? []).map((sp) =>
                                <div key={x.position.id + "-" + sp.position.id}
                                     style={{"marginLeft": "8px", "paddingTop": "5px"}}>
                                    <NameWithBadgeComponent name={sp.position.name}
                                                            badgeValue={sp?.users?.length}
                                                            badgeColor={sp?.users?.length === 0 ? "danger" : "success"}/>
                                    {(sp.users ?? [])
                                        .map(u => {
                                            return <div key={x.position.id + "-" + sp.position.id + "-" + u.verstId}
                                                        style={{
                                                            "display": "flex",
                                                            "alignItems": "baseline",
                                                            "marginLeft": "8px"
                                                        }}>
                                                <UserCardComponent key={u.id}
                                                                   name={u.name}
                                                                   verstId={u.verstId}
                                                                   tgLogin={u.tgUser.tgLogin}/>
                                                {team?.canDelete && <Button variant={"link"}
                                                                            className={"py-0"}
                                                                            onClick={() => handleDelete(u.id)}
                                                                            disabled={disabled}>Удалить</Button>}
                                            </div>;
                                        })
                                    }
                                </div>
                            )}
                        </div>
                    </ListGroup.Item>
                })
            }
            <ButtonGroup vertical className={"gap-2"}>
                {canSchedule && AppButtons.ToPositionFromTeam(Number(locationId), Number(calendarId))}
                {team?.pollParameters.canCreate && <Button variant={"info"}
                                                           size={"sm"}
                                                           onClick={() => startPoll()}>Запустить перекличку</Button>}
                {canTrySaveNrms && AppButtons.AuthNrms(Number(locationId), Number(calendarId))}
            </ButtonGroup>
        </ListGroup>
        {ConfirmModal}
        {/*<pre>{JSON.stringify(test, null, 2)}</pre>*/}
    </div>
}
