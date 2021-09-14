import Icon from "@components/icon";
import CustomerMenu from "@components/header/main-nav/customer-menu";
import React from "react";

export default function MegaMenuWrapper({onClick, title, children}) {

    return (
        <div className="megamenu">
            <div className="top">
                <a href="#" onClick={onClick} onTouchStart={onClick}>
                    <Icon icon={["fas","chevron-left"]} className="block"/>
                </a>
                <span>{title}</span>
            </div>
            <div className="megamenu-content">
                <div className={"nav-megamenu-wrapper"}>
                    <div className="nav-megamenu-wrapper-submenu">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}