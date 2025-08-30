import React, {FC, useState} from "react";
import {Team} from "../../types";
import {Alert, Button, ButtonGroup, ButtonToolbar, Card} from "react-bootstrap";
import {DateService} from "../../Common/DateService";
import {AppButtons} from "../../Const/AppButtons";
import TeamService from "../../Services/TeamService";
import {useNavigate} from "react-router-dom";

interface Props {
    team: Team
}

export const EntryComponent: FC<Props> = (props: any) => {

    const [toast, setToast] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleUndo = async (itemId: number) => {
        await TeamService.undoSchedule(itemId)
            .then(value => () => setToast(true))
    }

    if (toast) {
        return <Alert variant={"info"}>
            <p className={"text-center"}>Ваша запись в волонтёры
                локации {props.location.name} на {DateService.formatDayMonthNameYear(props.team.calendar.date)} на
                позицию {props.team.position.name} отменена<br/>Очень жаль.<br/>Увидимся в сследующий раз";
            </p>
            <div className="d-flex justify-content-end">
                <Button onClick={() => navigate("/my-entries")}>Ок</Button>
            </div>
        </Alert>
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
                    {/*<Button variant={"info"} size={"sm"}>Посмотреть команду</Button>*/}
                    {AppButtons.ToTeamFromExistingDate(props.team.locationId, props.team.calendarId, "Посмотреть команду")}
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant={"outline-danger"} size={"sm"} onClick={() => handleUndo(props.team.id)}>Отменить
                        запись</Button>
                </ButtonGroup>
            </ButtonToolbar>
        </Card.Footer>
    </Card>)
}
