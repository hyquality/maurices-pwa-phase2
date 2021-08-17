import Footer from '../components/footer/footer'
import Meta from '../components/meta'
import Header from "@components/header/header";
import Nav from "@components/header/nav";
import React from "react";


export default function Layout({preview, data, nav, children}) {
    return (
        <>
            <Meta/>
            <div className="pt-40">
                {
                    data.HeaderContent ? (
                        <Header data={data.HeaderContent}/>
                    ) : ("")
                }

                {
                    nav.data ? (
                        <Nav data={nav.data}/>
                    ) : ("")
                }

                <div className="">
                    <main>{children}</main>
                </div>
                {
                    data.footerContent ? (
                        <Footer data={data.footerContent}/>
                    ) : ("")
                }

            </div>
        </>
    )
}