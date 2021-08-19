import React, {useState} from "react";
import Link from "next/link";
import Icon from "@components/icon";

export default function InstantSearch({data, instantSearchState, setInstantSearchState}) {
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

    return (

        (instantSearchState.value && instantSearchState.value.length > 0) ? (
            <div
                onMouseEnter={onSearchResultMouseEnter}
                onMouseLeave={onSearchResultMouseLeave}
                className="absolute left-1/2 w-5/12 transform -translate-x-1/3 top-full bg-white border border-gray_border border-solid">
                <div className="flex">
                    <div className="w-2/3 min-h-instant p-7">
                        <ul className="flex">
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
                                <ul className="flex flex-wrap pt-4 -mx-6">
                                    {
                                        instantSearchState.searchResult.data.result.map((link) => (
                                            <li className="w-1/3 px-6 pb-7 flex-grow" key={"search-result-" + link.id}>

                                                <Link href={link.url}>
                                                    <a>
                                                        <img className="pb-2.5" src={link.image}/>
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
                    <div className="w-1/3 bg-gray_1 py-7 px-11">
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
        ) : ("")
    )
}