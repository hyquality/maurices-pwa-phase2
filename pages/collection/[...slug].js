import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Layout from '../../components/layout'
import Head from 'next/head'
import {getCollection, getNavData, getStaticPageData} from "@lib/api";
import {getTheTitle} from "@lib/helpers";
import staticCollectionJson from "../../fake_data/dataCollectionJson.json"

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
                        <div className="flex">
                            <div className="filter w-1/4">collection</div>
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