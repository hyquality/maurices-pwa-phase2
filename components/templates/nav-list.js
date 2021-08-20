import Link from 'next/link'
import Icon from "@components/icon";
import React, {useState} from "react";
import SimpleBanner from "@components/templates/banner/simple-banner";
import Template from "@components/templates/template";


export default function NavList({data, className}) {
    const [activeElement, setActiveElement] = useState(false);
    const onNavRootElementClick = async (event) => {
        event.target.className="active";
        setActiveElement(event.target);
        //console.log(event);
    }
    const onNavCloseMegaElementClick = async (event) => {
        if(setActiveElement){
            activeElement.className="";
            setActiveElement(false);
        }

    }
    return (
        <ul className={className ? className + "" : ""}>
            {
                data ? (
                    data.map((link) => (
                        <li key={className + "-" + link.id}>
                            <Link href={link.url}>
                                <a onClick={onNavRootElementClick}>
                                    {
                                        link.icon ? (
                                            <Icon icon={link.icon}/>
                                        ) : ("")
                                    }
                                    <span> {link.text}</span>
                                    {link.caption ? (
                                        <span className="caption">{link.caption}</span>) : ("")}

                                    {link.mega ? (
                                        <Icon icon={["fas","chevron-right"]}/>
                                        ) : ("")}
                                </a>
                            </Link>
                            {link.mega ? (
                                <div className="megamenu">
                                    <div className="top">
                                        <a href="#" onClick={onNavCloseMegaElementClick}>
                                            <Icon icon={["fas","chevron-left"]} className="block"/>
                                        </a>
                                        <span> {link.text}</span>
                                    </div>
                                    <div className="megamenu-content">
                                        {
                                            link.mega.map((item) => (
                                                <div className={"nav-megamenu-wrapper"} key={"nav-megamenu-wrapper" + item.id}>
                                                    {
                                                        item.nav ? (
                                                            <div className="nav-megamenu-wrapper-submenu" key={"nav-megamenu-nav" + item.id}>
                                                                <NavList data={item.nav}
                                                                         className={"nav-megamenu-nav-submenu-" + item.id}/>
                                                            </div>
                                                        ) : ("")
                                                    }
                                                    {
                                                        item.banner ? (
                                                            <div key={"nav-megamenu-banner" + item.id}>
                                                                <SimpleBanner data={item.banner}/>
                                                            </div>
                                                        ) : ("")
                                                    }
                                                    {
                                                        item.template ? (
                                                            <div>
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