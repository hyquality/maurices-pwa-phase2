import React, {useContext, useEffect, useState} from "react";
import {getPwaData, getIndexPwaData} from "@lib/api";
import Layout from "@components/layout";
import Head from 'next/head'
import {getTheTitle} from "@lib/helpers";
import Container from "@components/container";

import useSWR from "swr";
import PlpContent from "@components/plp-content";

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
export default function Search({pwa}) {

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
            console.log(error)
        }
    }, [error])

    const loadFilteredCatalog = (fasets,selectedSort,catalogListIndex,searchInputValue="") =>  {

        let vars = `startIndex${catalogListIndex.startIndex}&pageSize=${catalogListIndex.pageSize}&sortOption=${selectedSort}`;
        const names = fasets.map(function (faset) {
            return faset.short;
        });
        if(names.length>0){
            vars+= "&facet="+names.join("&facet=")
        }

        let apiURL = searchInputValue ? `/api/search/${searchInputValue}/${vars}` : null

        setApiUrl(apiURL)
    }
    return (
        <>
            <Layout pwa={pwa}>
                <Head>
                    <title>{getTheTitle(`Search`)}</title>
                </Head>
                <Container>
                    <PlpContent loadFilteredCatalog={loadFilteredCatalog} data={data} error={error} setApiUrl={setApiUrl} catalogData={catalogData} isSearch={true}/>
                </Container>

            </Layout>
        </>
    )
}

export async function getStaticProps({preview = false}) {
    const pwa = (await getPwaData()) || {};
    if (!pwa) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            pwa: pwa,
            preview
        }
    }
}