import Container from "@components/container";
import React, {useState} from "react";
import {
    faChevronUp,
    faChevronDown,
    faMapMarkerAlt,
    faSearch,
    faUserCircle,
    faShoppingBag
} from "@fortawesome/free-solid-svg-icons";
import {
    faUserCircle as farUserCircle
} from "@fortawesome/free-regular-svg-icons";
import Icon from "@components/icon";
import Link from "next/link";
import Templates from "@components/templates/templates";
import NavList from "@components/templates/nav-list";
import {bodyOverlay} from "../../lib/helpers";
import SearchField from "@components/header/search/search-field";

export default function MiddleBar({data, customer}) {
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => {
        bodyOverlay().then(r => {
        })
        setIsHovered(true)
    }
    const onMouseLeave = () => {
        bodyOverlay().then(r => {
        })
        setIsHovered(false)
    }

    const [isCustomerHovering, setIsCustomerHovering] = useState(false);
    const onCustomerMouseEnter = () => {
        bodyOverlay().then(r => {
        })
        setIsCustomerHovering(true)
    }
    const onCustomerMouseLeave = () => {
        bodyOverlay().then(r => {
        })
        setIsCustomerHovering(false)
    }


    return (
        <div className="text-sm py-5 bg-white">
            <Container>
                <div className="flex items-center">
                    <div className="address-item relative pb-5 -mb-5"
                         onMouseEnter={onMouseEnter}
                         onMouseLeave={onMouseLeave}>
                        <a href="#" className="block relative pl-5">
                            <Icon icon={faMapMarkerAlt}
                                  className={"absolute left-0 pr-2.5 transform " + (data.address ? "translate-y-2/4" : "top-1/2 -translate-y-2/4")}/>
                            {data.title}
                            {data.address ? (
                                isHovering ? (
                                    <Icon icon={faChevronUp} className="pl-2.5"/>
                                ) : (
                                    <Icon icon={faChevronDown} className="pl-2.5"/>
                                )
                            ) : (
                                ""
                            )}

                            {data.timeOpening ? (
                                <time className="time block flex items-center"><span
                                    className="w-2 h-2 rounded-xl inline-block bg-green box-content text-xs  mr-2.5"/>{data.timeOpening}
                                </time>
                            ) : (
                                ""
                            )}

                        </a>
                        {data.address ? (
                            isHovering ? (
                                <div
                                    className="overlay-fade text-xs absolute border border-gray_border border-solid bg-white w-full min-w-min352 p-5 top-full">
                                    <h3 className="text-xl text-gray_4 font-bold  pb-2.5">{data.title}</h3>
                                    {
                                        data.address ? (
                                            <p className="pb-2.5" dangerouslySetInnerHTML={{__html: data.address}}/>
                                        ) : (
                                            ""
                                        )
                                    }

                                    {
                                        data.phone ? (
                                            <p className="phone pb-2.5">{data.phone}</p>

                                        ) : (
                                            ""
                                        )
                                    }

                                    {
                                        data.time ? (
                                            <time className="pb-2.5" dangerouslySetInnerHTML={{__html: data.time}}/>
                                        ) : (
                                            ""
                                        )
                                    }
                                    <button className="btn">Change Your Store</button>
                                </div>
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}


                    </div>
                    <div className="logo absolute left-1/2 transform -translate-x-2/4 max-w-logo-width">
                        <Link href="/">
                            <a><img src="assets/images/logo.png"/></a>
                        </Link>
                    </div>
                    <ul className="middle-bar-menu flex ml-auto relative py-30px -my-5">
                        <li><SearchField/></li>
                        <li
                            onMouseEnter={onCustomerMouseEnter}
                            onMouseLeave={onCustomerMouseLeave}
                        >

                            {
                                customer.nav ? (
                                    <>
                                        <a href="#"
                                        ><Icon icon={faUserCircle} className="pr-1.5"/>{customer.title}
                                            {
                                                isCustomerHovering ? (
                                                    <Icon icon={faChevronUp} className="pl-2.5"/>
                                                ) : (
                                                    <Icon icon={faChevronDown} className="pl-2.5"/>
                                                )
                                            }
                                        </a>
                                        {isCustomerHovering ? (

                                            <div
                                                className="overlay-fade absolute left-0 border border-gray_border border-solid bg-white min-w-min352 p-5 top-full">
                                                <NavList data={customer.nav} className={"customer-header-menu left-0"}/>

                                                {customer.templates ? (
                                                    <Templates templates={customer.templates}/>
                                                ) : ("")}
                                                <button className="btn">SIGN OUT</button>
                                            </div>

                                        ) : ("")}
                                    </>
                                ) : (
                                    <a href="#"><Icon icon={farUserCircle} className="pr-1.5"/>{customer.title}<Icon
                                        icon={faChevronDown} className="pl-1.5"/></a>
                                )
                            }


                        </li>
                        <li>
                            <a href="#"><Icon icon={faShoppingBag} className="pr-1.5"/>5</a>
                        </li>
                    </ul>
                </div>
            </Container>

        </div>
    )
}