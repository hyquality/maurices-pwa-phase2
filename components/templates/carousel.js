import dynamic from "next/dynamic";
import PropTypes from "prop-types";

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import React, {useEffect, useState} from "react";
import Container from "@components/container";

import SwiperCore, {
    Loop, Navigation, Scrollbar, A11y
} from 'swiper';
import HeaderTitle from "@components/templates/header-title";

// install Swiper modules
SwiperCore.use([Loop, Navigation, Scrollbar, A11y]);

function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

export default function Carousel(
    {
        fullwidth,
        title,
        titleSize,
        visibleNum,
        mobileVisibleNum,
        showScroll,
        showScrollMobile,
        showNav,
        showNavMobile,
        templates,
        context = "",
        className
    }
) {
    let initState = {
        num: visibleNum,
        nav: showNav,
        scroll: showScroll ? {draggable: true} : false,
        space: 32
    }

    if (window.innerWidth < 768) {
        initState = {
            num: mobileVisibleNum,
            nav: showNavMobile,
            scroll: showScrollMobile ? {draggable: true} : false,
            space: 4
        }
    }
    const [slides, setSlides] = useState(initState);


    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            if (window.innerWidth < 768) {
                setSlides(
                    {
                        num: mobileVisibleNum,
                        nav: showNavMobile,
                        scroll: showScrollMobile ? {draggable: true} : false,
                        space: 4
                    }
                )
            } else {
                setSlides(
                    {
                        num: visibleNum,
                        nav: showNav,
                        scroll: showScroll ? {draggable: true} : false,
                        space: 32
                    }
                )
            }
        }, 1000)

        window.addEventListener('resize', debouncedHandleResize)
        return function cleanup() {
            window.removeEventListener('resize', debouncedHandleResize)
        };
    });

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
                spaceBetween={slides.space}
                slidesPerView={slides.num}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={false}
                navigation
                scrollbar={slides.scroll}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
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
                }
            </Swiper>
        </>
    )
    return (
        <div className={`carousel-list ${!slides.nav&&"hide-nav"}`}>
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
    title: "",
    titleSize: "text-3xl",
    visibleNum: 4,
    mobileVisibleNum: 1,
    templates: []
};