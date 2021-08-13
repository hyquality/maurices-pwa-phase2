import Link from "next/link";
import Container from "@components/container";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

import {fas} from "@fortawesome/free-solid-svg-icons";
import Icon from "@components/icon";
import React from "react";

library.add(fab);
library.add(far);
library.add(fas);
export default function Columns({data, signup}) {
    return (
        <div className="columns-footer py-16">
            <Container>
                <div className="flex">
                    {data.map((column) => (
                        <div key={"columnn-" + column.id} className={column.id === 0 ? "w-1/4" : "w-1/5"}>
                            {
                                column.title
                                    ? (
                                        <h4 className="text-xl text-gray_2 leading-5 pb-2.5">
                                            {column.title}
                                        </h4>
                                    )
                                    : null
                            }
                            {
                                column.nav
                                    ? (
                                        <ul>
                                            {
                                                column.nav.map((link) => (
                                                    column.id === 0 ?
                                                        (
                                                            <li key={"footer-column-link-" + column.id + "_" + link.id}
                                                                className="pb-8">
                                                                {
                                                                    link.icon ?
                                                                        (
                                                                            <Icon icon={link.icon} className="w-5 pr-2.5"/>
                                                                        ) :
                                                                        null
                                                                }
                                                                <Link href={link.url}>
                                                                    <a className="text-xl leading-5">{link.text}</a>
                                                                </Link>
                                                            </li>
                                                        )
                                                        : (
                                                            <li key={"footer-column-link-" + column.id + "_" + link.id}
                                                                className="pb-2.5">
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
                    <div className="w-1/4">
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
