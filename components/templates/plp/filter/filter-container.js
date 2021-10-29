import React, {createContext, useEffect, useState} from "react";
import {generateFilters, generateFilters2, generatePromos, mapProductsJson} from "@lib/helpers";
import PlpCard from "@components/templates/product/card/plp-card";

export const SelectedFiltersContext = createContext();

export default function FilterContainer({collection,catalogData,loadFilteredCatalog, children, ...props}) {
    const {title, slug,promo} = collection || {}
    const {facets,selectedFacets,products,sortOptions,totalNumProducts,subcategories} = catalogData || {}

    const [productList, setProductList] = useState(mapProductsJson(products));

    const [filters, setFilter] = useState(false);
    const [promos, setPromos] = useState(generatePromos(promo));

    const [selectedFilters, setSelectedFilters] = useState(false);

    const [catalogListIndex, setCatalogListIndex] = useState({startIndex:1,pageSize:30});

    const [selectedSort, setSelectedSort] = useState(sortOptions.find(obj => obj.selected === true).code)

    const setDefaultAttrState = (clear=false) => {
        let tempSelectedFilters = []
        if(filters.attributes!==undefined){
            filters.attributes.map(({values, name}, index) => (
                tempSelectedFilters[name] = []
            ))
            filters.attributes.map(({values, name}, index) => (
                values.map(({short, title}, valueIndex) => (
                    tempSelectedFilters[name].push(
                        {
                            short: short,
                            title: title,
                            state: (selectedFacets.indexOf(short) !== -1 && clear===false)
                        }
                    )

                ))
            ))
        }

        return tempSelectedFilters
    }

    useEffect(()=>{
        if (facets){
            setFilter(generateFilters2(facets))
        }
    },[facets])

    useEffect(()=>{
        if (filters){
            setSelectedFilters(setDefaultAttrState(false))
        }
    },[filters])

    useEffect(()=>{
        setSelectedFlat(selectedFiltersFlat(true))
    },[selectedFacets])

    useEffect(()=>{
        setSelectedSort(sortOptions.find(obj => obj.selected === true).code)
    },[sortOptions])

    useEffect(()=>{
        setProductList(mapProductsJson(products));
    },[products])

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
        setSelectedFlat(selectedFiltersFlat(true,true))
        productFilter(selectedFiltersFlat(true,true))
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
        modifiedFilters.push({
            state: !modified[0].state,
            short: modified[0].short,
            title: modified[0].title
        })
        tempFilters[name] = modifiedFilters
        updateSelectedFilters(name, tempFilters[name])
    }


    const selectedFiltersFlat = (selectedFiltersUpdated, clear=false) => {
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


    const checkSelectedAttributes = (attributes,selectedFlatUpdated) => {
        let pass = false
        for (let i = 0; i < selectedFlatUpdated.length; i++) {
            attributes[selectedFlatUpdated[i].name].short === selectedFlatUpdated[i].short ? pass = true : null

        }
        return pass
    }
    const productFilter = (selectedFlatUpdated) => {
        loadFilteredCatalog(selectedFlatUpdated,selectedSort,catalogListIndex)


    }
    const sortCatalogList = (code) => {
        setSelectedSort(code)
        loadFilteredCatalog(selectedFlat,code,catalogListIndex)
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
                title,  slug, products
            }}>
            {children}
        </SelectedFiltersContext.Provider>
    )
}
