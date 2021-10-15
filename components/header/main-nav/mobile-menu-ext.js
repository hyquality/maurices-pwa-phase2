import Icon from "@components/templates/icon";
import React, {useState} from "react";
import CustomerMenu from "@components/header/main-nav/customer-menu";
import MegaMenuWrapper from "@components/header/main-nav/mega-menu-wrapper";

export default function MobileMenuExt({customer, store}) {
    const [activeElement, setActiveElement] = useState(false);
    const onNavRootElementClick = (event) => {
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
        <div className="md:hidden mt-5">
            <ul className="nav main-navigation">
                {
                    customer.nav ? (
                        <li className="customer-menu">
                            <a href="#" onClick={onNavRootElementClick} onTouchStart={onNavRootElementClick} >
                                <span><Icon icon={["fa", "user-circle"]} className="pr-2.5 w-4 ml-0"/></span>
                                <span className="normal-case font-semibold"> {customer.title}</span>
                                <Icon icon={["fas","chevron-right"]}/>
                            </a>
                            <MegaMenuWrapper onClick={onNavCloseMegaElementClick} title={"My Account"}>
                                <CustomerMenu customer={customer}/>
                            </MegaMenuWrapper>
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
                            <MegaMenuWrapper onClick={onNavCloseMegaElementClick} title={"My Store"}>
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
                                    <button className="btn">Change Your Store</button>
                                </div>
                            </MegaMenuWrapper>

                        </li>

                    ):("")}
            </ul>
        </div>
    )
}