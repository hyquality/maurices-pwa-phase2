import PropTypes from 'prop-types';
import React from "react";

export default function Button({label, className, size, color, onClick, showBorder, children, ...props}) {
    return <button
        className={[className, size, color, showBorder ? "border" : "no-border", " btn"].join(' ')}
        onClick={onClick && onClick}
        {...props}
    >
        {label}
        {children}
    </button>
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf([undefined, 'gray', 'gray_2', 'green', 'red', 'white']),
    showBorder: PropTypes.bool,
    onClick: PropTypes.func
}
Button.defaultProps = {
    label: "",
    className: "",
    size: 'small',
    color: undefined,
    showBorder: true,
    onClick: undefined,
};