import React, {FC} from "react";
import {Card} from "react-bootstrap";
import {LocationFlagComponent} from "./LocationFlagComponent";
import {LocationFlag} from "@/Const/LocationFlag";
import {CoordinatesComponent} from "@/Components/Coordinates/CoordinatesComponent";
import {UserLocationDictItem} from "@/types";
import {SmartLink} from "@/Common/SmartLink";

interface Props {
    location: UserLocationDictItem
}

export const LocationCardBody: FC<Props> = (props) => {
    return (<Card.Body>
        <Card.Title>
            <div>
                {/*<span dangerouslySetInnerHTML={{__html: props.location.href}}></span>*/}
                <strong className={"text-primary"}>{props.location.name}</strong>
                <span>
                    {
                        props.location.locationFlags.map(x => <LocationFlagComponent
                            key={props.location.verstId + "-" + x}
                            flag={LocationFlag[x as keyof typeof LocationFlag]}
                            withText={false}/>
                        )
                    }
                </span>
            </div>
        </Card.Title>
        <Card.Text style={{"display":"grid"}}>
            <span>
                <strong>Город: </strong>
                <span>{props.location.cityName}</span>
            </span>
            <span>
                <strong>Статус: </strong>
                <span>{props.location.verstStatusName}</span>
            </span>
            <span>
                <strong>Где: </strong>
                <CoordinatesComponent lat={props.location.lat} lon={props.location.lon}/>
            </span>
            <span>
                <SmartLink onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
                           to={`https://5verst.ru/${props.location.url}`}>Страница
                    локации</SmartLink>
            </span>
            {!props.location.locationFlags.some(x => x == LocationFlag.IsBotActive) && <div>
                <br/>
                <span>
                    Если вы хотите начать пользоваться ботом, то пусть организатор локации напишет <SmartLink
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    to={"https://t.me/MikeKar"}>мне</SmartLink>. А пока записаться в волонтёры можно <SmartLink
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    to={"https://5verst.ru/preobrazhenskiy/volunteer"}>через сайт</SmartLink>.

                </span>
            </div>}
        </Card.Text>
    </Card.Body>)
}
