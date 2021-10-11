import React from "react";
import Icon from "@components/icon";

export default function PlpFilterSelectedList({selectedFilters, onClick}) {
/*
    let selectedFilters = []

    for (const key in filters) {
        filters[key].map(({short, title, state}, valueIndex) => (
            state ? (
                selectedFilters.push(
                    {
                        name: key,
                        short: short,
                        title: title,
                        state: state
                    }
                )
            ) : null

        ))
    }
*/
    const onClearFilterClick = (data)=>(e)=>{
        if (onClick) {
            onClick(e, data);
        }
    }
    return (
        <>
            {
                selectedFilters.length>0?(
                    <ul>
                        <li className={"relative text-xs border border-gray_border rounded-full inline-flex  items-center mb-4"}>
                            <a className={"py-3 pl-6 pr-6 cursor-pointer"} onClick={onClearFilterClick({name: "all",short:"all"})}>
                                Clear All
                            </a>
                        </li>
                        {

                            selectedFilters.map(({name,short,title}, valueIndex) => (
                                <li key={`selected-filter-item-${valueIndex}`} className={"relative ml-2.5 text-xs bg-gray_border rounded-full inline-flex   items-center mb-4 "}>
                                    <a className={"flex items-center py-3 pl-6 pr-6 cursor-pointer"} onClick={onClearFilterClick({name: name,short:short})}>
                                        {title}
                                        <Icon icon={["fas", "times"]} className="w-4 block ml-3"
                                              size={"small"}/>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                ):null
            }

        </>

    )
}
