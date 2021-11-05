import React, {useContext, useState} from "react";
import Icon from "@components/templates/icon";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Button from "@components/templates/button";
import {DataProviderContext} from "@components/layout-data-provider";


export default function SearchField() {

    const {
        instantSearchState, setInstantSearchState,
        searchValueCache, setSearchValueCache,
        searchInputValue, setSearchInputValue,
        loadSearchPage
    } = useContext(DataProviderContext)

    const [isSearchHovered, setIsSearchHovered] = useState(false);
    const onSearchMouseEnter = () => {
        setIsSearchHovered(true)
        setInstantSearchState(prevState => {
            return {...prevState, value:searchValueCache }
        })

        setSearchInputValue(searchValueCache)
    }
    const onSearchMouseLeave = () => {
        setIsSearchHovered(false)
        if (!isSearchFocus && !instantSearchState.mouseOn) {
            setSearchInputValue("")
            setInstantSearchState(prevState => {
                return {...prevState, searchResult: false, value:"" }
            })
        }
    }

    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const onSearchFocus = () => {
        setIsSearchFocus(true)
    }
    const onSearchBlur = () => {
        setIsSearchFocus(false)
        if (!isSearchHovered && !instantSearchState.mouseOn) {
            setSearchInputValue("")
            setInstantSearchState(prevState => {
                return {...prevState, searchResult: false, value:"" }
            })
        }
    }

    const handleSearchInput = async (event) => {
        setInstantSearchState(prevState => {
            return {...prevState, searchResult: false, value:event.target.value }
        })
        setSearchValueCache(searchInputValue)

    }


    const closeSearch = () => {
        setIsSearchHovered(false)
        setSearchValueCache("")
        setInstantSearchState(prevState => {
            return {...prevState, searchResult: false, value:"" }
        })
    };
    const onKeyPress=(e)=>{
        (e.code==="Enter" || e.code==="NumpadEnter") && loadSearchPage()
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
                            onKeyPress={onKeyPress}
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