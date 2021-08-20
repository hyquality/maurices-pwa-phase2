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
                    <div className="min-h-screen pt-20">

                        <div>
                            <h2>What is Lorem Ipsum?</h2>
                            <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div>
                            <h2>What is Lorem Ipsum?</h2>
                            <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div>
                            <h2>What is Lorem Ipsum?</h2>
                            <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div>
                            <h2>What is Lorem Ipsum?</h2>
                            <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div>
                            <h2>What is Lorem Ipsum?</h2>
                            <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </div>
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