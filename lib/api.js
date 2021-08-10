import axios from "axios";
export async function getHomePageData() {
    //const { data } = await axios.get('/data.json');
    //return await fetch('http://localhost:3000/data.json');
    const apiURL = `${process.env.DOMAIN_URL}/dataHomeJson.json`
    return await axios.get(apiURL);
}