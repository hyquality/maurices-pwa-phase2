import React, {useState} from "react";
import Link from "next/link";
import Icon from "@components/icon";
import {useCurrentWidth} from "../../../lib/helpers";

export default function InstantSearch({data, instantSearchState, setInstantSearchState}) {
    let width = useCurrentWidth();

    const onSearchResultMouseEnter = () => {
        setInstantSearchState(prevState => {
            return {...prevState, mouseOn: true}
        });
    }
    const onSearchResultMouseLeave = () => {
        setInstantSearchState(prevState => {
            return {...prevState, mouseOn: false}
        });
    }

    let isMobile = (width<=768)
    let checkIsActive =((instantSearchState.value && instantSearchState.value.length > 0) || isMobile)


    return (

        <div
            onMouseEnter={onSearchResultMouseEnter}
            onMouseLeave={onSearchResultMouseLeave}
            className={"block md:absolute md:left-1/2  md:w-5/12 md:transform md:-translate-x-1/3 top-full bg-white border border-gray_border border-solid "+((checkIsActive || isMobile)?"block":"hidden")}>
            <div className="block md:flex">
                <input
                    className="pl-5 text-sm text-gray_4 focus:outline-none w-full block md:hidden"
                    placeholder="Search"
                />
                <div className="w-full md:w-2/3 min-h-instant p-7">
                    <ul className="hidden md:flex">
                        <li className="font-extrabold text-sm text-gray_4">Top Results for
                            “{instantSearchState.value}”
                        </li>
                        <li className="ml-auto">
                            <Link href="#">
                                <a>View All Results</a>
                            </Link>
                        </li>
                    </ul>

                    {

                        instantSearchState.searchResult ? (
                            <ul className="block md:flex md:flex-wrap pt-4 md:-mx-6">
                                {
                                    instantSearchState.searchResult.data.result.map((link) => (
                                        <li className="w-full md:w-1/3 px-6 pb-2.5 md:pb-7 md:flex-grow" key={"search-result-" + link.id}>

                                            <Link href={link.url}>
                                                <a>
                                                    <img className="hidden md:block pb-2.5" src={link.image}/>
                                                    <h4 className="text-xs">{link.text}</h4>
                                                </a>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : ("")
                    }

                </div>
                <div className="w-1/3 hidden md:block bg-gray_1 py-7 px-11">
                    <h4 className="font-extrabold text-sm text-gray_4 pb-4">Suggestions</h4>
                    <div>
                        {
                            instantSearchState.searchResult ? (
                                <ul>
                                    {
                                        instantSearchState.searchResult.data.suggestions.map((link) => (
                                            <li className="pb-2.5 text-gray_2" key={"search-suggestion-" + link.id}>

                                                <Link href={link.url}>
                                                    <a>{link.text}</a>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : ("")
                        }
                    </div>
                    <h4 className="font-extrabold text-sm text-gray_4 pb-4 pt-4">Categories</h4>
                    <div>
                        {
                            instantSearchState.searchResult ? (
                                <ul>
                                    {
                                        instantSearchState.searchResult.data.categories.map((link) => (
                                            <li className="pb-2.5 text-gray_2" key={"search-category-" + link.id}>

                                                <Link href={link.url}>
                                                    <a>{link.text}</a>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : ("")
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}