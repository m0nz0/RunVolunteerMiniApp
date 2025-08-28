import React, {FC} from "react";
import {ButtonGroup, ButtonToolbar, Card, Dropdown, DropdownButton} from "react-bootstrap";
import {TgUser, UserLocationDictItem} from "../../types";
import {LocationViewType} from "../../Const/LocationViewType";
import {LocationFlag} from "../../Const/LocationFlag";
import {AppButtons} from "../../Const/AppButtons";

interface Props {
    location: UserLocationDictItem,
    locationViewType: LocationViewType,
    user: TgUser
}

export const LocationCardFooter: FC<Props> = (props) => {

    let addonList = []
    if (!props.location.botActive) {
        if (props.user.isAdmin) {
            addonList.push("on in bot")
        }
    } else {
        if (props.user.isAdmin) {
            addonList.push("off in bot")
        }
        addonList.push(AppButtons.ToDateSelectWhenNoExistingDates(props.location.verstId, "Записаться"));
        addonList.push("position admin")
        if (props.location.isFavorite) {
            addonList.push("remove from favotite")
        } else {
            addonList.push("add to favotite")
        }
        if (!props.location.isRequested && !props.location.isDirected) {
            addonList.push("new director")
        }
        addonList.push("view directors")
        // todo
        addonList.push("off in bot")

    }


    let location = props.location;
    let canNewEntry = location.locationFlags.some(x => x === LocationFlag.IsBotActive)

    return (<Card.Footer>
            <ButtonToolbar className={"d-grip gap-2"}>
                {canNewEntry && <ButtonGroup>
                    {AppButtons.NewEntryToSelectDate(location.verstId)}
                </ButtonGroup>}
                <ButtonGroup>
                    {AppButtons.WhoScheduled(location.verstId)}
                </ButtonGroup>
                <ButtonGroup>
                    <DropdownButton as={ButtonGroup}
                                    variant={"info"}
                                    size={"lg"}
                                    title="Дополнительно"
                                    id="location-addon">
                        {addonList.map((item, index) => item)}
                        {/*    <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>*/}
                        {/*    <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>*/}
                    </DropdownButton>
                </ButtonGroup>
            </ButtonToolbar>
        </Card.Footer>
    )
}
