import Link from "next/link";
import React from "react";

export default function PlpFilter({collection}) {
    const {title, subcategories,slug} = collection;
    return (
        <>
            <h2>{title}</h2>
            {
                subcategories ? (
                    <ul>
                        {
                            subcategories.map(({url,qty,title}, index) => (
                                <li className=""
                                    key={"subcategory-filter-" + slug + "-" + index}>

                                    <Link href={url}>
                                        <a>{title} <span>({qty})</span> </a>
                                    </Link>
                                </li>

                            ))
                        }
                    </ul>

                ) : null
            }
        </>
    )
}
