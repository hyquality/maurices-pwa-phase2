import Link from "next/link";
import React from "react";
import Icon from "@components/icon";
import Button from "@components/button";

export default function MiniCart({data}) {
    return (
        <div
            className="overlay-fade absolute right-0 border border-gray_border border-solid bg-white w-full  min-w-min352 top-full">
            <div className="relative max-h-max384 overflow-y-auto">
                <h3 className="top-0 sticky bg-white pt-5 text-2xl text-gray_4 font-semibold px-5 pb-2.5 shadow-small">Your Bag</h3>
                {
                    data.items ? (
                        <ul className="pt-5 ">
                            {
                                data.items.map((item) => (
                                    <li className="flex px-5 pb-5 mb-5 border-b border-gray_border last:border-0" key={"mini-cart-item-" + item.id}>
                                        <Link href={item.url}>
                                            <a className="w-20 pr-5 box-content">
                                                <img src={item.image}/>
                                            </a>
                                        </Link>
                                        <div className="flex-grow relative">
                                            <h4 className="font-extrabold text-gray_4 flex pb-2.5">
                                                <span>{item.title}</span>
                                                <span className="ml-auto pl-2"> {item.price}</span>
                                            </h4>
                                            <ul className="text-xs">
                                                {
                                                    item.options ? (
                                                        item.options.map((option) => (
                                                            <li className="pb-0.5" key={"mini-cart-item-оптион-" + item.id+"-"+option.id}>
                                                                <span>{option.name}:</span>
                                                                <span className="text-gray_4 pl-2">{option.value}</span>
                                                            </li>
                                                        ))
                                                    ) : ("")
                                                }
                                                <li>
                                                    <span>Quantity:</span>
                                                    <span className="text-gray_4 pl-2">{item.qty}</span>
                                                </li>
                                            </ul>
                                            <a href="#" className="absolute right-0 bottom-0 flex items-center text-gray_2">
                                                <Icon icon={["far","trash-alt"]}/>
                                                <span className="pl-2 underline hover:no-underline">Remove</span>
                                            </a>
                                        </div>
                                    </li>
                                ))
                            }

                        </ul>
                    ) : ("")
                }
            </div>

            <div className="bg-white px-5 py-4 border-t border-gray_border shadow-small">
                {
                    data.subtotal ? (
                        <div className="font-extrabold flex">
                            <span>Subtotal</span>
                            <span className="ml-auto">{data.subtotal}</span>
                        </div>
                    ) : ("")
                }

                <span className="text-xs text-gray_5">*before shipping and sale tax</span>
                <div className="flex">
                    <Button label={"View Bag"} size="small" className="mr-1.5 mt-1.5 w-full"/>
                    <Button label={"Checkout"} size="small" color={"green"} className="mr-1.5 mt-1.5 w-full"/>
                </div>
            </div>
        </div>
    )
}