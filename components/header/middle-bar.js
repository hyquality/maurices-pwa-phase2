import Container from "@components/container";
import logoPic from '../../public/assets/images/logo.png'

import React, {useState} from "react";
import { faChevronUp,faChevronDown, faMapMarkerAlt, faSearch, faUserCircle, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import Icon from "@components/icon";
import Link from "next/link";
export default function MiddleBar({data}) {
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    return (
        <div className="text-sm py-5 bg-white">
            <Container>
                <div className="flex items-center">
                    <div className="address-item relative pb-5 -mb-5"
                         onMouseEnter={onMouseEnter}
                         onMouseLeave={onMouseLeave}>
                        <a href="#" className="block relative">
                            <Icon icon={faMapMarkerAlt} className="pr-2.5 transform translate-y-2/4"/>
                            Maurices Shoppes at Richland
                            {isHovering ? (
                                <Icon icon={faChevronUp} className="pl-2.5"/>
                            ) : (
                                <Icon icon={faChevronDown} className="pl-2.5"/>
                            )}

                            <time className="time block flex items-center pl-5"><span className="w-2 h-2 rounded-xl inline-block bg-green box-content text-xs  mr-2.5"/>open until 9pm</time>
                        </a>
                        {isHovering ? (
                            <div className="absolute border border-gray_border border-solid bg-white w-full p-5 top-full">
                                <h3>Maurices Shoppes at Richland</h3>
                                <p>3553 Richland Ave W <br/>
                                    Suite 120 <br/>
                                    Aiken, SC   29801</p>
                                <p className="phone">(803) 642-2257</p>
                                <p>Mon-Sat: 10am &mdash; 9pm <br/>
                                    Sun: 1pm &mdash; 6pm</p>
                                <button>Change Your Store</button>
                            </div>
                        ) : (
                            ""
                        )}

                    </div>
                    <div className="logo absolute left-1/2 transform -translate-x-2/4 max-w-logo-width">
                        <Link href="/">
                            <a><img src="assets/images/logo.png" /></a>
                        </Link>
                    </div>
                    <ul className="middle-bar-menu flex ml-auto">
                        <li>
                            <a href="#"> <Icon icon={faSearch} className="pr-1.5"/>Search</a>
                        </li>
                        <li>
                            <a href="#"><Icon icon={faUserCircle} className="pr-1.5"/>Hy, Christina <Icon icon={faChevronDown} className="pl-1.5"/></a>
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