import Container from "@components/container";
import React, {useContext, useState} from "react";
import {
    faChevronUp,
    faChevronDown,
    faMapMarkerAlt,
    faUserCircle,
    faShoppingBag
} from "@fortawesome/free-solid-svg-icons";
import {
    faUserCircle as farUserCircle
} from "@fortawesome/free-regular-svg-icons";
import Icon from "@components/templates/icon";
import Link from "next/link";
import {bodyOverlay, openMainMenu} from "@lib/helpers";
import SearchField from "@components/header/search/search-field";
import InstantSearch from "@components/header/search/instant-search";
import CustomerMenu from "@components/header/main-nav/customer-menu";
import MiniCart from "@components/header/mini-cart";
import Button from "@components/templates/button";
import logo from "@public/assets/images/logo.png"
import Image from "next/image";
import {DataProviderContext} from '../layout-data-provider';
import useScreenWidth from "@lib/effects/useScreenWidth";

export default function MiddleBar() {
    const {
        store, cart,user
    } = useContext(DataProviderContext)

    const {firstName,loggedIn} = user.profileInfo || {}

    const {address,title,phone,time,timeOpening} = store || {}

    const isMobile = useScreenWidth();
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => {
        if (!isMobile) {
            bodyOverlay(1).then(r => {
            })
            setIsHovered(true)
        }

    }
    const onMouseLeave = () => {
        bodyOverlay(2).then(r => {
        })
        setIsHovered(false)
    }

    const [isCustomerHovering, setIsCustomerHovering] = useState(false);
    const onCustomerMouseEnter = () => {
        if (!isMobile) {
            bodyOverlay(1).then(r => {
            })
            setIsCustomerHovering(true)
        }

    }
    const onCustomerMouseLeave = () => {
        bodyOverlay(2).then(r => {
        })
        setIsCustomerHovering(false)
    }

    const [isMiniCartHovering, setIsMiniCartHovering] = useState(false);
    const onMiniCartMouseEnter = () => {
        if (!isMobile && cart.cartInfo.items && cart.cartInfo.items.length>0) {
            bodyOverlay(1).then(r => {})
            setIsMiniCartHovering(true)
        }

    }
    const onMiniCartMouseLeave = () => {
        bodyOverlay(2).then(r => {
        })
        setIsMiniCartHovering(false)
    }

    const [instantSearchState, setInstantSearchState] = useState({
        value: "",
        mouseOn: false,
        error: false,
        suggestions: false,
        categories: false,
        searchResult: false
    });

    const onMobileMenuButtonClick = () => {
        openMainMenu(1).then(r => "");
    }
    return (
        <div className="text-sm py-5 bg-white">
            <Container>
                <div className="flex items-center">
                    <div className="block md:hidden pr-5">
                        <a href="#" onClick={onMobileMenuButtonClick}>
                            <Icon icon={["fas", "bars"]} className="w-5"/>
                        </a>
                    </div>
                    <div className="address-item relative pr-5 md:pb-5 md:-mb-5"
                         onMouseEnter={onMouseEnter}
                         onMouseLeave={onMouseLeave}>
                        <a href="#" className="block relative md:pl-5">
                            <Icon icon={faMapMarkerAlt}
                                  className={"md:absolute md:left-0 md:pr-2.5 md:transform " + (address ? "translate-y-2/4" : "top-1/2 -translate-y-2/4")}
                                  size={"medium"}/>

                            <span className="hidden md:inline">

                                {title}
                                {address ? (
                                    isHovering ? (
                                        <Icon icon={faChevronUp} className="pl-2.5" size={"small"}/>
                                    ) : (
                                        <Icon icon={faChevronDown} className="pl-2.5" size={"small"}/>
                                    )
                                ) : null
                                }
                                {
                                    timeOpening ? (
                                        <time className="time block flex items-center"><span
                                            className="w-2 h-2 rounded-xl inline-block bg-green box-content text-xs  mr-2.5"/>{timeOpening}
                                        </time>
                                    ) : null
                                }
                            </span>
                        </a>
                        {
                            !isMobile && (
                                <div className="hidden md:block">
                                    {address ? (
                                        isHovering ? (
                                            <div
                                                className="overlay-fade text-xs absolute border border-gray_border border-solid bg-white w-full min-w-min352 p-5 top-full">
                                                <h3 className="text-xl text-gray_4 font-bold  pb-2.5">{title}</h3>
                                                {
                                                    address ? (
                                                        <p className="pb-2.5"
                                                           dangerouslySetInnerHTML={{__html: address}}/>
                                                    ) : null
                                                }

                                                {
                                                    phone ? (
                                                        <p className="phone pb-2.5">{phone}</p>

                                                    ) : null
                                                }

                                                {
                                                    time ? (
                                                        <time className="pb-2.5"
                                                              dangerouslySetInnerHTML={{__html: time}}/>
                                                    ) : null
                                                }
                                                <Button label={"Change Your Store"} size="small"
                                                        className="mt-5 w-full"/>
                                            </div>
                                        ) : null
                                    ) : null
                                    }
                                </div>
                            )

                        }
                    </div>
                    <div className="logo text-center flex-grow">
                        <Link href="/">
                            <a>
                                <Image
                                    alt=""
                                    src={logo}
                                    width={288}
                                    height={40}
                                    quality={100}
                                />
                            </a>
                        </Link>
                    </div>
                    <ul className="middle-bar-menu flex items-center ml-auto relative md:py-30px md:-my-5">
                        <li className="hidden md:block py-30px -my-30px">
                            <SearchField instantSearchState={instantSearchState}
                                         setInstantSearchState={setInstantSearchState}/>
                        </li>
                        <li className="md:py-30px md:-my-30px"
                            onMouseEnter={onCustomerMouseEnter}
                            onMouseLeave={onCustomerMouseLeave}
                        >

                            {
                                loggedIn ? (
                                    <div>
                                        <a href="#" className="flex items-center">
                                            <Icon icon={faUserCircle} className="md:pr-1.5" size={"medium"}/>
                                            <span className="hidden md:inline">
                                                Hy, {firstName}
                                                {
                                                    isCustomerHovering ? (
                                                        <Icon icon={faChevronUp} className="pl-2.5"/>
                                                    ) : (
                                                        <Icon icon={faChevronDown} className="pl-2.5"/>
                                                    )
                                                }
                                            </span>

                                        </a>
                                        <div className="hidden md:inline">
                                            {isCustomerHovering && (

                                                <div
                                                    className="overlay-fade absolute left-0 border border-gray_border border-solid bg-white min-w-min352 p-5 top-full">
                                                    <CustomerMenu />
                                                </div>

                                            )}
                                        </div>

                                    </div>
                                ) : (
                                    <a href="#">
                                        <Icon icon={farUserCircle}
                                              className="md:pr-1.5" size={"medium"}/>Sign In<Icon
                                        icon={faChevronDown} className="pl-1.5"/></a>
                                )
                            }


                        </li>
                        <li className="md:py-30px md:-my-30px md:ml-0"

                            onMouseEnter={onMiniCartMouseEnter}
                            onMouseLeave={onMiniCartMouseLeave}>
                            <a href="#" className="relative">
                                <Icon icon={faShoppingBag} size={"medium"}/>
                                <span className="block absolute">5</span>
                            </a>
                            {
                                !isMobile && (
                                    <div className="hidden md:block">
                                        {
                                            isMiniCartHovering && (
                                                <MiniCart/>
                                            )
                                        }
                                    </div>
                                )
                            }

                        </li>
                    </ul>
                </div>
                <InstantSearch data={[]} instantSearchState={instantSearchState}
                               setInstantSearchState={setInstantSearchState}/>
            </Container>

        </div>
    )
}