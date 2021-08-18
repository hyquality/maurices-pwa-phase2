import React, {useState} from "react";
import Icon from "@components/icon";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default function SearchField({data}) {
    const [isSearchHovering, setIsSearchHovered] = useState(false);
    const onSearchMouseEnter = () => {
        setIsSearchHovered(true)
    }
    const onSearchMouseLeave = () => {

        setIsSearchHovered(false)
    }

    const handleSearchInput = (event) => {
        console.log(event.target.value);
    }


    const closeSearch = () => {
        setIsSearchHovered(false)
    };

    return (
        <div
            className="w-40"
            onMouseEnter={onSearchMouseEnter}
            onMouseLeave={onSearchMouseLeave}
        >
            {

                isSearchHovering ? (
                    <div className="relative">
                        <Icon icon={faSearch} className="absolute top-1/2 transform -translate-y-1/2"/>
                        <input className="pl-5 text-sm text-gray_4 focus:outline-none border-b border-gray_2" onChange={handleSearchInput} placeholder="Search"/>
                        <button onClick={closeSearch} className="absolute top-1/2 transform -translate-y-1/2 right-0">x</button>
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