import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '@components/container'
import Layout from '@components/layout'
import Head from 'next/head'
import {REACT_APP_API_URL, REACT_APP_MODE} from "@lib/constants";
import {apiCall, getPwaData, getStaticPageData} from "@lib/api";
import {getTheTitle} from "@lib/helpers";
import staticCollectionJson from "../../fake_data/dataCollectionJson.json"
import Breadcrumbs from "@components/breadcrumbs";
import PlpList from "@components/templates/plp/plp-list";
import React, {useEffect, useState} from "react";
import PlpDescription from "@components/templates/plp/plp-description";
import PlpFilter from "@components/templates/plp/filter/plp-filter";
import PlpSubcategotyList from "@components/templates/plp/plp-subcategoty-list";
import HeaderTitle from "@components/templates/header-title";
import Popup from "@components/templates/popup";
import dynamic from "next/dynamic";
import FilterContainer from "@components/templates/plp/filter/filter-container";
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Post({params, plp, collection, pwa, preview}) {
    //const {t} = useTranslation('common');
    const router = useRouter()
    const {slug} = router.query

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState("");

    const {
        data,
        error
    } = useSWR(slug ? `${REACT_APP_API_URL}catalog/category/${slug}/product${parseInt(REACT_APP_MODE) && "/index.json"}` : null, fetcher)

    const {title, desc} = collection || {}
    const [catalogData, setCatalogData] = useState(false);

    useEffect(() => {

        if (data) {
            setCatalogData(data)
        }
    }, [data])

    const openQuickView = (data) => (e) => {
        e.preventDefault()
        let TemplateItem = dynamic(import('@components/templates/plp/plp-quick-view'))
        setPopupContent(<TemplateItem product={data}/>)
        setIsPopupVisible(true)
    }

    const closeQuickView = (e) => {
        e.preventDefault();
        setIsPopupVisible(false)
    }


    if (!router.isFallback && !collection?.slug) {
        return <ErrorPage statusCode={404}/>
    }

    return (
        <>
            {plp ? (
                <Layout data={plp} pwa={pwa}>
                    <Head>
                        <title>{getTheTitle(`${title}`)}</title>
                    </Head>
                    <Container>
                        {
                            error && (
                                <div>failed to load</div>
                            )
                        }
                        {
                            !data && (
                                <div>loading...</div>
                            )
                        }
                        {
                            catalogData && (
                                <>

                                    <Breadcrumbs/>
                                    <HeaderTitle weight={"bold"} size={"text-4xl"} tag={"h1"}
                                                 style={"utopia"}>{title}</HeaderTitle>
                                    <PlpSubcategotyList subcategoryCallouts={catalogData.subcategoryCallouts}/>
                                    <FilterContainer collection={collection} catalogData={catalogData}>
                                        <div className="flex">
                                            <div className="filter w-1/4">
                                               <PlpFilter/>
                                            </div>
                                            <div className="w-3/4 pb-28">

                                                <PlpList openPopup={openQuickView}/>
                                                {
                                                    collection.desc ? (
                                                        <PlpDescription data={desc}/>
                                                    ) : null
                                                }

                                            </div>
                                        </div>
                                    </FilterContainer>
                                    <Popup content={popupContent} visible={isPopupVisible} closePopup={closeQuickView}
                                           className={"w-full max-w-5xl"}/>
                                </>
                            )
                        }

                    </Container>
                </Layout>
            ) : null}

        </>
    )
}

//import {serverSideTranslations} from 'next-i18next/serverSideTranslations';


export async function getStaticProps({params, preview = false, previewData, locale}) {
    const data = await getStaticPageData();
    const pwa = (await getPwaData()) || {};

    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            // ...(await serverSideTranslations(locale, ['common'])),
            params: params,
            plp: data,
            pwa: pwa,
            preview,
            collection: staticCollectionJson
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