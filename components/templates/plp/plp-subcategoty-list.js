import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function PlpSubcategotyList({collection}) {
    const {title, subcategories,slug} = collection;
    return (
        <div>
            {
                subcategories ? (
                    <ul className="flex justify-between flex-wrap border-b border-gray_border py-8 mb-8">
                        {
                            subcategories.map(({url,image,qty,title}, index) => (
                                <li className="w-1/8"
                                    key={"subcategory-" + slug + "-" + index}>

                                    <Link href={url}>
                                        <a className="block relative">
                                            <Image
                                                src={image}
                                                alt={title}
                                                width={200}
                                                height={300}
                                            />
                                            <h4 className="text-sm md:text-xs text-gray_2 md:text-main">{title}</h4>
                                        </a>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>

                ) : null
            }
        </div>
    )
}
