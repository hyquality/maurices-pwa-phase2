import Container from "@components/container";
import React from "react";

export default function TopBar({data}) {
    return (
        <div className="top-bar hidden md:block bg-gray_1 text-xs py-2.5">
            <Container>
                <div className="flex">
                    <div>Get $10 when you share the love! <a href="#">Learn More</a></div>
                    <div className="ml-auto">
                        <ul className="flex">
                            <li>MyMaurices Rewards</li>
                            <li>100 pts</li>
                            <li>$5 in Available Rewards</li>
                        </ul>
                    </div>
                </div>
            </Container>

        </div>
    )
}