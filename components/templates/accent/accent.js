import Link from "next/link";
import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import NavList from "@components/templates/nav-list";

export default function Accent({
                                   url,
                                   nav,
                                   title,
                                   description,
                                   showCaption,
                                   image,
                                   size,
                                   w,
                                   h,
                                   x,
                                   className = ""
                               }) {
    return (
        <div className={`accent-banner relative text-center ${className}`}>
            <div className={"relative z-0 pb-7"}>
                <Image
                    alt={title}
                    src={image}
                    width={w ? w : 300}
                    height={h ? h : 300}
                    quality={100}
                />
            </div>
            {
                (showCaption) && (
                    <div className={`relative caption  z-10`}>
                        {
                            title && (
                                <h3 className={`${size} font-utopia `}>{title}</h3>
                            )
                        }
                        {
                            description && (
                                <p className={"py-3 text-sm md:text-base"}>{description}</p>
                            )
                        }
                        {
                            (nav && nav.length > 0) && (
                                <NavList data={nav} className="link-list-border"/>
                            )
                        }
                    </div>
                )
            }


        </div>
    )
}
Accent.propTypes = {
    url: PropTypes.string,
    nav: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string,
    showCaption: PropTypes.bool,
    image: PropTypes.string.isRequired,
    w: PropTypes.number,
    h: PropTypes.number,
    x: PropTypes.oneOf(['center', 'left', 'right']),
    className: PropTypes.string,
    size: PropTypes.oneOf(['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl']),
}
Accent.defaultProps = {
    url: "",
    nav: {},
    title: "",
    description: "",
    showCaption: true,
    image: "image",
    w: 50,
    h: 50,
    x: "center",
    y: "center",
    className: "PropTypes.string",
    size: "text-4xl"
};