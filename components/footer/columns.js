import Link from "next/link";
import Container from "@components/container";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

import {faChevronDown, faChevronUp, fas} from "@fortawesome/free-solid-svg-icons";
import Icon from "@components/icon";
import React, {useState} from "react";

library.add(fab);
library.add(far);
library.add(fas);
export default function Columns({data, signup}) {

    const handleToggle = (e) => {
        const isActive =  e.target.classList.contains("on");
        if(isActive){
            e.target.classList.remove('on')
        } else {
            e.target.classList.add('on')
        }

    };


    return (
        <div className="columns-footer  pt-8 ">
            <Container>
                <div className="md:flex -mx-5 md:m-0">
                    {data.map((column) => (

                        <div key={"columnn-" + column.id} className={"border-b md:border-b-0 border-gray_border w-full "+(column.id === 0 ? "md:w-1/4" : "md:w-1/5")}>
                            {
                                column.title
                                    ? (
                                        <h4 className="text-sm md:text-xl text-center md:text-left text-gray_2 leading-5 py-4 md:pb-2.5 md:pt-0 relative"
                                            onClick={handleToggle}>
                                            {column.title}
                                            <Icon icon={faChevronUp} className="hidden icon-up absolute right-5 top-1/2 transform -translate-y-1/2"/>
                                            <Icon icon={faChevronDown} className="block md:hidden icon-down absolute right-5 top-1/2 transform -translate-y-1/2"/>
                                        </h4>
                                    )
                                    : null
                            }
                            {
                                column.nav
                                    ? (
                                        <ul className={"md:block "+(column.id === 0 ? "flex flex-wrap justify-center" : "text-center small py-3 md:py-0")}>
                                            {
                                                column.nav.map((link) => (
                                                    column.id === 0 ?
                                                        (
                                                            <li key={"footer-column-link-" + column.id + "_" + link.id}
                                                                className="pb-8 w-1/3 md:w-full content-center text-center md:text-left">
                                                                {
                                                                    link.icon ?
                                                                        (
                                                                            <Icon icon={link.icon} className="w-5 pr-0 md:pr-2.5 "/>
                                                                        ) :
                                                                        null
                                                                }
                                                                <Link href={link.url}>
                                                                    <a className={"text-xs md:text-xl leading-5 block md:inline-block "+(column.id === 0 ? "text-xs md:text-xl" : "text-xs md:text-xl")}>{link.text}</a>
                                                                </Link>
                                                            </li>
                                                        )
                                                        : (
                                                            <li key={"footer-column-link-" + column.id + "_" + link.id}
                                                                className="pb-2.5 text-center md:text-left">
                                                                {
                                                                    link.icon ?
                                                                        (
                                                                            <Icon icon={link.icon} className="pr-1.5"/>
                                                                        ) :
                                                                        null
                                                                }
                                                                <Link href={link.url}>
                                                                    <a className="text-xs leading-5">{link.text}</a>
                                                                </Link>
                                                            </li>
                                                        )

                                                ))
                                            }

                                        </ul>
                                    )
                                    : null
                            }
                        </div>
                    ))}
                    <div className="w-full md:w-1/4 text-center md:text-left py-10 md:py-0">
                        {
                            signup.title
                                ? (
                                    <h4 className="text-xl text-gray_2 leading-5 pb-2.5">
                                        {signup.title}
                                    </h4>
                                )
                                : null
                        }
                        {
                            signup.msg
                                ? (
                                    <p className="text-xs text-gray_2 leading-4 pb-2.5"
                                       dangerouslySetInnerHTML={{__html: signup.msg}}/>
                                )
                                : null
                        }
                        <div className="brand py-10"><img src="assets/images/logo.png"/></div>
                        {
                            signup.socialNav
                                ? (
                                    <ul className="social-nav flex justify-center items-center">
                                        {
                                            signup.socialNav.map((link) => (
                                                <li className="m-3 ">
                                                    <Link href={link.url}>
                                                        <a className=""><Icon icon={link.icon} className="w-5 h-5 p-3 border border-gray_3 rounded-full"/></a>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>

                                )
                                : null
                        }
                    </div>
                </div>
            </Container>
        </div>


    )
}
