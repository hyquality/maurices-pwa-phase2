import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

export default function Icon({icon, className, size}) {
    return <span className={`${className} icon box-content inline-block ${size}`}><FontAwesomeIcon icon={icon}/></span>
}

Icon.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf([
        "small", "medium", "large"
    ]),
}

Icon.defaultProps = {
    icon: ['fas','info-circle'],
    size: 'small',
    className: '',
    onClick: undefined,
};