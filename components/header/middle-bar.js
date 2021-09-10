import Container from "@components/container";
import React, {useState} from "react";
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
import Icon from "@components/icon";
import Link from "next/link";
import {bodyOverlay, getCurrentWidth, openMainMenu} from "../../lib/helpers";
import SearchField from "@components/header/search/search-field";
import InstantSearch from "@components/header/search/instant-search";
import CustomerMenu from "@components/header/main-nav/customer-menu";
import MiniCart from "@components/header/mini-cart";
import {MOBILE_BREAKPOINT} from "@lib/constants";

export default function MiddleBar({store, customer, minicart}) {

    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => {
        if(getCurrentWidth() > MOBILE_BREAKPOINT){
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
        if(getCurrentWidth() > MOBILE_BREAKPOINT){
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
        if(getCurrentWidth() > MOBILE_BREAKPOINT){
            bodyOverlay(1).then(r => {
            })
            setIsMiniCartHovering(true)
        }

    }
    const onMiniCartMouseLeave = () => {
        bodyOverlay(2).then(r => {
        })
        setIsMiniCartHovering(false)
    }

    const [instantSearchState, setInstantSearchState] = useState({
        value: false,
        mouseOn: false,
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
                                  className={"w-5 md:w-4 md:absolute md:left-0 md:pr-2.5 md:transform " + (store.address ? "translate-y-2/4" : "top-1/2 -translate-y-2/4")}/>

                            <span className="hidden md:inline">

                                {store.title}
                                {store.address ? (
                                    isHovering ? (
                                        <Icon icon={faChevronUp} className="pl-2.5"/>
                                    ) : (
                                        <Icon icon={faChevronDown} className="pl-2.5"/>
                                    )
                                ) : (
                                    ""
                                )}
                                {store.timeOpening ? (
                                    <time className="time block flex items-center"><span
                                        className="w-2 h-2 rounded-xl inline-block bg-green box-content text-xs  mr-2.5"/>{store.timeOpening}
                                    </time>
                                ) : (
                                    ""
                                )}
                            </span>
                        </a>
                        {
                            getCurrentWidth() > MOBILE_BREAKPOINT ? (
                                <div className="hidden md:block">
                                    {store.address ? (
                                        isHovering ? (
                                            <div
                                                className="overlay-fade text-xs absolute border border-gray_border border-solid bg-white w-full min-w-min352 p-5 top-full">
                                                <h3 className="text-xl text-gray_4 font-bold  pb-2.5">{store.title}</h3>
                                                {
                                                    store.address ? (
                                                        <p className="pb-2.5" dangerouslySetInnerHTML={{__html: store.address}}/>
                                                    ) : (
                                                        ""
                                                    )
                                                }

                                                {
                                                    store.phone ? (
                                                        <p className="phone pb-2.5">{store.phone}</p>

                                                    ) : (
                                                        ""
                                                    )
                                                }

                                                {
                                                    store.time ? (
                                                        <time className="pb-2.5" dangerouslySetInnerHTML={{__html: store.time}}/>
                                                    ) : (
                                                        ""
                                                    )
                                                }
                                                <button className="btn mt-5">Change Your Store</button>
                                            </div>
                                        ) : (
                                            ""
                                        )
                                    ) : (
                                        ""
                                    )}
                                </div>
                            ):("")
                        }


                    </div>
                    <div className="logo text-center flex-grow">
                        <Link href="/">
                            <a><img src="/assets/images/logo.png" className="w-5/6 max-w-logo-width inline"/></a>
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
                                customer.nav ? (
                                    <div>
                                        <a href="#" className="flex items-center">
                                            <Icon icon={faUserCircle} className="md:pr-1.5 w-5 md:w-4"/>
                                            <span className="hidden md:inline">
                                                {customer.title}
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
                                            {isCustomerHovering ? (

                                                <div
                                                    className="overlay-fade absolute left-0 border border-gray_border border-solid bg-white min-w-min352 p-5 top-full">
                                                    <CustomerMenu customer={customer}/>
                                                </div>

                                            ) : ("")}
                                        </div>

                                    </div>
                                ) : (
                                    <a href="#"><Icon icon={farUserCircle}
                                                      className="md:pr-1.5 w-5 md:w-4"/>{customer.title}<Icon
                                        icon={faChevronDown} className="pl-1.5"/></a>
                                )
                            }


                        </li>
                        <li className="md:py-30px md:-my-30px md:ml-0"

                            onMouseEnter={onMiniCartMouseEnter}
                            onMouseLeave={onMiniCartMouseLeave}>
                            <a href="#" className="relative">
                                <Icon icon={faShoppingBag} className="w-5 md:w-4"/>
                                <span className="block absolute">5</span>
                            </a>
                            {
                                getCurrentWidth() > MOBILE_BREAKPOINT ? (
                                    <div className="hidden md:block">
                                        {minicart ? (
                                            isMiniCartHovering ? (
                                                <MiniCart data={minicart}/>
                                            ) : ("")
                                        ) : ("")}
                                    </div>
                                ):("")
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