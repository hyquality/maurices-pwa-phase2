import NavList from "@components/templates/nav-list";
import Link from "next/link";
import Icon from "@components/icon";
import React from "react";
import {openMainMenu,getCurrentWidth} from "@lib/helpers";
import MobileMenuExt from "./mobile-menu-ext";
import {MOBILE_BREAKPOINT} from "@lib/constants";

const onMobileMenuButtonClick = () => {
    openMainMenu(2).then(r => "");
}
export default function Nav({data, customer, store}) {
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
            <div>
                {
                    getCurrentWidth() <= MOBILE_BREAKPOINT ?(
                        <MobileMenuExt customer={customer} store={store}/>
                    ):("")
                }
            </div>


        </nav>
    )
}