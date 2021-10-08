import React from "react";
import PropTypes from "prop-types";

export default function HeaderTitle({tag, style, size, className, color, weight, position, upper, children, ...props}) {
    const CustomTag = `${tag}`;
    return (
        <CustomTag
            className={[tag, style, size, className, color, weight, position, " header-title",upper?"uppercase":""].join(' ')}
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
    size: PropTypes.oneOf(['text-xs','text-sm','text-base','text-lg','text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl']),
    position: PropTypes.oneOf(['left', 'right', 'center']),
    upper: PropTypes.bool,
    color: PropTypes.oneOf([undefined, 'dark-gray','gray', 'green', 'red', 'white'])
}
HeaderTitle.defaultProps = {
    tag: "h1",
    style: "normal",
    children: "",
    className: "",
    size: 'text-2xl',
    weight: 'regular',
    upper: false,
    position: 'center',
    color: undefined
};