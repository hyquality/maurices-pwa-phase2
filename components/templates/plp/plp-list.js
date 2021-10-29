import PlpCard from "@components/templates/product/card/plp-card";
import PlpFilterSelectedList from "@components/templates/plp/filter/plp-filter-selected-list";
import React, {useContext} from "react";
import {SelectedFiltersContext} from './filter/filter-container';
import SimpleBanner from "@components/templates/banner/simple-banner";

export default function PlpList({openPopup}) {
    const {productList,promos,sortOptions,selectedSort,sortCatalogList,totalNumProducts} = useContext(SelectedFiltersContext)

    return (
        <>
            {
                productList ? (
                    <>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray_5">{totalNumProducts} results</span>
                            <div className="sort">
                                <select className="text-sm text-gray_2 font-medium pl-4 py-2.5 border border-gray_3 min-w-min230" onChange={(e)=>{sortCatalogList(e.target.value)}}>
                                    {
                                        sortOptions.map((option, index) => (
                                            <option
                                                value={option.code}
                                                key={`sort-option-${index}`}
                                                selected={option.selected}>{option.displayName}</option>
                                        ))
                                    }

                                </select>
                            </div>
                        </div>
                        <PlpFilterSelectedList/>

                        <ul className="flex gap-x-2per gap-y-4  flex-wrap border-b border-gray_border py-5 mb-8 ">
                            {
                                productList.map((product, index) => (
                                   <>
                                       <li className="w-32"
                                           key={"product-" + product.slug + "-" + index}>
                                           <PlpCard data={product} openPopup={openPopup}/>

                                       </li>
                                       {
                                           promos[(index)] && (
                                               <li className={promos[(index)].promo.type===1?"w-32":"w-66"} key={"product-promo-" + product.slug + "-" + index}>
                                                   <SimpleBanner {...promos[(index)].promo}/>
                                               </li>
                                           )
                                       }
                                   </>
                                ))
                            }
                        </ul>
                    </>
                ) : ("")
            }
        </>
    )
}
