import React, {useContext} from "react";
import Icon from "@components/templates/icon";
import {SelectedFiltersContext} from './filter-container';

export default function PlpFilterSelectedList() {
    const {
        selectedFlat,
        menageFilters,
        clearAll
    } = useContext(SelectedFiltersContext)


    const onClearFilterClick = (data)=>(e)=>{
        menageFilters(data.name, data.short)
    }
    return (
        <>
            {
                selectedFlat.length>0?(
                    <ul>
                        <li className={"relative text-xs border border-gray_border rounded-full inline-flex  items-center mb-4"}>
                            <a className={"py-3 pl-6 pr-6 cursor-pointer"} onClick={clearAll}>
                                Clear All
                            </a>
                        </li>
                        {

                            selectedFlat.map(({name,short,title}, valueIndex) => (
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
