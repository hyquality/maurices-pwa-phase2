import Link from "next/link";
import Image from "next/image";
import React from "react";
import PropTypes from "prop-types";

export default function CalloutItem({data}) {
    const {id, title, icon, text, nav,w,h} = data || {}
    return (
        <div className="flex items-center pb-9 md:pb-0">
            {
                icon ? (
                    <div className={"pr-2"}>

                        <Image
                            alt={title}
                            src={icon}
                            width={w?w:72}
                            height={h?h:64}
                            quality={100}
                            className="max-w-cellout-width-small lg:max-w-cellout-width h-auto mr-6"
                        />
                    </div>
                ) : null
            }
            <div className={"flex flex-col"}>
                {
                    title ? (
                        <h4 className="text-sm font-bold">{title}</h4>
                    ) : null
                }
                {
                    text ? (
                        <p className="text-xs" dangerouslySetInnerHTML={{__html: text}}/>
                    ) : null
                }


                <ul className="flex pt-5">
                    {nav ? (
                        nav.map(({url, text}, index) => (
                            <li key={"cell-" + id + "_" + index} className="text-xs pr-5">
                                <Link href={url}>
                                    <a className="underline hover:no-underline">{text}</a>
                                </Link>
                            </li>
                        ))
                    ) : ("")}
                </ul>
            </div>
        </div>
    )
}

CalloutItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        nav: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
            })
        )

    })
}

CalloutItem.defaultProps = {
    data: {
        id: 0,
        title: "Title",
        icon: "/assets/images/cell_1.png",
        text: "description",
        nav: [
            {
                "id": 0,
                "text": "Learn More",
                "url": "#"
            },
            {
                "id": 1,
                "text": "Sign Up Free",
                "url": "#"
            }
        ]
    }
}