import Link from 'next/link'
import Icon from "../icon";
import React, {useState} from "react";
import SimpleBanner from "./banner/simple-banner";
import Template from "./template";


export default function NavList({data, className}) {
    const [activeElement, setActiveElement] = useState(false);
    const onNavRootElementClick = (event) => {
        //event.preventDefault()
        let element = event.target;
        if(element.tagName==="SPAN"){
            element = element.parentNode;
        }
        console.log(element.tagName)
        element.className="active"
        setActiveElement(element)

    }
    const onNavCloseMegaElementClick =  (event) => {
        if(activeElement){
            activeElement.className=""
            setActiveElement(false)
        }

    }
    return (
        <ul className={className ? className + "" : ""}>
            {
                data ? (
                    data.map((link,index) => (
                        <li key={className + "-" + index}>
                            {link.url?(
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

                                        {link.mega ? (
                                            <Icon icon={["fas","chevron-right"]}/>
                                        ) : ("")}
                                    </a>
                                </Link>
                            ):(
                                <a onClick={onNavRootElementClick} onTouchStart={onNavRootElementClick}  className="cursor-pointer" >
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
                            )

                            }

                            {link.mega ? (
                                <div className="megamenu">
                                    <div className="top">
                                        <a href="#" onClick={onNavCloseMegaElementClick} onTouchStart={onNavCloseMegaElementClick}>
                                            <Icon icon={["fas","chevron-left"]} className="block"/>
                                        </a>
                                        <span> {link.text}</span>
                                    </div>
                                    <div className="megamenu-content">
                                        {
                                            link.mega.map((item,itemIndex) => (
                                                <div className={"nav-megamenu-wrapper"} key={"nav-megamenu-wrapper" + itemIndex}>
                                                    {
                                                        item.nav && (
                                                            <div className="nav-megamenu-wrapper-submenu" key={"nav-megamenu-nav" + itemIndex}>
                                                                <NavList data={item.nav}
                                                                         className={"nav-megamenu-nav-submenu-" + item.id}/>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        item.banner && (
                                                            <div key={"nav-megamenu-banner" + itemIndex}>
                                                                <SimpleBanner {...item.banner}/>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        item.template && (
                                                            <div>
                                                                <Template template={item.template}/>
                                                            </div>
                                                        )
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