import Link from "next/link";
import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import HeaderTitle from "@components/templates/header-title";


export default function SimpleBanner({
                                         url,
                                         label,
                                         title,
                                         titleColor,
                                         titleTextAlign,
                                         size,
                                         style,
                                         showCaption,
                                         image,
                                         width,
                                         height,
                                         positionX,
                                         positionY,
                                         className = ""
                                     }) {
    return (
        <div className={`simple-banner relative text-center ${className}`} style={{maxWidth: width?width+"px":"none"}}>
            <Link href={url}>
                <a className={"relative flex z-0"}>
                    <Image
                        
                        alt={title}
                        src={image}
                        width={width ? width : 72}
                        height={height ? height : 64}
                        quality={100}
                    />
                </a>
            </Link>
            {
                (showCaption && (title || (url && label))) && (
                    <div className={`absolute caption  z-10 sb-x-${positionX} sb-y-${positionY}`}>
                        {
                            title && (
                                /* <h3 className={`px-6 ${size}`}>{title}</h3>*/
                                <HeaderTitle size={size} position={`text-${titleTextAlign}`} tag={"h3"}
                                             className={`px-6`}
                                             style={style} color={titleColor}>{title}</HeaderTitle>
                            )
                        }
                        {
                            (url && label) && (
                                <Link href={url}>
                                    <a>{label}</a>
                                </Link>
                            )
                        }
                    </div>
                )
            }


        </div>
    )
}
SimpleBanner.propTypes = {
    url: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    style: PropTypes.oneOf(['normal', 'utopia']),
    titleColor: PropTypes.oneOf([undefined, 'dark-gray', 'gray', 'green', 'red', 'white']),
    titleTextAlign: PropTypes.oneOf(['center', 'left', 'right']),
    showCaption: PropTypes.bool,
    image: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    positionX: PropTypes.oneOf(['center', 'left', 'right']),
    positionY: PropTypes.oneOf(['center', 'top', 'bottom']),
    className: PropTypes.string,
    size: PropTypes.oneOf(['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl']),
}
SimpleBanner.defaultProps = {
    url: "",
    label: "",
    title: "",
    style: "normal",
    titleTextAlign: "center",
    titleColor: undefined,
    showCaption: false,
    image: "image",
    width: 50,
    height: 50,
    positionX: "center",
    positionY: "center",
    className: "PropTypes.string",
    size: "text-4xl"
};