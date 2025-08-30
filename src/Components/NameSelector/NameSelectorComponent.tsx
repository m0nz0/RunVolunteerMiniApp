import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useGlobalContext} from "../../Common/Context/GlobalContext";
import {Button, Form, Spinner} from "react-bootstrap";
import NameInputService from "../../Services/NameInputService";
import {OnInputNameData, VerstAthlete, VerstIdInfo} from "../../types";
import {DateService} from "../../Common/DateService";
import {Icons} from "../../Const/Icons";

interface Props {
}

const Who = {
    Me: "Записать меня",
    Other: "Записть другого человека по имени",
    Top: "Записать одного из инициативных волонтёров"
}

export const NameSelectorComponent: FC<Props> = () => {

    // todo доделать сохраннеи записи
    const [data, setData] = useState<OnInputNameData>()
    const [selected, setSelected] = useState<keyof typeof Who | null>();
    const [otherName, setOtherName] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const {locationId, calendarId, positionId} = useParams<{
        locationId: string,
        calendarId: string,
        positionId: string
    }>();


    const {locationDict, positionDict} = useGlobalContext()

    let position = positionDict[Number(positionId)];
    let location = locationDict[Number(locationId)];
    // let date = dateService.formatDayMonthNameYear(userDatesDict[Number(calendarId)].date);


    useEffect(() => {
            let isMounted = true;

            const loadData = async () => {
                try {
                    let data = await NameInputService.getDataForNameInput(Number(locationId), Number(calendarId))
                    setData(data)
                    setDefault(data?.allUsersDict ?? []);
                } catch
                    (err) {
                    if (isMounted) {
                        setError((err as Error).message);
                    }
                } finally {
                    if (isMounted) {
                        setLoading(false)
                    }
                }
            };

            loadData();

            return () => {
                isMounted = false;
            };
        }, []
    )

    const setDefault = (p: { key: VerstIdInfo; value: VerstAthlete }[]) => {
        const hasAditional = p.some(x => !x.key.isMain)
        const hasMain = p.some(x => x.key.isMain)
        setSelected(hasMain ? "Me" : "Other")

    }

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    return (<div>
        {/*<p>Вы выбрали локацию {location} выбрали дату {date} и позицию {position}"</p>*/}
        <h5 className={"text-center"}>Мы подошли к последнему этапу записи. Надо выбрать кого записать.</h5>
        <div>
            <p>Вы выбрали локацию <strong>{location?.name}</strong>;</p>
            <p>Дата - <strong>{DateService.formatDayMonthNameYear(data?.date?.date ?? "")}</strong>;</p>
            <p>Позиция - <strong>{position?.name}</strong>.</p>
        </div>
        <br/>
        <Form>
            {Object.entries(Who).filter(([key, label]) => {
                if (key === "Me") {
                    return (data?.allUsersDict ?? []).length > 0;
                } else if (key === "Other") {
                    return true
                } else if (key === "Top") {
                    return (data?.verstUsers ?? []).length > 0 && (data?.location?.isDirected ?? false);
                }
                return false;
            })
                .map(([key, label]) => {

                    return <Form.Check
                        key={key}
                        type="radio"
                        name="who"
                        id={`who-${key}`}
                        label={label}
                        checked={selected === key}
                        onChange={() => setSelected(key as keyof typeof Who)}
                    />
                })}
        </Form>
        <div className="mt-3">
            {selected === "Me" && (
                <div className="d-flex gap-2 flex-wrap">
                    {(data?.allUsersDict ?? []).map((label, idx) => (
                        <Button key={idx} variant="info">
                            {label.key.isMain ? Icons.Favorite : null} {label.value.full_name}
                        </Button>
                    ))}
                </div>
            )}

            {selected === "Other" && (
                <Form.Group controlId="otherName" className="mt-2">
                    <Form.Label>
                        <div>
                            <p>Имя человека</p>
                            <p className={"text-danger"}>Очень желательно вводить имя в формате "Иванов Иван A79*** </p>
                        </div>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите имя"
                        value={otherName}
                        onChange={(e) => setOtherName(e.target.value)}
                    />
                </Form.Group>
            )}

            {selected === "Top" && (
                <Form.Group controlId="otherName" className="mt-2">
                    <Form.Label>Кого из волонтёров вы хотите записать?</Form.Label>
                    <div className="d-grid gap-2">
                        {data?.verstUsers.map(v =>
                            <Button key={v.id} variant="info">
                                {Icons.Target} {v.full_name}
                            </Button>)}
                    </div>
                </Form.Group>

            )}
        </div>
    </div>)
}
