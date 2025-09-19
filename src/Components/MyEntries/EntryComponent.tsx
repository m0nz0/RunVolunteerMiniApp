import React, {FC} from "react";
import {Team} from "@/types";
import {Button, ButtonGroup, ButtonToolbar, Card} from "react-bootstrap";
import {DateService} from "@/Common/DateService";
import {AppButtons} from "@/Const/AppButtons";
import TeamService from "../../Services/TeamService";
import {toast} from "react-toastify";

interface Props {
    team: Team
}

export const EntryComponent: FC<Props> = (props: any) => {

    const [disabled, setDisabled] = useState(false);

    const handleUndo = async (item: Team) => {
        setDisabled(true);
        await TeamService.undoSchedule(item.id)
            .then(value => {
                toast.warn(
                    <p className={"text-center"}>
                        Ваша запись в волонтёры
                        локации {item.location.name} на {DateService.formatDayMonthNameYear(item.calendar.date)} на
                        позицию {item.position.name} отменена<br/>Очень жаль.<br/>Увидимся в следующий раз"
                    </p>
                    , {onClose: () => window.location.reload()})
            })
            .catch(reason => {
                console.error(reason);
                toast.error("Ошибка отмены записи")
            })
    }

    return (<Card style={{cursor: "pointer"}}>
        <Card.Body>
            <div>
                <strong>Локация: </strong>
                <span>{props.team.location.name}</span>
            </div>
            <div>
                <strong>Дата: </strong>
                <span>{DateService.formatDayMonthNameYear(props.team.calendar.date)}</span>
            </div>
            <div>
                <strong>Позиция: </strong>
                <span>{props.team.position.name}</span>
            </div>
        </Card.Body>
        <Card.Footer>
            <ButtonToolbar className={"d-grip gap-2"}>
                <ButtonGroup>
                    {AppButtons.ToTeamFromExistingDate(props.team.locationId, props.team.calendarId, "Посмотреть команду")}
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant={"outline-danger"} size={"sm"}
                            onClick={async () => await handleUndo(props.team)}
                            disabled={disabled}>Отменить
                        запись</Button>
                </ButtonGroup>
            </ButtonToolbar>
        </Card.Footer>
    </Card>)
}
