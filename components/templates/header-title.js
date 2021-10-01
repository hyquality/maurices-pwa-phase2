import React from "react";
import PropTypes from "prop-types";

export default function HeaderTitle({tag, style, size, className, color, weight, position, children, ...props}) {
    const CustomTag = `${tag}`;
    return (
        <CustomTag
            className={[tag, style, size, className, color, weight, position, " header-title"].join(' ')}
            {...props}
        >{children}</CustomTag>
    )
}

HeaderTitle.propTypes = {
    tag: PropTypes.oneOf(['h1', 'h2', 'h3']),
    style: PropTypes.oneOf(['normal', 'utopia']),
    children: PropTypes.string.isRequired,
    weight: PropTypes.oneOf(['regular', 'bold']),
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    position: PropTypes.oneOf(['left', 'right', 'center']),
    color: PropTypes.oneOf([undefined, 'gray', 'green', 'red', 'white'])
}
HeaderTitle.defaultProps = {
    tag: "h1",
    style: "normal",
    children: "",
    className: "",
    size: 'small',
    weight: 'regular',
    position: 'center',
    color: undefined
};