import axios from "axios";
import {REACT_APP_API_URL, REACT_APP_MODE} from "@lib/constants";

export default async function handler(req, res) {
    const {cid} = req.query
    console.log(cid)
    const url = `${REACT_APP_API_URL}catalog/category/${cid[0]}/product${cid[1]!==undefined?`${parseInt(REACT_APP_MODE) ? "/filtered.json":""}?${cid[1]}`:`${parseInt(REACT_APP_MODE) ? "/index.json":""}`}`

   // res.end(`Post: ${url}`)
    await axios
        .get(url)
        .then(({data}) => {
            res.status(200).json({data})
        })
        .catch(({err}) => {
            res.status(400).json({err})
        })
}