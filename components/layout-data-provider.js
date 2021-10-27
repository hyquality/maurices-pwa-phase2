import React, {createContext, useState} from "react";

export const DataProviderContext = createContext();

export default function LayoutDataProvider({data, pwa, children, ...props}) {
    const {footer, store, customer} = data
    const {headerContent, navMenuItems, cart, user} = pwa
    return (
        <DataProviderContext.Provider
            value={{
                headerContent,
                navMenuItems,
                footer,
                store,
                customer,
                cart,
                user
            }}>
            {children}
        </DataProviderContext.Provider>
    )
}
