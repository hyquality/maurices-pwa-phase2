import {useRouter} from 'next/router'
import Image from 'next/image'
import ErrorPage from 'next/error'
import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import {getStaticPageData} from "@lib/api";
import {getTheTitle} from "@lib/helpers";
import staticCollectionJson from "../fake_data/dataCollectionJson.json"
import Breadcrumbs from "@components/breadcrumbs";
import PlpList from "@components/templates/plp/plp-list";
//import {useTranslation} from 'next-i18next';

import React from "react";
import PlpDescription from "@components/templates/plp/plp-description";
import PlpFilter from "@components/templates/plp/plp-filter";
import PlpSubcategotyList from "@components/templates/plp/plp-subcategoty-list";
import HeaderTitle from "@components/templates/header-title";

export default function Post({data, collection, preview}) {
    //const {t} = useTranslation('common');
    const {title, slug, products, desc} = collection || {}
    const router = useRouter()

    if (!router.isFallback && !collection?.slug) {
        return <ErrorPage statusCode={404}/>
    }
    return (

        <>
            {data ? (
                <Layout data={data}>
                    <Head>
                        <title>{getTheTitle(`${title}`)}</title>
                    </Head>
                    <Container>
                        <Breadcrumbs/>
                        <HeaderTitle weight={"bold"} size={"large"} tag={"h1"} style={"utopia"}>{title}</HeaderTitle>
                        <PlpSubcategotyList collection={collection}/>
                        <div className="flex">
                            <div className="filter w-1/4">
                                <PlpFilter collection={collection}/>
                            </div>
                            <div className="w-3/4 pb-28">

                                <PlpList data={products}/>
                                {
                                    collection.desc ? (
                                        <PlpDescription data={desc}/>
                                    ) : null
                                }

                            </div>
                        </div>
                    </Container>
                </Layout>
            ) : null}

        </>
    )
}

//import {serverSideTranslations} from 'next-i18next/serverSideTranslations';


export async function getStaticProps({params, preview = false, previewData, locale}) {
    const data = await getStaticPageData();
    //const collection = await getCollection(params.slug, preview, previewData)
    //const collection = await getCollection(params.slug, preview, previewData)
    //const collection = {slug:params.slug}

    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            // ...(await serverSideTranslations(locale, ['common'])),
            data: data,
            preview,
            collection: staticCollectionJson
        }
    }
}

export async function getStaticPaths() {

    return {
        paths: [
            {params: {slug: ['clothing', 'tops']}},
            {params: {slug: ['clothing', 'new']}},
            {params: {slug: ['clothing', 'sweaters']}}
        ],
        fallback: true,
    }
}