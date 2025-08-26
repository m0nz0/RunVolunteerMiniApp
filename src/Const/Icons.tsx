import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBan,
    faCheck,
    faCrown,
    faExclamation,
    faHome,
    faHourglass,
    faRotate,
    faStar,
    faBullseye
} from "@fortawesome/free-solid-svg-icons";

export const icons = {
    ExclamationRed: <FontAwesomeIcon icon={faExclamation} style={{color: "red"}}/>,
    CheckGreen: <FontAwesomeIcon icon={faCheck} style={{color: "green"}}/>,
    Favorite: <FontAwesomeIcon icon={faStar} style={{color: "goldenrod"}}/>,
    Directed: <FontAwesomeIcon icon={faCrown} style={{color: "indianred"}}/>,
    Requested: <FontAwesomeIcon icon={faHourglass} style={{color: "lightblue"}}/>,
    Home: <FontAwesomeIcon icon={faHome} style={{color: "blueviolet"}}/>,
    IsPrepare: <FontAwesomeIcon icon={faRotate} style={{color: "blue"}}/>,
    IsCancel: <FontAwesomeIcon icon={faBan} style={{color: "red"}}/>,
    Target: <FontAwesomeIcon icon={faBullseye} style={{color: "red"}}/>,
}
