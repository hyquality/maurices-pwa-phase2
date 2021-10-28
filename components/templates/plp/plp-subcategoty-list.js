import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function PlpSubcategotyList({subcategoryCallouts}) {

    return (
        <div>
            {
                subcategoryCallouts ? (
                    <ul className="flex justify-between flex-wrap border-b border-gray_border py-8 mb-8">
                        {
                            subcategoryCallouts.map(({categoryId,imageUrl,title}, index) => (
                                <li className="w-1/8"
                                    key={"subcategory-" + index}>

                                    <Link href={`/catalog/${categoryId}`}>
                                        <a className="block relative">
                                            <Image
                                                src={imageUrl}
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
