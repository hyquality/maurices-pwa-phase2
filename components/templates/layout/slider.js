import PropTypes from 'prop-types';
import React, {useRef, useState} from "react";
import Templates from "@components/templates/templates";
import Container from "@components/container";
import ScrollDrag from "@components/templates/layout/scroll-drag";
import HeaderTitle from "@components/templates/header-title";

export default function Slider({
                                   fullwidth,
                                   itemWidth,
                                   title,
                                   titleSize,
                                   templates,
                                   className,
                                   context,
                                   ...props
                               }) {

    const slideItem = {
        192: {
            w: "md:w-48",
            m:"w-1/2"
        },
        288: {
            w: "md:w-72",
            m:"w-1/2"
        },
        384: {
            w: "md:w-96",
            m:"w-1/2"
        }
    }
    const sliderClass = `slider-wrapper flex overflow-x-auto relative pb-10`;
    const sliderItemClass = `slide-item mr-8 ${slideItem[itemWidth].m} ${slideItem[itemWidth].w}`;

    const content = (
        <>
            {
                title && (
                    <HeaderTitle tag={"h2"} size={titleSize} style={"utopia"}  className={"pb-7 text-center md:text-left"}>{title}</HeaderTitle>
                )
            }
            <ScrollDrag rootClass={sliderClass}>
                <Templates templates={templates} context={context} className={sliderItemClass}/>
            </ScrollDrag>
        </>
    )
    return (
        <div className={"slider"}>

            {
                fullwidth ? (
                    content
                ) : (
                    <Container>
                        {content}
                    </Container>

                )
            }
        </div>
    )
}

Slider.propTypes = {
    title: PropTypes.number,
    titleSize: PropTypes.oneOf(['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl']),
    fullwidth: PropTypes.bool,
    itemWidth: PropTypes.number,
    templates: PropTypes.any,
    className: PropTypes.string,
    context: PropTypes.string
}
Slider.defaultProps = {
    title: "",
    titleSize: "text-3xl",
    fullwidth: false,
    itemWidth: 288,
    templates: {},
    className: "",
    context: ""
};