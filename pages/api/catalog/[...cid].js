import {REACT_APP_API_URL, REACT_APP_MODE} from "@lib/constants";
import {localApiCall} from "@lib/api";

export default async function handler(req, res) {
    const {cid} = req.query

    const url = `${REACT_APP_API_URL}catalog/category/${cid[0]}/product${cid[1]!==undefined?`${parseInt(REACT_APP_MODE) ? "/filtered.json":""}?${cid[1]}`:`${parseInt(REACT_APP_MODE) ? "/index.json":""}`}`

    await localApiCall(req.cookies,url)
        .then(({data}) => {
            data.timestamp=Date.now()
            res.status(200).json({data})
        })
        .catch(({err}) => {
            res.status(400).json({err})
        })
}