import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import NavList from "../nav-list";
import HeaderTitle from "@components/templates/header-title";
import Carousel from "@components/templates/carousel";
import dynamic from "next/dynamic";
import Container from "@components/container";

export default function SliderBanner({
                                         fullWidth,
                                         paddingTop,
                                         paddingBottom,
                                         top,
                                         title,
                                         titleColor,
                                         text,
                                         highlight,
                                         highlightColor,
                                         highlightHeight,
                                         showCaption,
                                         templates,
                                         background,
                                         className = ""
                                     }) {


    const content = (
        <>
            <div className={`slider-banner relative block md:flex md:-top-12 ${className}`}>
                {
                    (showCaption) && (
                        <div className={`relative w-full md:w-1/4 flex flex-col justify-center pt-5 md:pt-0`}>
                            <div>
                                {
                                    top && (
                                        <span
                                            className={"uppercase text-xs md:text-base font-normal tracking-widest md:tracking-widest pb-2 md:pb-5 block text-gray_4 text-center md:text-left"}>{top}</span>
                                    )
                                }
                                {
                                    title && (
                                        <HeaderTitle
                                            className={"md:text-6xl mb-5 md:mb-0 md:text-left"}
                                            color={titleColor}
                                            tag={"h2"}
                                            size={"text-3xl"}
                                            position={"text-center"}
                                            style={"utopia"}
                                            weight={"regular"}
                                            highlight={highlight}
                                            highlightColor={highlightColor}
                                            highlightHeight={highlightHeight}
                                        >{title}</HeaderTitle>
                                    )
                                }
                                {
                                    text && (
                                        <p className={"hidden md:block pt-4 pb-4 md:pb-0 md:pt-7 text-base md:text-xl w-8/12 md:w-full m-auto"}>{text}</p>
                                    )
                                }
                            </div>


                        </div>
                    )
                }
                <div className={"w-full md:w-3/4"}>
                    <Carousel templates={templates} context={"slider-banner-carousel"} visibleNum={3} showScrollMobile={false} showNavMobile={true} showNav={false}/>
                </div>
            </div>
        </>
    )
    return (
        <div className={`overflow-hidden ${paddingTop && "pt-sectionBT"} ${paddingBottom && "pb-sectionBT"}`}>

            <div
                style={{
                    backgroundColor: `${background ? background : "none"}`
                }}>
                {
                    fullWidth ? (
                        content
                    ) : (
                        <Container>
                            {content}
                        </Container>

                    )
                }
            </div>
        </div>

    )
}
SliderBanner.propTypes = {
    fullWidth: PropTypes.bool,
    paddingTop: PropTypes.bool,
    paddingBottom: PropTypes.bool,
    showCaption: PropTypes.bool,
    top: PropTypes.string,
    title: PropTypes.string,
    titleColor: PropTypes.oneOf([undefined, 'dark-gray', 'gray', 'green', 'red', 'white']),
    text: PropTypes.string,
    highlight: PropTypes.bool,
    highlightColor: PropTypes.string,
    highlightHeight: PropTypes.number,
    templates: PropTypes.any,
    background: PropTypes.string,
}
SliderBanner.defaultProps = {
    fullWidth: true,
    paddingTop: false,
    paddingBottom: false,
    showCaption: true,
    top: "A Very Merry Gift Guide",
    title: "Title",
    titleColor: undefined,
    text: "description",
    highlight: false,
    highlightColor: "",
    highlightHeight: 0,
    templates: {},
    background: ""
};