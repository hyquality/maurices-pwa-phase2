import NavList from "@components/templates/nav-list";
import Link from "next/link";
import Icon from "@components/icon";
import React, {useState} from "react";
import {openMainMenu} from "../../lib/helpers";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import Templates from "@components/templates/templates";

const onMobileMenuButtonClick = () => {
    openMainMenu(2).then(r => "");
}
export default function Nav({data, customer, store}) {
    const [activeElement, setActiveElement] = useState(false);
    const onNavRootElementClick = (event) => {
        //event.preventDefault()
        let element = event.target;
        if(element.tagName==="SPAN"){
            element = element.parentNode;
        }
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
        <nav className="main-navigation-wrapper">
            <div className="md:hidden py-4 px-5 text-gray_2 flex items-center">
                <Link href={"/"}>
                    <a className="flex items-center" onClick={onMobileMenuButtonClick}><Icon icon={["fas", "home"]}
                                                                                             className="w-5 pr-4 block"/> Home</a>
                </Link>
                <a href="#" className="ml-auto" onClick={onMobileMenuButtonClick}>
                    <Icon icon={["fas", "times"]} className="w-4 block"/>
                </a>
            </div>
            <NavList data={data} className={"nav main-navigation"}/>
            <div className="md:hidden mt-5">
                <ul className="nav main-navigation">
                    {
                        customer.nav ? (
                        <li>
                            <a href="#" onClick={onNavRootElementClick} onTouchStart={onNavRootElementClick} >
                                <span><Icon icon={["fa", "user-circle"]} className="pr-2.5 w-4 ml-0"/></span>
                                <span className="normal-case font-semibold"> {customer.title}</span>
                                <Icon icon={["fas","chevron-right"]}/>
                            </a>
                            <div className="megamenu">
                                <div className="top">
                                    <a href="#" onClick={onNavCloseMegaElementClick} onTouchStart={onNavCloseMegaElementClick}>
                                        <Icon icon={["fas","chevron-left"]} className="block"/>
                                    </a>
                                    <span>My Account</span>
                                </div>
                                <div className="megamenu-content">
                                    <div className={"nav-megamenu-wrapper"}>
                                        <div className="nav-megamenu-wrapper-submenu">
                                            <div>
                                                <NavList data={customer.nav}
                                                         className={"customer-header-menu left-0"}/>

                                                {customer.templates ? (
                                                    <Templates templates={customer.templates}/>
                                                ) : ("")}
                                                <button className="btn btn-mobile">SIGN OUT</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                    ):("")}
                    {
                        store.address ? (
                            <li>
                                <a href="#" onClick={onNavRootElementClick} onTouchStart={onNavRootElementClick} >
                                    <span><Icon icon={["fa", "map-marker-alt"]} className="pr-2.5 w-4 ml-0"/></span>
                                    <span className="truncate block w-4/5 normal-case font-semibold"> {store.title}</span>
                                    <Icon icon={["fas","chevron-right"]}/>
                                </a>
                                <div className="megamenu">
                                    <div className="top">
                                        <a href="#" onClick={onNavCloseMegaElementClick} onTouchStart={onNavCloseMegaElementClick}>
                                            <Icon icon={["fas","chevron-left"]} className="block"/>
                                        </a>
                                        <span> My Store</span>
                                    </div>
                                    <div className="megamenu-content">
                                        <div className={"nav-megamenu-wrapper"}>
                                            <div className="nav-megamenu-wrapper-submenu">
                                                <div
                                                    className="pt-5">
                                                    <h3 className="text-sm text-gray_4 font-extrabold">{store.title}</h3>
                                                    {store.timeOpening ? (
                                                        <time className="time block flex items-center text-gray_5 text-xs"><span
                                                            className="w-2 h-2 rounded-xl inline-block bg-green box-content text-xs  mr-2.5"/>{store.timeOpening}
                                                        </time>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {
                                                        store.address ? (
                                                            <p className="pt-5 pb-2.5 text-sm" dangerouslySetInnerHTML={{__html: store.address}}/>
                                                        ) : (
                                                            ""
                                                        )
                                                    }

                                                    {
                                                        store.phone ? (
                                                            <p className="phone pb-2.5 text-sm">{store.phone}</p>

                                                        ) : (
                                                            ""
                                                        )
                                                    }

                                                    {
                                                        store.time ? (
                                                            <time className="pb-2.5 text-sm" dangerouslySetInnerHTML={{__html: store.time}}/>
                                                        ) : (
                                                            ""
                                                        )
                                                    }
                                                    <button className="btn btn-mobile">Change Your Store</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        ):("")}
                </ul>
            </div>
        </nav>
    )
}