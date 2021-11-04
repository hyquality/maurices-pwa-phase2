import {localApiCall} from "@lib/api";

export default async function handler(req, res) {
    const {key} = req.query

    await localApiCall(
        req.cookies,
        false,
        "catalog/product",
        `keywords=${key[0]}&startIndex=1&pageSize=30`
    )
        .then(({data}) => {
            res.status(200).json({data})
        })
        .catch(({err}) => {
            res.status(400).json({err})
        })
}