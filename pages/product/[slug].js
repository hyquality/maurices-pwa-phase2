import {useRouter} from 'next/router'
import Container from '@components/container'
import Layout from '@components/layout'
import Head from 'next/head'
import {getPwaData} from "@lib/api";
import {getTheTitle} from "@lib/helpers";

import React from "react";

export default function Product({pwa, preview}) {
    const router = useRouter()
    const {slug} = router.query


    return (
        <>
            {pwa ? (
                <Layout pwa={pwa}>
                    <Head>
                        <title>{getTheTitle(`Product`)}</title>
                    </Head>
                    <Container>
                        {slug}
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