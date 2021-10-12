import React, {createContext, useState} from "react";

export const DataProviderContext = createContext();

export default function LayoutDataProvider({data, children, ...props}) {
    const {header, footer, store, customer, minicart, mainNav} = data

    return (
        <DataProviderContext.Provider
            value={{
                header,
                footer,
                store,
                customer,
                minicart,
                mainNav
            }}>
            {children}
        </DataProviderContext.Provider>
    )
}
