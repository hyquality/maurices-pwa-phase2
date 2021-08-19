import axios from "axios";
import {DOMAIN_URL} from "./constants";

export async function getHomePageData() {
    const apiURL = `${process.env.DOMAIN_URL}/dataHomeJson.json`
    return await axios.get(apiURL);
}

export async function getNavData() {
    const apiNavURL = `${process.env.DOMAIN_URL}/dataNavJson.json`
    return await axios.get(apiNavURL);
}

export async function getSearchData(query,file) {
    const apiNavURL = `${DOMAIN_URL}/${file}`

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