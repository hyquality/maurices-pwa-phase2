import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import {getStaticPageData} from "@lib/api";
import {bodyOverlay, getTheTitle} from "@lib/helpers";
import staticCollectionJson from "../fake_data/dataCollectionJson.json"
import Breadcrumbs from "@components/breadcrumbs";
import PlpList from "@components/templates/plp/plp-list";
import React, {useState} from "react";
import PlpDescription from "@components/templates/plp/plp-description";
import PlpFilter from "@components/templates/plp/plp-filter";
import PlpSubcategotyList from "@components/templates/plp/plp-subcategoty-list";
import HeaderTitle from "@components/templates/header-title";
import Popup from "../components/templates/popup";
import dynamic from "next/dynamic";

export default function Post({data, collection, preview}) {
    //const {t} = useTranslation('common');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState("");

    const {title, slug, products, desc} = collection || {}
    const router = useRouter()

    if (!router.isFallback && !collection?.slug) {
        return <ErrorPage statusCode={404}/>
    }



    const openQuickView  = (data) => (e) => {

        e.preventDefault()

        let TemplateItem = dynamic(import('../components/templates/plp/plp-quick-view'))
        setPopupContent(<TemplateItem product={data}/>)
        setIsPopupVisible(true)
    }
    const closeQuickView = (e) => {
        e.preventDefault();
        setIsPopupVisible(false)
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

                                <PlpList data={products} openPopup={openQuickView}/>
                                {
                                    collection.desc ? (
                                        <PlpDescription data={desc}/>
                                    ) : null
                                }

                            </div>
                        </div>
                        <Popup content={popupContent} visible={isPopupVisible} closePopup={closeQuickView} className={"w-full max-w-4xl"}/>
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