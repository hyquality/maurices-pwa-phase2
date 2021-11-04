import React, {createContext, useEffect, useState} from "react";
import useSWR from "swr";

export const DataProviderContext = createContext();

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function LayoutDataProvider({pwa, children, ...props}) {

    const [profileInfo, setProfileInfo] = useState(false);

    const {
        "data": prfileData,
        "error": prfileError
    } = useSWR( "/api/profile", fetcher)

    useEffect(() => {
        if (prfileData) {
            setProfileInfo(prfileData.data.profileInfo)
        }
    }, [prfileData])

    const [cart, setCart] = useState(false);

    const {
        "data": cartData,
        "error": cartError
    } = useSWR( "/api/cart", fetcher)

    useEffect(() => {
        if (cartData) {
            setCart(cartData.data)
        }
    }, [cartData])

    const [store, setStore] = useState(false);

    const {
        "data": storeData,
        "error": storeError
    } = useSWR( "/api/store/1", fetcher)

    useEffect(() => {
        if (storeData) {
            setStore(storeData.data.storeInfo.store)
        }
    }, [storeData])


    const {headerContent, navMenuItems, footerContent} = pwa
    return (
        <DataProviderContext.Provider
            value={{
                profileInfo,
                headerContent,
                navMenuItems,
                footerContent,
                store,
                cart
            }}>
            {children}
        </DataProviderContext.Provider>
    )
}
