import React, {useEffect, useState} from "react";
import {getStaticPageData, getIndexPageData, getInstaFeedData, getPwaData, getIndexPwaData} from "@lib/api";
import Layout from "@components/layout";
import Head from 'next/head'
import {getTheTitle, mapHomeComponentsJson} from "@lib/helpers";
import Templates from "@components/templates/templates";
import InstaSlide from "@components/templates/insta-slide";
import Hero from "@components/templates/banner/hero";
import Promo from "@components/templates/banner/promo";
import Grid from "@components/templates/layout/grid";
import SliderBanner from "@components/templates/banner/slider-banner";
import Carousel from "@components/templates/carousel";

export default function Home({data, index, pwa, indexPwa}) {
    const [gridData, setGridData] = useState(false);
    const [sliderBannerData, setSliderBannerData] = useState(false);
    const [carousel, setCarousel] = useState(false);
    const [catalogGrid, setCatalogGrid] = useState(false);
    const [insta, setInsta] = useState(false);
    useEffect(() => {
        indexPwa.grid.gridLayoutInfo.columnsMobile = indexPwa.grid.gridLayoutInfo.columnsMobile === 0 ? 1 : indexPwa.grid.gridLayoutInfo.columnsMobile

        setGridData(mapHomeComponentsJson(indexPwa.grid.gridLayoutInfo, "./accent/accent", "accent-banner"))

        setSliderBannerData(mapHomeComponentsJson(indexPwa.sliderBanner.sliderInfo, "./accent/accent", "accent-banner"))

        setCarousel(mapHomeComponentsJson(indexPwa.carousel.carouselInfo, "./accent/accent", "accent-banner"))

        setCatalogGrid(mapHomeComponentsJson(indexPwa.catalogGrid.gridLayoutInfo, "./banner/simple-banner", "simple-banner"))

        setInsta(mapHomeComponentsJson(indexPwa.insta.sliderInfo, "./accent/accent", "accent-banner"))

    }, [indexPwa])
    return (
        <>
            <Layout data={data} pwa={pwa}>
                <Head>
                    <title>{getTheTitle("Home")}</title>
                </Head>
                <div className="min-h-screen">
                    {
                        indexPwa.hero && (
                            <Hero {...indexPwa.hero.homePageInfo}/>
                        )
                    }
                    {

                        indexPwa.promo1 && (
                            <Promo {...indexPwa.promo1.homePageInfo}/>
                        )
                    }
                    {

                        gridData && (
                            <Grid {...gridData}/>
                        )
                    }
                    {

                        sliderBannerData && (
                            <SliderBanner {...sliderBannerData}/>
                        )
                    }

                    {
                        carousel && (
                            <div className={"overflow-hidden"}><Carousel {...carousel}/></div>
                        )
                    }
                    {

                        catalogGrid && (
                            <Grid {...catalogGrid}/>
                        )
                    }
                    {

                        indexPwa.promo2 && (
                            <Promo {...indexPwa.promo2.homePageInfo}/>
                        )
                    }
                    {

                        insta && (
                            <InstaSlide {...insta}/>
                        )
                    }

{/*                    {
                        index.templates ? (
                            <Templates templates={index.templates}/>
                        ) : null
                    }*/}


                </div>
            </Layout>
        </>
    )
}

export async function getStaticProps({preview = false}) {
    const data = (await getStaticPageData()) || {};
    const index = (await getIndexPageData()) || {};
    const pwa = (await getPwaData()) || {};
    const indexPwa = (await getIndexPwaData()) || {};
    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            data: data,
            index: index.data,
            pwa: pwa,
            indexPwa: indexPwa,
            preview
        }
    }
}