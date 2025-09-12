import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBan,
    faBullseye,
    faCheck,
    faCrown,
    faExclamation,
    faEye,
    faEyeSlash,
    faHome,
    faHourglass,
    faLocationDot,
    faRotate,
    faStar,
    faArrowUp,
    faArrowDown,
    faArrowsUpDown,
    faXmark,
    faArrowsRotate,
    faQuestion
} from "@fortawesome/free-solid-svg-icons";

export const Icons = {
    ExclamationRed: <FontAwesomeIcon icon={faExclamation} style={{color: "red"}}/>,
    CheckGreen: <FontAwesomeIcon icon={faCheck} style={{color: "green"}}/>,
    Favorite: <FontAwesomeIcon icon={faStar} style={{color: "goldenrod"}}/>,
    Directed: <FontAwesomeIcon icon={faCrown} style={{color: "indianred"}}/>,
    Requested: <FontAwesomeIcon icon={faHourglass} style={{color: "lightblue"}}/>,
    Home: <FontAwesomeIcon icon={faHome} style={{color: "blueviolet"}}/>,
    IsPrepare: <FontAwesomeIcon icon={faRotate} style={{color: "blue"}}/>,
    IsCancel: <FontAwesomeIcon icon={faBan} style={{color: "red"}}/>,
    Target: <FontAwesomeIcon icon={faBullseye} style={{color: "red"}}/>,
    CoordinatePin: <FontAwesomeIcon icon={faLocationDot} style={{color: "red"}}/>,
    EyeOpen: <FontAwesomeIcon icon={faEye}/>,
    EyeClose: <FontAwesomeIcon icon={faEyeSlash}/>,
    ArrowUp: <FontAwesomeIcon icon={faArrowUp}/>,
    ArrowUpLimeGreen: <FontAwesomeIcon icon={faArrowUp} style={{color:"limegreen"}}/>,
    ArrowDown: <FontAwesomeIcon icon={faArrowDown}/>,
    ArrowUpDown: <FontAwesomeIcon icon={faArrowsUpDown}/>,
    RedCross: <FontAwesomeIcon icon={faXmark} style={{color: "red"}}/>,
    Question: <FontAwesomeIcon icon={faQuestion} style={{color: "red"}}/>,
    Rotate: <FontAwesomeIcon icon={faArrowsRotate} style={{color: "goldenrod"}}/>,


}
