import React, {useEffect, useState} from "react";
import {getPwaData} from "@lib/api";
import Layout from "@components/layout";
import Head from 'next/head'
import {getTheTitle} from "@lib/helpers";
import Container from "@components/container";

import SearchWrapper from "@components/search-wrapper";
import {useRouter} from "next/router";

export default function Search({pwa, preview}) {
    const router = useRouter()
    const {key} = router.query

    return (
        <>
            {pwa ? (
                <Layout pwa={pwa}>
                    <Head>
                        <title>{getTheTitle(`Product`)}</title>
                    </Head>
                    <Container>
                        <SearchWrapper searchKey={key}/>
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
        paths: [],
        fallback: true,
    }
}