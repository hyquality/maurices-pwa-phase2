import {useRouter} from 'next/router'
import Image from 'next/image'
import ErrorPage from 'next/error'
import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import { getStaticPageData} from "@lib/api";
import {getTheTitle} from "@lib/helpers";
import staticCollectionJson from "../fake_data/dataCollectionJson.json"
import Link from "next/link";
import { useTranslation } from 'next-i18next';

import React from "react";

export default function Post({data, collection, preview}) {
    const { t } = useTranslation('common');
    const router = useRouter()

    if (!router.isFallback && !collection?.slug) {
        return <ErrorPage statusCode={404}/>
    }
    return (

        <>
            {data ? (
                <Layout data={data}>
                    <Head>
                        <title>{getTheTitle(`${collection.title}`)}</title>
                    </Head>
                    <Container>

                        <Breadcrumbs t={t}/>
                        <h1 className="text-center pb-8 text-4xl  font-utopia">{collection.title}</h1>
                        <div>
                            {
                                collection.subcategories ? (
                                    <ul className="flex justify-between flex-wrap border-b border-gray_border py-8 mb-8">
                                        {
                                            collection.subcategories.map((cat, index) => (
                                                <li className="w-1/8"
                                                    key={"subcategory-" + collection.slug + "-" + index}>

                                                    <Link href={cat.url}>
                                                        <a className="block relative">
                                                            <Image
                                                                src={cat.image}
                                                                alt={cat.title}
                                                                width={200}
                                                                height={300}
                                                            />
                                                            <h4 className="text-sm md:text-xs text-gray_2 md:text-main">{cat.title}</h4>
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>

                                ) : ("")
                            }
                        </div>
                        <div className="flex">
                            <div className="filter w-1/4">
                                <h2>{collection.title}</h2>
                                {
                                    collection.subcategories ? (
                                        <ul>
                                            {
                                                collection.subcategories.map((cat, index) => (
                                                    <li className=""
                                                        key={"subcategory-filter-" + collection.slug + "-" + index}>

                                                        <Link href={cat.url}>
                                                            <a>{cat.title} <span>({cat.qty})</span> </a>
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>

                                    ) : ("")
                                }
                            </div>
                            <div className="w-3/4">

                                {
                                    collection.desc ? (
                                        <div>
                                            <h3>{collection.desc.title}</h3>
                                            <p>{collection.desc.text}</p>
                                        </div>
                                    ) : ("")
                                }

                            </div>
                        </div>
                    </Container>
                </Layout>
            ) : ("")}

        </>
    )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Breadcrumbs from "@components/breadcrumbs";
export async function getStaticProps({params, preview = false, previewData,locale}) {
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
            ...(await serverSideTranslations(locale, ['common'])),
            data: data,
            preview,
            collection: staticCollectionJson
        }
    }
}

export async function getStaticPaths() {

    return {
        paths: [],
        fallback: true,
    }
}