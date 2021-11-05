import {useRouter} from 'next/router'
import Container from '@components/container'
import Layout from '@components/layout'
import Head from 'next/head'
import {getPwaData} from "@lib/api";
import {getTheTitle} from "@lib/helpers";
import React, {useEffect, useState} from "react";
import useSWR from 'swr'
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
export default function Post({pwa, preview}) {
    const router = useRouter()
    const {slug} = router.query

    const [catalogData, setCatalogData] = useState(false)
    const [apiUrl, setApiUrl] = useState("/api/catalog/slug")

    const {
        data,
        error
    } = useSWR(slug ? apiUrl.replace("slug", slug): null, fetcher)

    useEffect(() => {
        if (data) {
              setCatalogData(data.data)
        }
    }, [data,slug])

    useEffect(() => {
        if (error) {
            setCatalogData(false)
            console.log(error)
        }
    }, [error])

    const loadFilteredCatalog = (fasets,selectedSort,catalogListIndex) =>  {

        let vars = `startIndex${catalogListIndex.startIndex}&pageSize=${catalogListIndex.pageSize}&sortOption=${selectedSort}`;
        const names = fasets.map(function (faset) {
            return faset.short;
        });
        if(names.length>0){
            vars+= "&facet="+names.join("&facet=")
        }

        let apiURL = slug ? `/api/catalog/${slug}/${vars}` : null

        setApiUrl(apiURL)
    }
    return (
        <>
            {pwa ? (
                <Layout pwa={pwa}>
                    <Head>
                        <title>{getTheTitle(`${catalogData?catalogData.categoryDisplayName:"Category not found"}`)}</title>
                    </Head>
                    <Container>
                        <PlpContent loadFilteredCatalog={loadFilteredCatalog} data={data} error={error} setApiUrl={setApiUrl} catalogData={catalogData}/>
                    </Container>
                </Layout>
            ) : null}

        </>
    )
}
export async function getStaticProps({params, preview = false, previewData, locale}) {
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

export async function getStaticPaths() {

    return {
        paths: [
            /*            {params: {slug: ['clothing', 'tops']}},
                        {params: {slug: ['clothing', 'new']}},
                        {params: {slug: ['clothing', 'sweaters']}}*/
        ],
        fallback: true,
    }
}