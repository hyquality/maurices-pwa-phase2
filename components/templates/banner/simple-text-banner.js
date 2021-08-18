import Link from "next/link";
import React from "react";
import Template from "@components/templates/template";
import NavList from "@components/templates/nav-list";

export default function SimpleTextBanner({data, className = ""}) {
    return (
        <div className={"simple-text-banner text-center " + className}>
            <div className="relative block pt-10 pb-6" style={{backgroundColor: data.color ? data.color : ""}}>
                <span className="w-px h-5 absolute left-1/2 -top-2.5" style={{backgroundColor: data.textColor ? data.textColor : ""}}/>
                <Link href={data.url}>
                    <a>
                        {data.label ? (
                            <span className="block uppercase text-sm-10 font-extrabold text-gray_4">{data.label}</span>
                        ) : ("")}
                        {data.title ? (
                            <span className="block font-black pt-8 text-2xl tracking-widest"
                                  style={{color: data.textColor ? data.textColor : ""}}>{data.title}</span>
                        ) : ("")}
                        {data.subtite ? (
                            <span className="block font-bold text-xl"
                                  style={{color: data.textColor ? data.textColor : ""}}>{data.subtite}</span>
                        ) : ("")}
                        {data.notation ? (
                            <span className="block text-xs pt-5">{data.notation}</span>
                        ) : ("")}
                    </a>
                </Link>
            </div>
            {data.nav ? (
                <NavList data={data.nav} className="link-list-border "/>
            ) : ("")}
        </div>
    )
}
