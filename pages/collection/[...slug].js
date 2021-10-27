import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Layout from '../../components/layout'
import Head from 'next/head'
import {  getPwaData, getStaticPageData} from "@lib/api";
import {getTheTitle} from "@lib/helpers";
import staticCollectionJson from "../../fake_data/dataCollectionJson.json"
import {useEffect} from "react";
import axios from "axios";
import {REACT_APP_API_URL} from "@lib/constants";

export default function Post({data, pwa, collection, preview}) {
    const router = useRouter()
/*    if (collection) console.log(collection);
    if (!router.isFallback && !collection?.slug) {
        return <ErrorPage statusCode={404}/>
    }*/

    useEffect(()=>{
        console.log(pwa)

    })
    return (
        <>
            {data ? (
                <Layout data={data} pwa={pwa}>
                    <Head>
                        <title>{getTheTitle(`Test`)}</title>
                    </Head>
                    <Container>
                        <div className="flex">
                            <div className="filter w-1/4">collection</div>
                            <div className="w-3/4">

      13

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
    const pwa = (await getPwaData()) || {};
   // const testApi = await apiCall("content/header/reward");
    //const testApi = await axios.get(`${REACT_APP_API_URL}content/header/reward/index.json`);
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
            pwa:pwa,
            //testApi: testApi.data,
            preview,
            collection: {}
        }
    }
}

export async function getStaticPaths() {

    return {
        paths: [],
        fallback: true,
    }
}