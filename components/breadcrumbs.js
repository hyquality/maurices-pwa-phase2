import Link from 'next/link'
import Icon from "@components/templates/icon";
import React from "react";
export default function Breadcrumbs({title="Home", elements=[]}) {

    return <ul className="py-8 flex ">
        {
            title && (
                <li >
                    <Link href={"/"}>
                        <a className="flex text-xs text-red">{title}<Icon icon={["fas","chevron-right"]} className={"w-4 h-4 pl-2"}/></a>
                    </Link>
                </li>
            )
        }

        {
            elements.map((element, index) => (
                <li className={"pr-2"} key={`breadcrumb-${index}`}>

                    {
                        ((elements.length-1)>index) ? (
                            <Link href={`/catalog/${element.categoryId}`}>
                                <a className="inline-flex text-xs underline hover:no-underline capitalize">{element.displayName}<Icon icon={["fas","chevron-right"]} className={"w-1.5 h-1.5 pl-2"}/></a>
                            </Link>
                        ):(
                            <span className={"text-xs text-gray_4 capitalize"}>{element.displayName}</span>
                        )
                    }


                </li>
            ))
        }
    </ul>
}