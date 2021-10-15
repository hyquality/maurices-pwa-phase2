import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import NavList from "../nav-list";

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
        <div className={`accent-banner relative  ${className} position-${x}`}>
            <div className={"relative z-0"}>
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
                            (title && title!=="") && (
                                <h3 className={`${size} font-utopia dark:text-white pt-7`}>{title}</h3>
                            )
                        }
                        {
                            description && (
                                <p className={"py-3 text-sm md:text-base dark:text-white"}>{description}</p>
                            )
                        }
                        {
                            (nav && nav.length > 0) && (
                                <NavList data={nav} className="link-list-border dark:text-white"/>
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
    className: "PropTypes.string",
    size: "text-4xl"
};