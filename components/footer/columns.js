import Image from 'next/image'
import Container from "@components/container";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

import {faChevronDown, faChevronUp, fas} from "@fortawesome/free-solid-svg-icons";
import Icon from "@components/icon";
import React from "react";
import NavList from "@components/templates/nav-list";
import logo from "@public/assets/images/logo.png"

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
                                        <NavList data={column.nav} className={"footer-column-nav  footer-column-link-"+column.id+" "+(column.id === 0 ? "first-column" : "next-column small")}/>
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
                        <div className="brand py-10">
                            <Image
                                alt=""
                                src={logo}
                                width={350}
                                height={47}
                                quality={100}
                            />
                        </div>
                        {
                            signup.socialNav
                                ? (
                                    <NavList data={signup.socialNav} className={"social-nav"}/>

                                )
                                : null
                        }
                    </div>
                </div>
            </Container>
        </div>


    )
}
