import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Icon({ icon, className="",size="sm" }) {
    return <span className={"icon box-content inline-block w-3 "+className}><FontAwesomeIcon icon={icon} size={size} /></span>
}