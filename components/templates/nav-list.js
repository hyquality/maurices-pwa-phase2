import Link from 'next/link'
import Icon from "@components/icon";
import React from "react";
import SimpleBanner from "@components/templates/banner/simple-banner";
import Template from "@components/templates/template";

export default function NavList({data, className}) {
    return (
        <ul className={className ? className + "" : ""}>
            {
                data ? (
                    data.map((link) => (
                        <li key={className + "-" + link.id}>
                            <Link href={link.url}>
                                <a>
                                    {
                                        link.icon ? (
                                            <Icon icon={link.icon}/>
                                        ) : ("")
                                    }
                                    <span> {link.text}</span>
                                    {link.caption ? (
                                        <span className="caption">{link.caption}</span>) : ("")}
                                </a>
                            </Link>
                            {link.mega ? (
                                <div className="megamenu absolute hidden bg-white w-full left-0 top-full z-10 p-5">
                                    <div className="flex justify-center mx-auto">
                                        {
                                            link.mega.map((item) => (
                                                <div key={"nav-megamenu-wrapper" + item.id}>
                                                    {
                                                        item.nav ? (
                                                            <div key={"nav-megamenu-nav" + item.id} className="flex-1">
                                                                <NavList data={item.nav}
                                                                         className={"nav-megamenu-nav-submenu-" + item.id}/>
                                                            </div>
                                                        ) : ("")
                                                    }
                                                    {
                                                        item.banner ? (
                                                            <div key={"nav-megamenu-banner" + item.id}
                                                                 className="flex-1">
                                                                <SimpleBanner data={item.banner}/>
                                                            </div>
                                                        ) : ("")
                                                    }
                                                    {
                                                        item.template ? (
                                                            <div className="flex-1">
                                                                <Template template={item.template}/>
                                                            </div>
                                                        ) : ("")
                                                    }
                                                </div>

                                            ))
                                        }
                                    </div>

                                </div>
                            ) : ("")}
                        </li>
                    ))
                ) : ("")
            }

        </ul>
    )
}