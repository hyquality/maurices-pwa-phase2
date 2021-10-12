import React from "react";
import PropTypes from "prop-types";

export default function HeaderTitle({
                                        tag,
                                        style,
                                        size,
                                        className,
                                        color,
                                        weight,
                                        position,
                                        upper,
                                        highlight,
                                        highlightColor,
                                        highlightHeight,
                                        children,
                                        ...props
                                    }) {
    const CustomTag = `${tag}`;
    return (
        <CustomTag
            className={[tag, style, size, className, color, weight, position, " header-title leading-none relative", upper ? "uppercase" : ""].join(' ')}
            {...props}
        >
            {
                highlight ? (
                    <>
                        <span className={"absolute inline inset-0 z-10"} dangerouslySetInnerHTML={{__html: children}} />
                        <span className={"relative highlight-wrapper inline text-transparent z-0"}
                              style={{
                                  borderColor: `${highlightColor}`
                              }} dangerouslySetInnerHTML={{__html: children}}/>
                    </>
                ) : (
                    <span dangerouslySetInnerHTML={{__html: children}}/>
                )
            }

        </CustomTag>
    )
}

HeaderTitle.propTypes = {
    tag: PropTypes.oneOf(['h1', 'h2', 'h3']),
    style: PropTypes.oneOf(['normal', 'utopia']),
    children: PropTypes.string.isRequired,
    weight: PropTypes.oneOf(['regular', 'bold']),
    className: PropTypes.string,
    size: PropTypes.oneOf(['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl']),
    position: PropTypes.oneOf(['left', 'right', 'center']),
    upper: PropTypes.bool,
    highlight: PropTypes.bool,
    highlightColor: PropTypes.string,
    highlightHeight: PropTypes.number,
    color: PropTypes.oneOf([undefined, 'dark-gray', 'gray', 'green', 'red', 'white'])
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
    highlight: false,
    highlightColor: "",
    highlightHeight: 0,
    color: undefined
};