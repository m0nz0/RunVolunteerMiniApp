import React, {FC} from "react";
import {ButtonGroup, ButtonToolbar, Card, Dropdown, DropdownButton} from "react-bootstrap";
import {TgUser, UserLocationDictItem} from "../../types";
import {LocationFlag} from "../../Const/LocationFlag";
import {AppButtons} from "../../Const/AppButtons";
import LocationService from "../../Services/LocationService";
import {useNavigate} from "react-router-dom";

interface Props {
    location: UserLocationDictItem,
    user: TgUser
}

export const LocationCardFooter: FC<Props> = (props) => {

    const navigate = useNavigate();
    let location = props.location;
    let canNewEntry = location.locationFlags.some(x => x === LocationFlag.IsBotActive)


    const handleOnOffClick = async () => {
        let locationId = props.location.verstId;
        let newActive = !props.location.botActive
        await LocationService.locationOnOff(locationId, newActive)
            .then(() => window.location.reload());

    }

    const handleFavoriteClick = async () => {
        let locationId = props.location.verstId;
        await LocationService.locationFavorite(locationId)
            .then(() => window.location.reload());
    }

    let addonList = []

    if (props.user.isAdmin) {
        addonList.push(<div className={"w-100"}
                            onClick={() => handleOnOffClick()}
        >{props.location.botActive ? "Отключить" : "включить"} в боте</div>)
    }


    if (props.location.botActive) {
        // todo addonList.push("position admin")
        addonList.push(<div className={"w-100"}
                            onClick={() => handleFavoriteClick()}
        >{props.location.isFavorite ? "Исключить из избранного" : "Добавить в избранное"}</div>)

        if (!props.location.isRequested && !props.location.isDirected) {
// todo            addonList.push("new director")
        }
        addonList.push(<div onClick={() => navigate(`/locations/${location.verstId}/directors`)}>Список
            директоров</div>)
        // AppButtons.ToDirectors(location.verstId, "Список директоров"))
    }


    return (<Card.Footer>
            <ButtonToolbar className={"d-grip gap-2"}>
                {canNewEntry && AppButtons.NewEntryToSelectDate(location.verstId)}

                {location.botActive && AppButtons.WhoScheduled(location.verstId)}

                <DropdownButton as={ButtonGroup}
                                variant={"info"}
                                size={"sm"}
                                title="Дополнительно"
                                id="location-addon">
                    {addonList.map((item, index) => <Dropdown.Item as={"div"}>{item}</Dropdown.Item>)}
                </DropdownButton>

            </ButtonToolbar>
        </Card.Footer>
    )
}
