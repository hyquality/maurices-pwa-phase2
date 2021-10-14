import {getStaticPageData,getIndexPageData} from "@lib/api";
import Layout from "@components/layout";
import Head from 'next/head'
import Container from "@components/container";
import {getTheTitle} from "@lib/helpers";
import Templates from "@components/templates/templates";
import React from "react";

export default function Home({data,index}) {
    return (
        <>
            <Layout data={data}>
                <Head>
                    <title>{getTheTitle("Home")}</title>
                </Head>
                <div className="min-h-screen">
                    {
                        index.templates ? (
                            <Templates templates={index.templates}/>
                        ) : null
                    }

                </div>
            </Layout>
        </>
    )
}

export async function getStaticProps({preview = false}) {
    const data = (await getStaticPageData()) || {};
    const index = (await getIndexPageData()) || {};

    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            data: data,
            index: index.data,
            preview
        }
    }
}