import React from "react";
import PropTypes from "prop-types";
import Container from "@components/container";
import HeaderTitle from "@components/templates/header-title";
import Image from "next/image";
import Button from "@components/templates/button";
import {useRouter} from 'next/router'


export default function Hero({
                                 fullwidth,
                                 paddingTop,
                                 paddingBottom,
                                 top,
                                 title,
                                 titleColor,
                                 text,
                                 background,
                                 image,
                                 button,
                                 highlight,
                                 highlightColor,
                                 highlightHeight,
                                 ...props
                             }) {
    const {first, second} = background || {}
    const router = useRouter()
    const buttonOnClick = (e) => {
        (button && button.url) && router.push(button.url)
    }
    const content = (
        <div className={`flex flex-col md:flex-row relative ${paddingTop && "pt-sectionBT"} ${paddingBottom && "pb-sectionBT"}`} style={{backgroundColor: first ? first : ""}}>
            <div className={"w-full md:w-1/2 flex order-2 md:order-1"}>
                {
                    image && (
                        <div className={"flex md:inline-block px-10"}>
                            <Image
                                alt={title}
                                src={image.src?image.src:image}
                                width={690}
                                height={700}
                                quality={100}
                                className="h-auto "
                            />
                        </div>
                    )
                }
            </div>
            <div className={"w-full md:w-1/3 flex items-center order-1 md:order-2 pt-7 md:pt-0"}>
                <div className={"text-center md:max-w-md m-auto"}>
                    <span
                        className={"uppercase text-xs md:text-base font-normal tracking-widest md:tracking-widest pb-4 md:pb-10 block text-gray_4"}>{top}</span>
                    <HeaderTitle className={"md:text-7xl"} color={titleColor} tag={"h2"} size={"text-3xl"}
                                 position={"text-center"} style={"utopia"}
                                 weight={"regular"} highlight={highlight} highlightColor={highlightColor}
                                 highlightHeight={highlightHeight}>{title}</HeaderTitle>
                    <p className={"pt-4 pb-4 md:pb-0 md:pt-7 text-base md:text-xl w-8/12 md:w-full m-auto"}>{text}</p>
                    {
                        button && (
                            <div
                                className="flex justify-center pt-12 absolute bottom-10 w-full md:bottom-auto md:w-auto  md:relative left-0">
                                <Button label={button.title} size={"medium"} color={"gray_2"} onClick={buttonOnClick}
                                        className={"w-11/12 md:w-auto text-sm tracking-widest font-normal"}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )

    return (
        <div className={"hero-banner"}>
            {
                fullwidth ? (
                    <>
                        {content}
                    </>
                ) : (
                    <Container>
                        {content}
                    </Container>

                )
            }

        </div>
    )
}

Hero.propTypes = {
    fullwidth: PropTypes.bool,
    paddingTop: PropTypes.bool,
    paddingBottom: PropTypes.bool,
    top: PropTypes.string,
    title: PropTypes.string,
    titleColor: PropTypes.oneOf([undefined, 'dark-gray', 'gray', 'green', 'red', 'white']),
    text: PropTypes.string,
    background: PropTypes.shape({
        first: PropTypes.string.isRequired,
        second: PropTypes.string
    }),
    image:PropTypes.shape({
        src: PropTypes.string.isRequired
    }),
    button: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
    highlight: PropTypes.bool,
    highlightColor: PropTypes.string,
    highlightHeight: PropTypes.number,
}
Hero.defaultProps = {
    fullwidth: true,
    paddingTop: false,
    paddingBottom: false,
    top: "A Very Merry Gift Guide",
    title: "Title",
    titleColor: undefined,
    text: "description",
    background: {
        first: "#f2f3f7",
        second: "#dddfe9"
    },
    image: {
        src:""
    },
    button: {
        title: "Button",
        url: "#"
    },
    highlight: false,
    highlightColor: "",
    highlightHeight: 0,
};
