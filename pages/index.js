import React from "react";
import {getStaticPageData, getIndexPageData, getInstaFeedData} from "@lib/api";
import Layout from "@components/layout";
import Head from 'next/head'
import {getTheTitle} from "@lib/helpers";
import Templates from "@components/templates/templates";
import InstaSlide from "@components/templates/insta-slide";

export default function Home({data, index,insta}) {

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

                    <div className={`insta-slide`}>
                        <InstaSlide
                            paddingBottom={true}
                            title={"SHOW US HOW YOU"}
                            hash={"discovermaurices"}
                            text={"Share your style on Instagram using <strong>#discovermaurices</strong> for a chance to be featured here."}
                            buttonTitle={"VIEW GALLERY"}
                            ButtonUrl={"#"}
                            data={insta}
                        />
                    </div>

                </div>
            </Layout>
        </>
    )
}

export async function getStaticProps({preview = false}) {
    const data = (await getStaticPageData()) || {};
    const index = (await getIndexPageData()) || {};
    const insta = (await getInstaFeedData()) || {};

    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            data: data,
            index: index.data,
            insta: insta.data,
            preview
        }
    }
}