import React, {useState} from "react";
import Icon from "@components/icon";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {getSearchData} from "@lib/api";
import Button from "@components/button";

export default function SearchField({data, instantSearchState, setInstantSearchState}) {

    const [searchValueCache, setSearchValueCache] = useState('');
    const [searchInputValue, setSearchInputValue] = useState('');

    const [isSearchHovered, setIsSearchHovered] = useState(false);
    const onSearchMouseEnter = () => {
        setIsSearchHovered(true)

        updateInstantSearchState(searchValueCache)
        setSearchInputValue(searchValueCache)
    }
    const onSearchMouseLeave = () => {
        setIsSearchHovered(false)
        if(!isSearchFocus && !instantSearchState.mouseOn) {
            setSearchInputValue("")
            updateInstantSearchState("")
        }
    }

    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const onSearchFocus = () => {
        setIsSearchFocus(true)
    }
    const onSearchBlur = () => {
        setIsSearchFocus(false)
        if(!isSearchHovered && !instantSearchState.mouseOn) {
            setSearchInputValue("")
            updateInstantSearchState("")
        }
    }

    const handleSearchInput = async (event) => {

        setSearchInputValue(event.target.value);
        setSearchValueCache(searchInputValue)
        updateInstantSearchState(event.target.value)
        let file = "dataSearchJson.json"
        if(event.target.value.length>1) file = "dataSearchJson1.json"
        if(event.target.value.length>3) file = "dataSearchJson2.json"
        const searchData = (await getSearchData(event.target.value,file)) || {};

        setInstantSearchState(prevState => {
            return { ...prevState, searchResult: searchData }
        });


    }


    const closeSearch = () => {
        setIsSearchHovered(false)
        setSearchValueCache("")
        updateInstantSearchState("");
    };


    const updateInstantSearchState = (value) => {

        setInstantSearchState(prevState => {
            return { ...prevState, value: value }
        });

    }

    return (
        <div
            className={"transition-all duration-500 border-b border-white hover:border-gray_2 " + ((isSearchHovered || isSearchFocus || instantSearchState.mouseOn) ? "border-gray_2 w-40 " : "w-16")}
            onMouseEnter={onSearchMouseEnter}
            onMouseLeave={onSearchMouseLeave}
        >
            {

                (isSearchHovered || isSearchFocus || instantSearchState.mouseOn) ? (

                    <div className="relative w-full ">
                        <Icon icon={faSearch} className="absolute-y-center"/>
                        <input
                            className="pl-5 text-sm text-gray_4 focus:outline-none  w-full"
                            onFocus={onSearchFocus}
                            onBlur={onSearchBlur}
                            onChange={handleSearchInput}
                            value={searchInputValue}
                            placeholder="Search"
                           />

                        <Button
                            className="absolute-y-center right-0"
                            showBorder={false}
                            onClick={closeSearch}
                        >
                            <Icon icon={["fas", "times"]}/>
                        </Button>
{/*                        <button onClick={closeSearch} className="absolute top-1/2 transform -translate-y-1/2 right-0">

                        </button>*/}
                    </div>
                ) : (
                    <a href="#" className="relative border-b border-white">
                        <Icon icon={faSearch} className="absolute top-1/2 transform -translate-y-1/2"/>
                        <span className="pl-5">Search</span>
                    </a>
                )
            }
        </div>
    )
}