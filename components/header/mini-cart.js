import Link from "next/link";
import React, {useContext, useEffect} from "react";
import Icon from "@components/templates/icon";
import Button from "@components/templates/button";
import Image from "next/image";
import {DataProviderContext} from '../layout-data-provider';
import {getCartItemPrice, parseImageUrl} from "@lib/helpers";


export default function MiniCart() {
    const {
        cart
    } = useContext(DataProviderContext)

   const {items, subtotal, count, orderId} = cart.cartInfo || {}
    return (
        <>
            {
                (items && items.length>0)  && (
                    <div
                        className="overlay-fade absolute right-0 border border-gray_border border-solid bg-white w-full  min-w-min352 top-full">
                        <div className="relative max-h-max384 overflow-y-auto">
                            <h3 className="top-0 sticky bg-white pt-5 text-2xl text-gray_4 font-semibold px-5 pb-2.5 shadow-small z-10">Your
                                Bag</h3>
                            <ul className="pt-5 ">
                                {
                                    items.map((item,index) => (
                                        <li className="flex px-5 pb-5 mb-5 border-b border-gray_border last:border-0"
                                            key={"mini-cart-item-" + index}>
                                            <Link href={`product/${item.pdpUrl}`}>
                                                <a className="w-20 pr-5 box-content">
                                                    <Image                        
                                                        alt={item.productName}
                                                        src={parseImageUrl(item.imageUrl)}
                                                        width={72}
                                                        height={106}
                                                        quality={100}
                                                    />
                                                </a>
                                            </Link>
                                            <div className="flex-grow relative">
                                                <h4 className="font-extrabold text-gray_4 flex pb-2.5">
                                                    <span>{item.productName}</span>
                                                    <span className="ml-auto pl-2"> {getCartItemPrice(item)}</span>
                                                </h4>
                                                <ul className="text-xs">
                                                    {
                                                        (item.variants && item.variants.entry) ? (
                                                            item.variants.entry.map((option,optionIndex) => (
                                                                <li className="pb-0.5"
                                                                    key={"mini-cart-item-оптион-" + index + "-" + optionIndex}>
                                                                    <span>{option.key}:</span>
                                                                    <span
                                                                        className="text-gray_4 pl-2">{option.value}</span>
                                                                </li>
                                                            ))
                                                        ) : ("")
                                                    }
                                                    <li>
                                                        <span>Quantity:</span>
                                                        <span className="text-gray_4 pl-2">{item.quantity}</span>
                                                    </li>
                                                </ul>
                                                <a href="#"
                                                   className="absolute right-0 bottom-0 flex items-center text-gray_2">
                                                    <Icon icon={["far", "trash-alt"]}/>
                                                    <span
                                                        className="pl-2 underline hover:no-underline">Remove</span>
                                                </a>
                                            </div>
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>

                        <div className="bg-white px-5 py-4 border-t border-gray_border shadow-small">
                            {
                                subtotal ? (
                                    <div className="font-extrabold flex">
                                        <span>Subtotal</span>
                                        <span className="ml-auto">{subtotal}</span>
                                    </div>
                                ) : ("")
                            }

                            <span className="text-xs text-gray_5">*before shipping and sale tax</span>
                            <div className="flex">
                                <Button label={"View Bag"} size="small" className="mr-1.5 mt-1.5 w-full"/>
                                <Button label={"Checkout"} size="small" color={"green"}
                                        className="mr-1.5 mt-1.5 w-full"/>
                            </div>
                        </div>
                    </div>
                )
            }

        </>

    )
}