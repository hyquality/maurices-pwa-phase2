import Link from "next/link";
import React from "react";
import NavList from "@components/templates/nav-list";
import PropTypes from "prop-types";

export default function SimpleTextBanner({
                                             color,
                                             url,
                                             textColor,
                                             label,
                                             title,
                                             subtite,
                                             notation,
                                             nav,
                                             className = ""
                                         }) {
    return (
        <div className={"simple-text-banner text-center " + className}>
            <div className="relative block pt-10 pb-6" style={{backgroundColor: color ? color : ""}}>
                <span className="w-px h-5 absolute left-1/2 -top-2.5"
                      style={{backgroundColor: textColor ? textColor : ""}}/>
                <Link href={url}>
                    <a>
                        {label ? (
                            <span className="block uppercase text-sm-10 font-extrabold text-gray_4">{label}</span>
                        ) : null}
                        {title ? (
                            <span className="block font-black pt-8 text-2xl tracking-widest"
                                  style={{color: textColor ? textColor : ""}}>{title}</span>
                        ) : null}
                        {subtite ? (
                            <span className="block font-bold text-xl"
                                  style={{color: textColor ? textColor : ""}}>{subtite}</span>
                        ) : null}
                        {notation ? (
                            <span className="block text-xs pt-5">{notation}</span>
                        ) : null}
                    </a>
                </Link>
            </div>
            {nav ? (
                <NavList data={nav} className="link-list-border "/>
            ) : null}
        </div>
    )
}
SimpleTextBanner.propTypes = {
    color: PropTypes.string,
    url: PropTypes.string,
    textColor: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    subtite: PropTypes.string,
    notation: PropTypes.string,
    nav: PropTypes.any,
    className: PropTypes.string,
}
SimpleTextBanner.defaultProps = {
    color: "#ff0000",
    url: "#",
    textColor: "#000000",
    label: "label",
    title: "title",
    subtite: "subtite",
    notation: "notation",
    nav: {},
    className: "",
};
