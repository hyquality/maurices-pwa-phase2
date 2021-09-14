import axios from "axios";
import {DOMAIN_URL} from "./constants";
import staticDataJson from "../fake_data/dataStaticJson.json"
import dataNavJson from "../fake_data/dataNavJson.json"

export async function getHeaderFooterData() {
   // const apiURL = `${process.env.DOMAIN_URL}/dataStaticJson.json`
   // return await axios.get(apiURL);
    return staticDataJson;
}

export async function getNavData() {
    //const apiNavURL = `${process.env.DOMAIN_URL}/dataNavJson.json`
    //return await axios.get(apiNavURL);
    return dataNavJson;
}

export async function getStaticPageData() {
    const data1 = (await getHeaderFooterData()) || {};
    const data2 = (await getNavData()) || {};

/*    return {
        header: data1.data.data.HeaderContent,
        footer: data1.data.data.footerContent,
        store: data1.data.data.store,
        customer: data1.data.data.customer,
        minicart: data1.data.data.minicart,
        mainNav: data2.data.data
    };*/
    const data = {
        header: await data1.data.HeaderContent,
        footer: await data1.data.footerContent,
        store: await data1.data.store,
        customer: await data1.data.customer,
        minicart: await data1.data.minicart,
        mainNav: await data2.data
    }

    return await data;
}

export async function getSearchData(query,file) {
    //const apiNavURL = `${DOMAIN_URL}/${file}`
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


export async function getCollection(slug, preview, previewData) {
    const apiCollectionURL = `${process.env.DOMAIN_URL}/dataCollectionJson.json`
    return await axios.get(apiCollectionURL);
}
