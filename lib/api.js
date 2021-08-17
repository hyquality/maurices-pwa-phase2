import axios from "axios";
export async function getHomePageData() {
    const apiURL = `${process.env.DOMAIN_URL}/dataHomeJson.json`
    return await axios.get(apiURL);
}

export async function getNavData() {
    const apiNavURL = `${process.env.DOMAIN_URL}/dataNavJson.json`
    return await axios.get(apiNavURL);
}