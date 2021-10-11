import PlpCard from "@components/templates/product/card/plp-card";
import PlpFilterSelectedList from "@components/templates/plp/filter/plp-filter-selected-list";
import React from "react";
import Icon from "@components/icon";

export default function PlpList({data,openPopup, selectedFilters,clearFilterClick}) {
    let filters = []

    for (const key in selectedFilters) {
        selectedFilters[key].map(({short, title, state}, valueIndex) => (
            state ? (
                filters.push(
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

    const onClearFilterClick = (e,data)=>{
        if (clearFilterClick) {
            clearFilterClick(e, data);
        }
    }
    return (
        <>
            {
                data ? (
                    <>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray_5">{data.length} results</span>
                            <div className="sort">
                                <select className="text-sm text-gray_2 font-medium pl-4 py-2.5 border border-gray_3 min-w-min230">
                                    <option value="1">Sort by Featured</option>
                                    <option value="2">Sort by Price</option>

                                </select>
                            </div>
                        </div>
                        <PlpFilterSelectedList selectedFilters={filters} onClick={onClearFilterClick}/>

                        <ul className="flex justify-between flex-wrap border-b border-gray_border py-5 mb-8 ">
                            {
                                data.map((product, index) => (
                                    <li className="w-30"
                                        key={"product-" + product.slug + "-" + index}>
                                        <PlpCard data={product} openPopup={openPopup}/>

                                    </li>
                                ))
                            }
                        </ul>
                    </>
                ) : ("")
            }
        </>
    )
}
