import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Icon({ icon, className }) {
    return <span className={"icon box-content inline-block w-3 "+className}><FontAwesomeIcon icon={icon} /></span>
}