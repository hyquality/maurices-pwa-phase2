import axios from "axios";
import {REACT_APP_API_URL, REACT_APP_MODE} from "./constants";
import staticDataJson from "../fake_data/dataStaticJson.json"
import dataIndexJson from "../fake_data/dataIndexJson.json"

import {mapNavJson} from "@lib/navMaping";

export async function getPwaData() {
    const cart = await apiCall("cart");
    const reward = await apiCall("content/header/reward");
    const promo = await apiCall("content/header/promo");
    const announcement = await apiCall("content/header/announcementBar");
    const profile = await apiCall("profile");
    return {
        headerContent: {
            promoInfo: promo.data,
            announcementBar: announcement.data,
            loyaltyInfo: reward.data,
        },
        navMenuItems: (await mapNavJson("catalog/navigationMenu")) || {},
        cart: cart.data,
        user: profile.data,
    };
}

export async function getIndexPwaData() {
    const hero = await apiCall("content/home/banner/hero");
    const promo1 = await apiCall("content/home/banner/promo1");
    const grid = await apiCall("content/home/layout/grid");
    const sliderBanner = await apiCall("content/home/layout/slider-banner");
    const carousel = await apiCall("content/home/carousel");
    const catalogGrid = await apiCall("content/home/layout/catalog-grid");
    const promo2 = await apiCall("content/home/banner/promo2");
    const insta = await apiCall("content/home/layout/insta-slide");
    return {
        hero: hero.data,
        promo1: promo1.data,
        grid: grid.data,
        sliderBanner: sliderBanner.data,
        carousel: carousel.data,
        catalogGrid: catalogGrid.data,
        promo2: promo2.data,
        insta: insta.data,
    };
}

export async function getIndexPageData() {
    // const apiURL = `${process.env.DOMAIN_URL}/dataIndexJson.json`
    // return await axios.get(apiURL);
    return await dataIndexJson;
}

export async function getHeaderFooterData() {
    // const apiURL = `${process.env.DOMAIN_URL}/dataStaticJson.json`
    // return await axios.get(apiURL);
    return staticDataJson;
}

export async function getStaticPageData() {
    const data1 = (await getHeaderFooterData()) || {};

    const data = {
        // header: await data1.data.HeaderContent,
        footer: await data1.data.footerContent,
        store: await data1.data.store,
        //customer: await data1.data.customer,

    }

    return await data;
}

export async function getSearchData(query, file) {

    const apiNavURL = `/fake_data/${file}`
    return await fetch(`${apiNavURL}`)
        .then(res => res.json())
        .then(
            (result) => {
                //console.log(result)
                return result;
            },

            (error) => {
                console.log(error)
            }
        )
    /*    return await axios.get(apiNavURL, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        });*/
}

export async function apiCall(slug) {
    let apiURL = `${REACT_APP_API_URL}${slug}${parseInt(REACT_APP_MODE) && "/index.json"}`;
    //let apiURL = `/api/${slug}${parseInt(REACT_APP_MODE) && "/index.json"}`;

    return await axios.get(apiURL);
}
