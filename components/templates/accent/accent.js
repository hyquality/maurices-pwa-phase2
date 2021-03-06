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
                                   width,
                                   height,
                                   positionX,
                                   className = ""
                               }) {


    const sizeData = {
        "text-2xl": {
            p:"pt-3"
        },
        "text-4xl": {
              p:"pt-5"
        },
    }
    const onClick =(e)=> {
        console.log(url)
    }
    return (
        <div className={`accent-banner relative  ${className} position-${positionX}`}>
            <div className={"relative z-0"}>
                <a onClick={onClick} className={`${url&&"cursor-pointer"}`}>
                    <Image
                        
                        alt={title}
                        src={image}
                        width={width ? width : 300}
                        height={height ? height : 300}
                        quality={100}
                    />
                </a>

            </div>
            {
                (showCaption) && (
                    <div className={`relative caption  z-10`}>
                        {
                            (title && title!=="") && (
                                <h3 className={`${size} font-utopia dark:text-white ${sizeData[size]?sizeData[size].p:"pt-7"}`}>{title}</h3>
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
    width: PropTypes.number,
    height: PropTypes.number,
    positionX: PropTypes.oneOf(['center', 'left', 'right']),
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
    width: 50,
    height: 50,
    positionX: "center",
    className: "PropTypes.string",
    size: "text-4xl"
};