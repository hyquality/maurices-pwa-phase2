import React, {createContext, useEffect, useState} from "react";
import {generateFilters, generateFilters2, generatePromos, mapProductsJson} from "@lib/helpers";
import PlpCard from "@components/templates/product/card/plp-card";
import {REACT_APP_CATALOG_PAGE_SIZE} from "@lib/constants";

export const SelectedFiltersContext = createContext();

export default function FilterContainer({catalogData, loadFilteredCatalog, children, ...props}) {

    const {"categoryDisplayName": title, "categoryId": slug} = catalogData;
    const {facets, selectedFacets, products, sortOptions, totalNumProducts, subcategories} = catalogData || {}

    const [productList, setProductList] = useState(mapProductsJson(products));
    const [isMoreProductLoading, setIsMoreProductLoading] = useState(false);

    const [filters, setFilter] = useState(false);
    const [promos, setPromos] = useState(generatePromos(catalogData));

    const [selectedFilters, setSelectedFilters] = useState(false);

    const [catalogListIndex, setCatalogListIndex] = useState({startIndex: 1, pageSize: REACT_APP_CATALOG_PAGE_SIZE});

    const [selectedSort, setSelectedSort] = useState(sortOptions.find(obj => obj.selected === true).code)

    const setDefaultAttrState = (clear = false) => {
        let tempSelectedFilters = []
        if (filters.attributes !== undefined) {
            filters.attributes.map(({values, name}, index) => (
                tempSelectedFilters[name] = []
            ))
            filters.attributes.map(({values, name}, index) => (
                values.map(({short, title}, valueIndex) => (
                    tempSelectedFilters[name].push(
                        {
                            short: short,
                            title: title,
                            state: (selectedFacets.indexOf(short) !== -1 && clear === false)
                        }
                    )

                ))
            ))
        }

        return tempSelectedFilters
    }

    useEffect(() => {
        if (facets) {
            setFilter(generateFilters(facets))
        }
    }, [facets])

    useEffect(() => {
        if (filters) {
            setSelectedFilters(setDefaultAttrState(false))
        }
    }, [filters])

    useEffect(() => {
        setSelectedFlat(selectedFiltersFlat(true))
    }, [selectedFacets])

    useEffect(() => {
        setSelectedSort(sortOptions.find(obj => obj.selected === true).code)
    }, [sortOptions])

    useEffect(() => {
        setProductList(mapProductsJson(products,(isMoreProductLoading?productList:false)));
        setIsMoreProductLoading(false)
    }, [products])

    useEffect(() => {
        if(isMoreProductLoading){
            loadFilteredCatalog(selectedFiltersFlat(false), selectedSort, catalogListIndex)
        }

    }, [catalogListIndex])

    const updateSelectedFilters = (name, filters) => {

        setSelectedFilters(prevSelectedFilters => (
            {
                ...prevSelectedFilters, [name]: filters
            }));

        setSelectedFlat(selectedFiltersFlat(false))
        productFilter(selectedFiltersFlat(false))
    }


    const clearAll = () => {
        setSelectedFilters(setDefaultAttrState);
        setSelectedFlat(selectedFiltersFlat(true, true))
        productFilter(selectedFiltersFlat(true, true))
    }

    const clearFilters = (e, name) => {
        let tempFilters = selectedFilters
        let tempSelectedFilters = []
        tempFilters[name].map(({short, title}, valueIndex) => (
            tempSelectedFilters.push(
                {
                    short: short,
                    title: title,
                    state: false,
                }
            )

        ))
        tempFilters[name] = tempSelectedFilters
        updateSelectedFilters(name, tempFilters[name])
    }


    const menageColorFilters = (e, {short}, name) => {

        menageFilters(name, short)
    }

    const menageCheckFilters = (name, value) => (e) => {
        menageFilters(name, value)
    }

    const menageFilters = (name, value) => {
        let modifiedFilters = []
        let tempFilters = selectedFilters
        const modified = tempFilters[name].filter((item) => item.short === value)
        modifiedFilters = tempFilters[name].filter((item) => item.short !== value)
        if(modified!==undefined){
            modifiedFilters.push({
                state: !modified[0].state,
                short: modified[0].short,
                title: modified[0].title
            })
        }

        tempFilters[name] = modifiedFilters
        updateSelectedFilters(name, tempFilters[name])
    }


    const selectedFiltersFlat = (selectedFiltersUpdated, clear = false) => {
        let filters = []
        const selected = selectedFiltersUpdated ? setDefaultAttrState(clear) : selectedFilters

        for (const key in selected) {
            selected[key].map(({short, title, state}, valueIndex) => (
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
        return filters
    }
    const [selectedFlat, setSelectedFlat] = useState(selectedFiltersFlat);


    const productFilter = (selectedFlatUpdated) => {

        setCatalogListIndex(prevCatalogListIndex => (
            {
                ...prevCatalogListIndex, startIndex: 1
            }));

        setProductList(false)
        loadFilteredCatalog(selectedFlatUpdated, selectedSort, catalogListIndex)
    }
    const sortCatalogList = (code) => {
        setSelectedSort(code)
        loadFilteredCatalog(selectedFlat, code, catalogListIndex)
    }

    return (
        <SelectedFiltersContext.Provider
            value={{
                sortOptions,
                selectedSort,
                sortCatalogList,
                totalNumProducts,
                subcategories,
                facets,
                filters,
                promos,
                productList,
                selectedFilters,
                setSelectedFilters,
                clearFilters,
                menageColorFilters,
                menageCheckFilters,
                selectedFlat,
                clearAll,
                menageFilters,
                title,
                slug,
                products,
                setIsMoreProductLoading,
                catalogListIndex,
                setCatalogListIndex
            }}>
            {children}
        </SelectedFiltersContext.Provider>
    )
}
