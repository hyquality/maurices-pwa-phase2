import axios from "axios";
import {REACT_APP_API_URL, REACT_APP_MODE} from "./constants";

import {mapNavJson} from "@lib/navMaping";
import {objToString} from "@lib/helpers";

export async function getPwaData(req) {
    const reward = await apiCall("content/header/reward",req);
    const promo = await apiCall("content/header/promo",req);
    const announcement = await apiCall("content/header/announcementBar",req);

    const calloutItems = await apiCall("content/footer/calloutItems",req);
    const footerColumns = await apiCall("content/footer/columns",req);
    const callToAction = await apiCall("content/footer/callToAction",req);
    const socialMedia = await apiCall("content/footer/socialMedia",req);
    const subfooter = await apiCall("content/footer/subfooter",req);
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

export async function getIndexPwaData(req) {
    const hero = await apiCall("content/home/banner/hero",req);
    const promo1 = await apiCall("content/home/banner/promo1",req);
    const grid = await apiCall("content/home/layout/grid",req);
    const sliderBanner = await apiCall("content/home/layout/slider-banner",req);
    const carousel = await apiCall("content/home/carousel",req);
    const catalogGrid = await apiCall("content/home/layout/catalog-grid",req);
    const promo2 = await apiCall("content/home/banner/promo2",req);
    const insta = await apiCall("content/home/layout/insta-slide",req);
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
export async function apiCall(slug,req={}) {
    let apiURL = `${REACT_APP_API_URL}${slug}${parseInt(REACT_APP_MODE) ? "/index.json" : ""}`;
    return await axios.get(apiURL, {
        headers:{
            Cookie: objToString(req.cookies)
        }});
}
