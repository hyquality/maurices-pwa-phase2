import Link from "next/link";
import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

export default function SimpleBanner({url, label, title, showCaption, image, size, w, h, x, y, className = ""}) {
    return (
        <div className={`simple-banner relative text-center ${className}`}>
            <Link href={url}>
                <a className={"relative z-0"}>
                    <Image
                        alt={title}
                        src={image}
                        width={w ? w : 72}
                        height={h ? h : 64}
                        quality={100}
                    />
                </a>
            </Link>
            {
                (showCaption && (title || (url && label))) && (
                    <div className={`absolute caption  z-10 sb-x-${x} sb-y-${y}`}>
                        {
                            title && (
                                <h3 className={size}>{title}</h3>
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
    showCaption: PropTypes.bool,
    image: PropTypes.string.isRequired,
    w: PropTypes.number,
    h: PropTypes.number,
    x: PropTypes.oneOf(['center', 'left', 'right']),
    y: PropTypes.oneOf(['center', 'top', 'bottom']),
    className: PropTypes.string,
    size: PropTypes.oneOf(['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl']),
}
SimpleBanner.defaultProps = {
    url: "",
    label: "",
    title: "",
    showCaption: false,
    image: "image",
    w: 50,
    h: 50,
    x: "center",
    y: "center",
    className: "PropTypes.string",
    size: "text-4xl"
};