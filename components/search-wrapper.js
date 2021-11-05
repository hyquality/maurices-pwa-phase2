import PlpContent from "@components/plp-content";
import React, {useContext, useEffect, useState} from "react";
import useSWR from "swr";
import {DataProviderContext} from "@components/layout-data-provider";
import HeaderTitle from "@components/templates/header-title";

const fetcher = async url => {
    const res = await fetch(url)

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        // Attach extra info to the error object.
        error.info = await res.json()
        error.status = res.status
        throw error
    }

    return res.json()
}
export default function SearchWrapper({searchKey}) {
    const {
        instantSearchState, setInstantSearchState
    } = useContext(DataProviderContext)

    const [searchPageKey, setSearchPageKey] = useState(searchKey)
    const [catalogData, setCatalogData] = useState(false)
    const [apiUrl, setApiUrl] = useState(false)

    const {
        data,
        error
    } = useSWR(apiUrl ? apiUrl: null, fetcher)

    useEffect(() => {
        if (data) {
            setCatalogData(data.data)
        }
    }, [data])

    useEffect(() => {
        if (error) {
            setCatalogData(false)
        }
    }, [error])

    useEffect(() => {
        if (searchKey) {
            setSearchPageKey(searchKey)
            let apiURL = searchPageKey ? `/api/search/${searchPageKey}` : null

            setApiUrl(apiURL)
        }
    }, [searchKey])


    const loadFilteredCatalog = (fasets,selectedSort,catalogListIndex,searchInputValue="") =>  {

        let vars = `startIndex${catalogListIndex.startIndex}&pageSize=${catalogListIndex.pageSize}&sortOption=${selectedSort}`;
        const names = fasets.map(function (faset) {
            return faset.short;
        });
        if(names.length>0){
            vars+= "&facet="+names.join("&facet=")
        }

        let apiURL = searchPageKey ? `/api/search/${searchPageKey}/&${vars}` : null

        setApiUrl(apiURL)
    }
    return (
<>

    <HeaderTitle tag={"h2"} position={"text-left"} size={"text-2xl"} style={"utopia"} weight={"bold"} className={"py-6"}>{`Search result for: ${searchPageKey}`}</HeaderTitle>
    <PlpContent loadFilteredCatalog={loadFilteredCatalog} data={data} error={error} setApiUrl={setApiUrl} catalogData={catalogData} isSearch={true}/>
</>
    )
}