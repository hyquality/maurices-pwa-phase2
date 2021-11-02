import dynamic from "next/dynamic";
import PropTypes from "prop-types";

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import React, {useEffect, useState} from "react";
import Container from "@components/container";
import useScreenWidth from "@lib/effects/useScreenWidth"

import SwiperCore, {
    Loop, Navigation, Scrollbar, A11y
} from 'swiper';
import HeaderTitle from "@components/templates/header-title";

// install Swiper modules
SwiperCore.use([Loop, Navigation, Scrollbar, A11y]);

export default function Carousel(
    {
        fullwidth,
        title,
        titleSize,
        visibleNum,
        mobileVisibleNum,
        showScroll,
        showScrollMobile,
        spaceBetween,
        loop,
        showNav,
        showNavMobile,
        templates,
        context = "",
        className
    }
) {

    const isMobile = useScreenWidth();
    let TemplateItem;
    const content = (
        <>

            {
                title && (
                    <HeaderTitle tag={"h2"} size={titleSize} style={"utopia"}
                                 className={"pb-7 text-center md:text-left"}>{title}</HeaderTitle>
                )
            }
            <Swiper
                spaceBetween={isMobile?4:spaceBetween}
                slidesPerView={isMobile?mobileVisibleNum:visibleNum}
                slidesPerGroup={1}
                loop={loop}
                loopFillGroupWithBlank={false}
                navigation
                scrollbar={isMobile?(showScrollMobile ? {draggable: true} : false):showScroll ? {draggable: true} : false}
            >
                {
                    (templates && Array.isArray(templates)) && (
                        templates.map((template, index) => {

                            TemplateItem = dynamic(import(template.path + ''))
                            let dynamicProps = template.data;
                            return (
                                <SwiperSlide key={`dyn-carousel-${context}-${template.path}-${index}`}>
                                    <div className={`pb-10 ${template.class ? template.class + "" : ""} ${className}`}>

                                        <TemplateItem {...dynamicProps} />
                                    </div>
                                </SwiperSlide>


                            )
                        })
                    )

                }
            </Swiper>
        </>
    )
    return (
        <div className={`carousel-list ${!(isMobile?showNavMobile:showNav)&&"hide-nav"}`}>
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
Carousel.propTypes = {
    fullwidth: PropTypes.bool,
    paddingTop: PropTypes.bool,
    paddingBottom: PropTypes.bool,
    showScroll: PropTypes.bool,
    showScrollMobile: PropTypes.bool,
    spaceBetween: PropTypes.number,
    loop: PropTypes.bool,
    showNav: PropTypes.bool,
    showNavMobile: PropTypes.bool,
    title: PropTypes.string,
    titleSize: PropTypes.oneOf(['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl']),
    visibleNum: PropTypes.number,
    mobileVisibleNum: PropTypes.number,
    templates: PropTypes.any

}
Carousel.defaultProps = {
    fullwidth: false,
    paddingTop: false,
    paddingBottom: false,
    showScroll: true,
    showScrollMobile: true,
    showNav: true,
    showNavMobile: true,
    spaceBetween: 32,
    loop:true,
    title: "",
    titleSize: "text-3xl",
    visibleNum: 4,
    mobileVisibleNum: 1,
    templates: []
};