import {getHomePageData} from "../lib/api";
import Layout from "@components/layout";
import Head from 'next/head'
import Container from "@components/container";

export default function Home({pageData, preview}) {
    return (
        <>
            <Layout preview={preview} data={pageData.data}>
                <Head>
                    <title>test</title>
                </Head>
                <Container>
                    123
                </Container>
            </Layout>
        </>
    )
}

/*export async function getStaticProps() {
    const { data } = (await getHomePageData()) || {};
    return {
        props: {
            pageData: data
        }
    }
}*/

export async function getServerSideProps({preview = false}) {
    const {data} = (await getHomePageData()) || {};
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            pageData: data,
            preview
        }
    }
}