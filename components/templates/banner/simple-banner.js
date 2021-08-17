import Link from "next/link";
import React from "react";

export default function SimpleBanner({data, className=""}) {
    return (
        <div className={"simple-banner text-center "+className}>
            <Link href={data.url}>
                <a>
                    <img src={data.image}/>
                    <h4 className="normal-case pt-2">{data.title}</h4>
                </a>
            </Link>
        </div>
    )
}
