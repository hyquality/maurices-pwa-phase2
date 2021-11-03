import React, {createContext, useState} from "react";

export const DataProviderContext = createContext();

export default function LayoutDataProvider({data, pwa, children, ...props}) {
    const {footer, store, customer} = data
    const {headerContent, navMenuItems, cart} = pwa
    return (
        <DataProviderContext.Provider
            value={{
                headerContent,
                navMenuItems,
                footer,
                store,
                customer,
                cart
            }}>
            {children}
        </DataProviderContext.Provider>
    )
}
