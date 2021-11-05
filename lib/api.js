import axios from "axios";
import {REACT_APP_API_URL, REACT_APP_MODE} from "./constants";

import {mapNavJson} from "@lib/navMaping";
import {objToString} from "@lib/helpers";

export const fetcher = (url) => fetch(url).then((res) => res.json())

export async function getPwaData() {
    const reward = await apiCall("content/header/reward");
    const promo = await apiCall("content/header/promo");
    const announcement = await apiCall("content/header/announcementBar");

    const calloutItems = await apiCall("content/footer/calloutItems");
    const footerColumns = await apiCall("content/footer/columns");
    const callToAction = await apiCall("content/footer/callToAction");
    const socialMedia = await apiCall("content/footer/socialMedia");
    const subfooter = await apiCall("content/footer/subfooter");
    return {
        headerContent: {
            promoInfo: promo.data,
            announcementBar: announcement.data,
            loyaltyInfo: reward.data,
        },
        footerContent: {
            calloutItemList: calloutItems.data,
            footerColumns: footerColumns.data,
            callToAction: callToAction.data,
            socialMedia: socialMedia.data,
            subfooter: subfooter.data,
        },
        navMenuItems: (await mapNavJson("catalog/navigationMenu")) || {}
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

export async function localApiCall(cookies,url=false,slug=false,vars=false) {

    const apiUrl = url?url:`${REACT_APP_API_URL}${slug}${parseInt(REACT_APP_MODE) ? "/index.json":""}${vars?`?${vars}`:``}`

     return await axios
        .get(apiUrl, {
            headers:{
                Cookie: objToString(cookies)
            }});
}
export async function apiCall(slug) {
    let apiURL = `${REACT_APP_API_URL}${slug}${parseInt(REACT_APP_MODE) ? "/index.json" : ""}`;
    return await axios.get(apiURL, {withCredentials: true});
}
