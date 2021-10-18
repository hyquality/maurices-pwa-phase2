import dynamic from "next/dynamic";
import PropTypes from "prop-types";

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import React, {useEffect, useState} from "react";
import Container from "@components/container";

import SwiperCore, {
    Navigation,Scrollbar,A11y
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation,Scrollbar,A11y ]);
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

export default function Carousel({fullwidth,title, templates, context = "", className}) {
    const [slides, setSlides] = useState({num:4, scroll:{ draggable: true }});
    useEffect(() => {
        function handleResize() {

        }
        window.addEventListener('resize', handleResize)

        const debouncedHandleResize = debounce(function handleResize() {
            if(window.innerWidth<768){
                setSlides({num:1, scroll:false})
            } else {
                setSlides({num:4, scroll:{ draggable: true }})
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
            {title}
            <Swiper
                spaceBetween={20}
                slidesPerView={slides.num}
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
                                <div className={`${template.class ? template.class + "" : ""} ${className}`}>

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
        <div className={"carousel-list"}>
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
    templates: PropTypes.any

}
Carousel.defaultProps = {
    templates: []
};