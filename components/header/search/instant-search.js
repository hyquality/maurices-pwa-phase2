import React, {useState} from "react";
import Link from "next/link";
import {bodyOverlay, isMobile,isDescktop} from "@lib/helpers";
import {getSearchData} from "@lib/api";
import Icon from "@components/icon";
export default function InstantSearch({data, instantSearchState, setInstantSearchState}) {
    const [searchInputValue, setSearchInputValue] = useState('');
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

    const handleSearchInput = async (event) => {

        setSearchInputValue(event.target.value);
        updateInstantSearchState(event.target.value)

        let file = "dataSearchJson.json"
        if (event.target.value.length > 1) file = "dataSearchJson1.json"
        if (event.target.value.length > 3) file = "dataSearchJson2.json"
        const searchData = (await getSearchData(event.target.value, file)) || {};

        setInstantSearchState(prevState => {
            return {...prevState, searchResult: searchData}
        });


    }

    const updateInstantSearchState = (value) => {
        bodyOverlay(value !== "" ? 1 : 2).then(r => {
        })
        setInstantSearchState(prevState => {
            return {...prevState, value: value}
        });

    }

    const closeSearch = () => {

        bodyOverlay(2).then(r => {
        })
        setSearchInputValue("");
        updateInstantSearchState("");
    };

    return (
        <div
            onMouseEnter={onSearchResultMouseEnter}
            onMouseLeave={onSearchResultMouseLeave}
            className={"block pt-5 md:pt-0 md:absolute md:left-1/2  md:w-5/12 md:transform md:-translate-x-1/3 top-full bg-white md:border border-gray_border border-solid " + ((instantSearchState.value && instantSearchState.value.length > 0) ? "block" : "block md:hidden")}>
            <div className="block relative md:flex pb-5 md:pb-0 -mb-5  md:-mb-0">
                <div className="relative block md:hidden">
                    <Icon icon={["fa", "search"]}
                          className="absolute left-2.5 top-1/2 transform -translate-y-1/2 "/>
                    <input
                        className="pl-8 py-2.5 text-sm text-gray_4 focus:outline-none w-full block md:hidden border border-gray_border focus:border-gray_2 border-0 rounded-lg"
                        placeholder="Search"
                        value={searchInputValue}
                        onChange={handleSearchInput}
                    />
                    <button onClick={closeSearch}
                            className={"absolute top-1/2 transform -translate-y-1/2 right-5 " + ((instantSearchState.value && instantSearchState.value.length > 0) ? "block" : "hidden")}>
                        <Icon icon={["fas", "times"]}/>
                    </button>
                </div>


                <div
                    className={"left-0 right-0 top-full absolute md:relative bg-white md:w-2/3 px-7 border-t border-gray_border border-solid md:border-t-0 " + ((instantSearchState.value && instantSearchState.value.length > 0) ? "block" : "hidden")}>
                    <ul className="hidden md:flex pt-5">
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
                            <ul className="block md:flex md:flex-wrap md:pt-4 md:-mx-6 last:border-b-0">
                                {
                                    instantSearchState.searchResult.data.result.map((link) => (
                                        <li className="w-full md:w-1/3 md:px-6  pt-2.5 md:pt-0 pb-2.5 md:pb-7 md:flex-grow border-b border-gray_border "
                                            key={"search-result-" + link.id}>

                                            <Link href={link.url}>
                                                <a>
                                                    <img className="hidden md:block pb-2.5" src={link.image}/>
                                                    <h4 className="text-sm md:text-xs text-gray_2 md:text-main">{link.text}</h4>
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
                                            <li className="pb-2.5 text-gray_2"
                                                key={"search-suggestion-" + link.id}>

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
                                            <li className="pb-2.5 text-gray_2"
                                                key={"search-category-" + link.id}>

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