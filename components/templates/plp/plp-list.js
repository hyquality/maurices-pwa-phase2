import PlpCard from "@components/templates/product/card/plp-card";
import PlpFilterSelectedList from "@components/templates/plp/filter/plp-filter-selected-list";
import React, {useContext, Fragment} from "react";
import {SelectedFiltersContext} from './filter/filter-container';
import SimpleBanner from "@components/templates/banner/simple-banner";
import Button from "@components/templates/button";
import {REACT_APP_CATALOG_PAGE_SIZE} from "@lib/constants";

export default function PlpList({openPopup}) {
    const {
        setIsMoreProductLoading,
        productList,
        promos,
        sortOptions,
        sortCatalogList,
        totalNumProducts,
        setCatalogListIndex,
        catalogListIndex
    } = useContext(SelectedFiltersContext)

    const loadMore = (e) => {
        setIsMoreProductLoading(true)
        setCatalogListIndex(prevCatalogListIndex => (
            {
                ...prevCatalogListIndex, startIndex: catalogListIndex.startIndex+REACT_APP_CATALOG_PAGE_SIZE
            }));
    }
    return (
        <>
            {
                productList ? (
                    <>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray_5">{totalNumProducts} results</span>
                            <div className="sort">
                                <select
                                    className="text-sm text-gray_2 font-medium pl-4 py-2.5 border border-gray_3 min-w-min230"
                                    onChange={(e) => {
                                        sortCatalogList(e.target.value)
                                    }}>
                                    {
                                        sortOptions.map((option, index) => (
                                            <option
                                                value={option.code}
                                                key={`sort-option-${index}`}
                                                defaultValue={option.selected}>{option.displayName}</option>
                                        ))
                                    }

                                </select>
                            </div>
                        </div>
                        <PlpFilterSelectedList/>

                        <ul className="flex gap-x-2per gap-y-4  flex-wrap border-b border-gray_border py-5 mb-8 ">
                            {
                                productList.map((product, index) => (
                                    <Fragment key={"product-list-" + product.slug + "-" + index}>
                                        <li className="w-32">
                                            <PlpCard data={product} openPopup={openPopup}/>

                                        </li>
                                        {
                                            promos[(index)] && (
                                                <li className={promos[(index)].type === 1 ? "w-32" : "w-66"}>
                                                    <SimpleBanner {...promos[(index)]}/>
                                                </li>
                                            )
                                        }
                                    </Fragment>
                                ))
                            }
                        </ul>

                        <Button label={"Load More"} size={"medium"} className={"m-auto px-20"} onClick={loadMore}/>
                    </>
                ) : ("")
            }
        </>
    )
}
