import React, {createContext, useEffect, useState} from "react";
import useSWR from "swr";
import {useRouter} from "next/router";
import {apiCall, fetcher} from "@lib/api";

export const DataProviderContext = createContext();

export default function LayoutDataProvider({pwa,setIsLoading, children, ...props}) {
    const router = useRouter()
    const [profileInfo, setProfileInfo] = useState(false);

    const [instantSearchState, setInstantSearchState] = useState({
        value: "",
        mouseOn: false,
        error: false,
        suggestions: false,
        categories: false,
        searchResult: false
    });

    const [searchValueCache, setSearchValueCache] = useState('');
    const [searchInputValue, setSearchInputValue] = useState(instantSearchState.value);

    const {
        "data": searchData,
        "error": searchError
    } = useSWR(searchInputValue ? `/api/search/${searchInputValue}` : null, fetcher)

    const {
        "data": typeaheadData,
        "error": typeaheadError
    } = useSWR(searchInputValue ? `/api/search/typeahead/${searchInputValue}` : null, fetcher)

    useEffect(() => {
        if (typeaheadError!==undefined) {

        }
    }, [typeaheadError])

    useEffect(() => {
        if (typeaheadData!==undefined) {
            setInstantSearchState(prevState => {
                return {...prevState, suggestions: typeaheadData.data.productSearches,categories: typeaheadData.data.categories, error: false}
            })
        }
    }, [typeaheadData])

    useEffect(() => {
        if (searchError!==undefined) {
            setInstantSearchState(prevState => {
                return {...prevState, searchResult: false, error: searchError}
            })
        }
    }, [searchError])

    useEffect(() => {
        if (searchData!==undefined) {
            setInstantSearchState(prevState => {
                return {...prevState, searchResult: searchData.data.products, error: false}
            })
        }
    }, [searchData])

    useEffect(() => {
        setSearchInputValue(instantSearchState.value)
    }, [instantSearchState.value])

    const {
        "data": prfileData,
        "error": prfileError
    } = useSWR( "/api/profile", fetcher)

    useEffect(() => {
        if (prfileData!==undefined) {
            setProfileInfo(prfileData.data.profileInfo)
        }
    }, [prfileData])

    const [cart, setCart] = useState(false);

    const {
        "data": cartData,
        "error": cartError
    } = useSWR( "/api/cart", fetcher)

    useEffect(() => {
        if (cartData!==undefined) {
            setCart(cartData.data)
        }
    }, [cartData])

    const [store, setStore] = useState(false);

    const {
        "data": storeData,
        "error": storeError
    } = useSWR( profileInfo.favoriteStoreId?`/api/store/${profileInfo.favoriteStoreId}`:null, fetcher)

    useEffect(() => {
        if (storeData!==undefined) {
            //console.log(storeData.data.storeInfo)
            setStore(storeData.data.storeInfo)
        }
    }, [storeData])

    const [loyaltyInfo, setLoyaltyInfo] = useState(false);
    const {
        "data": rewardData,
        "error": rewardError
    } = useSWR( "/api/reward", fetcher)

    useEffect(() => {
        if (rewardData!==undefined) {
            setLoyaltyInfo(rewardData.data.loyaltyInfo)
        }
    }, [rewardData])


    const {headerContent, navMenuItems, footerContent} = pwa

    const loadSearchPage=()=>{
        setIsLoading(true)
        const val = instantSearchState.value
        setSearchValueCache(instantSearchState.value)
        setInstantSearchState(prevState => {
            return {
                ...prevState,
                value: "",
                error: false,
                searchResult: false,
                suggestions: false,
                categories: false
            }
        })
        router.push(`/search/${val}`)
    }
    return (
        <DataProviderContext.Provider
            value={{
                instantSearchState, setInstantSearchState,
                searchValueCache, setSearchValueCache,
                searchInputValue, setSearchInputValue,
                loyaltyInfo,
                profileInfo,
                headerContent,
                navMenuItems,
                footerContent,
                store,
                cart,
                loadSearchPage,
                setIsLoading
            }}>
            {children}
        </DataProviderContext.Provider>
    )
}
