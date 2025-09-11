import {FC, useEffect, useState} from "react";
import {TeamData} from "@/types";
import {useParams} from "react-router-dom";
import TeamService from "../../Services/TeamService";
import {ButtonGroup, ListGroup, Spinner} from "react-bootstrap";
import {DateService} from "@/Common/DateService";
import {ScheduleUserCardComponent} from "../UserCard/ScheduleUserCardComponent";
import {NameWithBadgeComponent} from "./NameWithBadgeComponent";
import {AppButtons} from "@/Const/AppButtons";
import {TelegramHelper} from "@/Common/TelegramHelper";
import {PositionType} from "@/Const/PositionType";
import {toast} from "react-toastify";

export const TeamComponent: FC = () => {
    const [team, setTeam] = useState<TeamData>()
    const [loading, setLoading] = useState<boolean>(true);

    const {locationId, calendarId} = useParams<{ locationId: string; calendarId: string }>();

    useEffect(() => {
            let isMounted = true;

            const loadData = async () => {
                try {
                    let data = await TeamService.getTeam(Number(locationId), Number(calendarId))
                    setTeam(data)
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

    let canSchedule = !team?.schedules.some(x => x.tgUser.tgId === TelegramHelper.getUser()?.id) && !team?.hasOtherLocations

    let canTrySaveNrms = team?.verstAthlete?.id != null

    return <div>
        <p className={"text-center"}>
            <h5>
                Команда локации {team?.location?.name} за {DateService.formatDayMonthNameYear(team?.date?.date ?? "")}
            </h5>
        </p>
        <p>
            <NameWithBadgeComponent name={"Записалось волонтёров"}
                                    badgeColor="success"
                                    badgeValue={(team?.schedules ?? []).length}
                                    isRight={true}/>
            <NameWithBadgeComponent name={"Незакрытых позиций"}
                                    badgeColor={"danger"}
                                    badgeValue={(thisPositions() ?? []).filter(p => !team?.schedules.some(s => s.positionId === p.id)).length}
                                    isRight={true}/>
        </p>
        <ListGroup>
            {(thisPositions() ?? [])
                .sort((a, b) => {
                    if (a.id === 1) return -1; // ключ=1 всегда первый
                    if (b.id === 1) return 1;

                    let namea = team?.positions.find(x => x.id === Number(a.id))?.name
                    let nameb = team?.positions.find(x => x.id === Number(b.id))?.name

                    if (namea && nameb) {
                        return namea.localeCompare(nameb)
                    }
                    return 1;
                })
                .map((position) => {
                    let positionUsers = team?.schedules.filter(s => s.positionId === position.id) ?? [];
                    return <div>
                        <ListGroup.Item
                            as={"li"}
                            className="d-flex justify-content-between align-items-start">
                            <div>
                                <NameWithBadgeComponent name={position.name}
                                                        badgeValue={positionUsers.length}
                                                        badgeColor={positionUsers.length === 0 ? "danger" : "success"}/>
                                {positionUsers
                                    .map(u =>
                                        <ScheduleUserCardComponent user={u.tgUser} scheduledName={u.name}/>
                                    )
                                }
                            </div>
                        </ListGroup.Item>
                    </div>
                })
            }
            <ButtonGroup vertical className={"gap-2"}>
                {canSchedule && AppButtons.ToPositionFromTeam(Number(locationId), Number(calendarId))}
                {canTrySaveNrms && AppButtons.AuthNrms(Number(locationId), Number(calendarId))}
            </ButtonGroup>
        </ListGroup>
        {/*todo сохранение roaster*/}
    </div>
}
