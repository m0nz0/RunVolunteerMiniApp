import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useGlobalContext} from "@/Common/Context/GlobalContext";
import {Button, Form, InputGroup, Spinner} from "react-bootstrap";
import NameInputService from "../../Services/NameInputService";
import {OnInputNameData, SaveData, VerstAthlete, VerstIdInfo} from "@/types";
import {DateService} from "@/Common/DateService";
import {Icons} from "@/Const/Icons";
import {TelegramHelper} from "@/Common/TelegramHelper";
import {toast} from "react-toastify";
import {RouteHelper} from "@/Common/RouteHelper";
import {RouteCode} from "@/routes";

interface Props {
}

const Who = {
    Main: "Записать меня",
    Additional: "Записать дополнительный аккаунт",
    Other: "Записать другого человека по имени",
    Top: "Записать одного из инициативных волонтёров"
}

export const NameSelectorComponent: FC<Props> = () => {

    const [data, setData] = useState<OnInputNameData>()
    const [selected, setSelected] = useState<keyof typeof Who | null>();
    const [verstId, setVerstId] = useState<number | null>(null)
    const [otherName, setOtherName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isValid, setIsValid] = useState<boolean>(false)
    const navigate = useNavigate();

    const {locationId, calendarId, positionId} = useParams<{
        locationId: string,
        calendarId: string,
        positionId: string
    }>();

    const {locationDict, positionDict} = useGlobalContext()

    let position = positionDict[Number(positionId)];
    let location = locationDict[Number(locationId)];

    useEffect(() => {
            let isMounted = true;

            const loadData = async () => {
                try {
                    let data = await NameInputService.getDataForNameInput(Number(locationId), Number(calendarId))
                    setData(data)
                    setDefault(data?.allUsersDict ?? []);
                } catch (err) {
                    if (isMounted) {
                        if (isMounted) {
                            console.error(err)
                            toast.error("Ошибка получения данных для записи")
                        }
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

    useEffect(() => {
        let valid: boolean
        if (locationId && calendarId && position) {

            let idSelects = Array.from(Object.keys(Who) as (keyof typeof Who)[]).filter(x => x !== "Other" as keyof typeof Who);
            let nameSelects = Array.from(Object.keys(Who) as (keyof typeof Who)[]).filter(x => x === "Other" as keyof typeof Who)

            if (idSelects.includes(selected as keyof typeof Who)) {
                valid = !!verstId;
            } else if (nameSelects.includes(selected as keyof typeof Who)) {
                valid = !verstId && otherName != null && otherName !== "" && otherName.length >= 5;
            } else {
                valid = false
            }
        } else {
            valid = false
        }

        setIsValid(valid)

    }, [verstId, otherName]);

    const setDefault = (p: { key: VerstIdInfo; value: VerstAthlete }[]) => {
        const hasAdditional = p.some(x => !x.key.isMain)
        const hasMain = p.some(x => x.key.isMain)
        setSelected(hasMain ? "Main" : hasAdditional ? "Additional" : "Other")
    }

    const saveAsId = async (id: number) => {
        let body: SaveData = {
            verstId: id,
            locationId: Number(locationId),
            calendarId: Number(calendarId),
            positionId: Number(positionId),
            tgId: TelegramHelper.getUser().id
        };
        try {
            await NameInputService.saveNewItem(body);
            toast.success("Большое спасибо, что вы записались в волонтёры.", {
                onClose: () => navigate(RouteHelper.getPath(RouteCode.MyEntries))
            })
        } catch (err) {
            toast.error("Не удалось сохранить данные по id")
        }
    }
    const saveAsName = async () => {
        let body: SaveData = {
            name: otherName,
            locationId: Number(locationId),
            calendarId: Number(calendarId),
            positionId: Number(positionId),
            tgId: TelegramHelper.getUser().id
        };
        try {
            await NameInputService.saveNewItem(body);
            toast.success("Большое спасибо, что вы записались в волонтёры.", {
                onClose: () => navigate(RouteHelper.getPath(RouteCode.MyEntries))
            })
        } catch (err) {
            toast.error("Не удалось сохранить данные по имени")
        }
    }

    const onRadioSelect = (who: string) => {
        setOtherName(null);
        setVerstId(null)
        setIsValid(false)
        setSelected(who as keyof typeof Who)
    }

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    return (!loading && <div>
        <p className={"text-center"}>
            <h5>Мы подошли к последнему этапу записи. Надо выбрать кого записать.</h5>
        </p>
        <div>
            <p>Вы выбрали локацию <strong>{location?.name}</strong>;</p>
            <p>Дата - <strong>{DateService.formatDayMonthNameYear(data?.date?.date ?? "")}</strong>;</p>
            <p>Позиция - <strong>{position?.name}</strong>.</p>
        </div>
        <br/>
        <Form>
            {Object.entries(Who).filter(([key]) => {
                if (key === "Main") {
                    return (data?.allUsersDict ?? []).filter(x => x.key.isMain).length > 0;
                } else if (key === "Additional") {
                    return (data?.allUsersDict ?? []).filter(x => !x.key.isMain).length > 0;
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
                        onChange={() => onRadioSelect(key)}
                    />
                })}
        </Form>
        <div className="mt-3">
            {selected === "Main" && (
                <div className="d-flex gap-2 flex-wrap">
                    {(data?.allUsersDict ?? [])
                        .filter(x => x.key.isMain).map((label, idx) => (
                            <Button key={idx}
                                    variant="info"
                                    onClick={async () => {
                                        setOtherName(null)
                                        await saveAsId(label.key.verstId)
                                    }}>
                                {label.key.isMain ? Icons.Favorite : null} {label.value.full_name}
                            </Button>
                        ))}
                </div>
            )}
            {selected === "Additional" && (
                <div className="d-flex gap-2 flex-wrap">
                    {(data?.allUsersDict ?? [])
                        .filter(x => !x.key.isMain).map((label, idx) => (
                            <Button key={idx}
                                    variant="info"
                                    onClick={async () => {
                                        setOtherName(null);
                                        await saveAsId(label.key.verstId);
                                    }}>
                                {label.key.isMain ? Icons.Favorite : null} {label.value.full_name}
                            </Button>
                        ))}
                </div>
            )}

            {selected === "Other" && (
                <div>
                    <Form.Group controlId="otherName" className="mt-2">
                        <Form.Label>
                            <div>
                                <p>Имя человека</p>
                                <p className={"text-danger"}>Очень желательно вводить имя в формате "Иванов Иван
                                    A79*** </p>
                            </div>
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя"
                                value={otherName ?? ""}
                                onChange={(e) => {
                                    setVerstId(null);
                                    setOtherName(e.target.value);
                                }}
                                aria-describedby={"btn-save"}
                            />
                            {isValid && <Button variant={"info"}
                                                size={"sm"}
                                                id={"btn-save"}
                                                onClick={async () => await saveAsName()}>Сохранить</Button>}
                        </InputGroup>
                    </Form.Group>
                </div>
            )}

            {selected === "Top" && (
                <Form.Group controlId="otherName" className="mt-2">
                    <Form.Label>Кого из волонтёров вы хотите записать?</Form.Label>
                    <div className="d-grid gap-2">
                        {data?.verstUsers.map(v =>
                            <Button key={v.id}
                                    variant="info"
                                    onClick={async () => {
                                        setOtherName(null);
                                        await saveAsId(v.id);
                                    }}>
                                {Icons.Target} {v.id} {v.full_name}
                            </Button>)}
                    </div>
                </Form.Group>

            )}
        </div>
    </div>)
}
