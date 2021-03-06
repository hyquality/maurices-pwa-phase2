import React from "react";
import PropTypes from "prop-types";
import Container from "../../container";
import HeaderTitle from "../header-title";
import Image from "next/image";
import {useRouter} from 'next/router'
import NavList from "@components/templates/nav-list";


export default function Promo({
                                  fullWidth,
                                  paddingTop,
                                  paddingBottom,
                                  top,
                                  title,
                                  text,
                                  icon,
                                  lightMode,
                                  titleColor,
                                  background,
                                  image,
                                  button,
                                  highlight,
                                  nav,
                                  ...props
                              }) {
    const {first, second, "image": backgroundImage} = background || {}
    const router = useRouter()
    const buttonOnClick = (e) => {
        (button && button.url) && router.push(button.url)
    }
    const content = (
        <div className={`${paddingTop && "pt-sectionBT"} ${paddingBottom && "pb-sectionBT"}`}>
            <div className={`relative`}
                 style={{backgroundColor: first ? first : "transparent"}}>
                {
                    backgroundImage && (
                        <div className={"absolute inset-0 z-0"}>
                            <Image
                                src={backgroundImage.src}
                                alt={title}
                                quality={100}
                                layout='fill'
                            />
                        </div>
                    )
                }
                <Container>

                    <div className={"flex flex-col md:flex-row relative"}>
                        {
                            (icon.src && icon.w && icon.h) && (
                                <div className={`hidden md:flex flex-col md:inline pr-12 justify-center`}>
                                    <Image        
                                        alt={title}
                                        src={icon.src}
                                        width={icon.w}
                                        height={icon.h}
                                        quality={100}
                                        className="h-auto"
                                    />
                                </div>
                            )
                        }
                        <div
                            className={`${(image.position!==undefined || image.position === "left") ? "order-2" : "order-1"} ${image.offset ? image.offset : ""} w-full hidden md:block md:w-1/2 flex z-10`}>
                            {
                                (image.src && image.width && image.height) && (
                                    <div className={`flex md:inline p-0 w-full `}>
                                        <Image            
                                            alt={title}
                                            src={image.src}
                                            width={image.width}
                                            height={image.height}
                                            quality={100}
                                            //layout='responsive'
                                            className="h-auto"
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <div
                            className={`${(image.position!==undefined || image.position === "left") ? "order-1" : "order-2"} w-full md:w-1/3 flex items-center py-12 z-10 `}>

                            <div className={"text-center md:text-left md:max-w-md m-auto"}>
                    <span
                        className={`uppercase text-xs md:text-base font-normal tracking-widest md:tracking-widest pb-2 md:pb-5 block  ${lightMode ? "text-white" : "text-gray_4"}`}>{top}</span>
                                <HeaderTitle className={"md:text-4xl"} color={titleColor} tag={"h3"} size={"text-2xl"}
                                             position={"text-center"}
                                             style={"utopia"}
                                             weight={"regular"}>{title}</HeaderTitle>
                                {
                                    text && (
                                        <p className={`${lightMode ? "text-white" : ""} text-xl font-thin pb-7`}>{text}</p>
                                    )
                                }
                                {
                                    (button && button.title) && (
                                        <a className={`${lightMode ? "text-white" : ""} block underline hover:no-underline cursor-pointer mt-4`}
                                           onClick={buttonOnClick}>{button.title}</a>
                                    )
                                }
                                {
                                    (nav && nav.length > 0) && (
                                        <NavList data={nav}
                                                 className={`${lightMode ? "text-white" : ""} link-list-border link_underline position-left`}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </Container>
            </div>
        </div>

    )

    return (
        fullWidth ? (
            <>
                {content}
            </>
        ) : (
            <Container>
                {content}
            </Container>

        )
    )
}

Promo.propTypes = {
    fullWidth: PropTypes.bool,
    paddingTop: PropTypes.bool,
    paddingBottom: PropTypes.bool,
    top: PropTypes.string,
    icon: PropTypes.shape({
        src: PropTypes.string,
        w: PropTypes.number,
        h: PropTypes.number,
        offset: PropTypes.string,
    }),
    title: PropTypes.string,
    text: PropTypes.string,
    titleColor: PropTypes.oneOf([undefined, 'dark-gray', 'gray', 'green', 'red', 'white']),
    background: PropTypes.shape({
        first: PropTypes.string,
        second: PropTypes.string,
        image: PropTypes.shape({
            src: PropTypes.string,
        }),
    }),
    image: PropTypes.shape({
        src: PropTypes.string,
        width: PropTypes.number,
        position: PropTypes.oneOf(['left', 'right']),
        height: PropTypes.number,
        offset: PropTypes.string,
    }),
    nav: PropTypes.any,
    button: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string
    }),
}
Promo.defaultProps = {
    fullWidth: false,
    paddingTop: false,
    paddingBottom: false,
    icon: {},
    top: "A Very Merry Gift Guide",
    title: "",
    titleColor: undefined,
    text: "",
    background: {
        first: "#f2f3f7",
        second: "#dddfe9",
        offset: "",
        image: {
            src: "",
        }
    },
    image: {
        src: "/assets/images/banners/promo/promo1.png",
        width: 400,
        height: 138,
        position: "left"
    },
    nav: {},
    button: {},
    highlight: false,
    highlightColor: "",
    highlightHeight: 0,
};
