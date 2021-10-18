import React from "react";
import PropTypes from "prop-types";
import Container from "../../container";
import HeaderTitle from "../header-title";
import Image from "next/image";
import {useRouter} from 'next/router'

export default function Promo({
                                  fullwidth,
                                  top,
                                  title,
                                    lightMode,
                                  titleColor,
                                  background,
                                  backgroundImage,
                                  image,
                                  button,
                                  ...props
                              }) {
    const {first, second} = background || {}
    const router = useRouter()
    const buttonOnClick = (e) => {
        (button && button.url) && router.push(button.url)
    }
    const content = (
        <div className={"flex flex-col md:flex-row relative  mt-20"} style={{backgroundColor: first ? first : "transparent"}}>
            {
                backgroundImage && (
                    <div className={"absolute inset-0 z-0"}>
                        <Image
                            src={backgroundImage}
                            quality={100}
                            layout='fill'
                        />
                    </div>
                )
            }
            <div className={"w-full hidden md:block md:w-1/2 flex order-2 md:order-1 z-10 -mt-5"}>
                {
                    image && (
                        <div className={"flex md:inline p-0 w-full"}>
                            <Image
                                alt={title}
                                src={image}
                                width={400}
                                height={138}
                                quality={100}
                                layout='responsive'
                                className="h-auto"
                            />
                        </div>
                    )
                }
            </div>
            <div className={"w-full md:w-1/3 flex items-center order-1 md:order-2  py-12 z-10 "}>
                <div className={"text-center md:text-left md:max-w-md m-auto"}>
                    <span
                        className={`uppercase text-xs md:text-base font-normal tracking-widest md:tracking-widest pb-2 md:pb-5 block  ${lightMode?"text-white":"text-gray_4"}`}>{top}</span>
                    <HeaderTitle className={"md:text-4xl"} color={titleColor} tag={"h3"} size={"text-2xl"} position={"text-center"}
                                 style={"utopia"}
                                 weight={"regular"}>{title}</HeaderTitle>
                    {
                        button && (
                            <a className={`${lightMode?"text-white":""} block underline hover:no-underline cursor-pointer mt-4`} onClick={buttonOnClick}>{button.title}</a>
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

Promo.propTypes = {
    fullwidth: PropTypes.bool,
    top: PropTypes.string,
    title: PropTypes.string,
    titleColor: PropTypes.oneOf([undefined, 'dark-gray', 'gray', 'green', 'red', 'white']),
    background: PropTypes.shape({
        first: PropTypes.string,
        second: PropTypes.string,
    }),
    backgroundImage: PropTypes.string,
    image: PropTypes.string,
    button: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
}
Promo.defaultProps = {
    fullwidth: true,
    top: "A Very Merry Gift Guide",
    title: "Title",
    titleColor: undefined,
    text: "description",
    background: {
        first: "#f2f3f7",
        second: "#dddfe9"
    },
    backgroundImage: "/assets/images/banners/hero/hero1.png",
    image: "/assets/images/banners/hero/hero1.png",
    button: false,
    highlight: false,
    highlightColor: "",
    highlightHeight: 0,
};
