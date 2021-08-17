import {getHomePageData, getNavData} from "../lib/api";
import Layout from "@components/layout";
import Head from 'next/head'
import Container from "@components/container";

export default function Home({pageData, mainNav, preview}) {
    return (
        <>
            <Layout preview={preview} data={pageData.data} nav={mainNav}>
                <Head>
                    <title>Maurices React App</title>
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
    const data1 = (await getHomePageData()) || {};
    const data2 = (await getNavData()) || {};
    if (!data1.data || !data2.data ) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            pageData: data1.data,
            mainNav: data2.data,
            preview
        }
    }
}