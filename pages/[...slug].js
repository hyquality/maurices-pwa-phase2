import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import {getCollection, getNavData, getStaticPageData} from "@lib/api";
import {getTheTitle} from "@lib/helpers";
import staticCollectionJson from "../fake_data/dataCollectionJson.json"
import Link from "next/link";
import Icon from "@components/icon";
import SimpleBanner from "@components/templates/banner/simple-banner";
import Template from "@components/templates/template";
import React from "react";

export default function Post({data, collection, preview}) {
    const router = useRouter()
    if (collection) console.log(collection);
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
                        <h1>{collection.title}</h1>
                        <div>
                            {
                                collection.subcategories ? (
                                    <ul className="flex">
                                        {
                                            collection.subcategories.map((cat, index) => (
                                                <li className=""
                                                    key={"subcategory-" + collection.slug + "-" + index}>

                                                    <Link href={cat.url}>
                                                        <a>{index}
                                                            <img className="hidden md:block pb-2.5" src={cat.image}/>
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

export async function getStaticProps({params, preview = false, previewData}) {
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