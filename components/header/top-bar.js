import Container from "@components/container";
import React, {useContext, useEffect} from "react";
import {DataProviderContext} from "@components/layout-data-provider";

export default function TopBar({data}) {
    const {
        headerContent
    } = useContext(DataProviderContext)
    const {promoInfo} = headerContent.promoInfo || {}
    const {loyaltyInfo} = headerContent.loyaltyInfo || {}


    return (
        <div className="top-bar hidden md:block bg-gray_1 text-xs py-2.5">
            <Container>
                <div className="flex">
                    {
                        promoInfo &&(
                            <div>
                                {promoInfo.text}
                                {
                                    promoInfo.link && (
                                        <a href={promoInfo.link.url} className={"ml-2 underline hover:no-underline"}>{promoInfo.link.text}</a>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        loyaltyInfo && (
                            <div className="ml-auto">
                                <ul className="flex">
                                    <li className={"mr-2"}>MyMaurices Rewards</li>
                                    <li className={"mr-2"}>{loyaltyInfo.points} pts</li>
                                    <li>${loyaltyInfo.totalRewards} in Available Rewards</li>
                                </ul>
                            </div>
                        )
                    }

                </div>
            </Container>

        </div>
    )
}