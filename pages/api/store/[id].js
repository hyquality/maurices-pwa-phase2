import {localApiCall} from "@lib/api";

export default async function handler(req, res) {
    const {id} = req.query
    await localApiCall(req.cookies,false,`store/${id}`)
        .then(({data}) => {
            res.status(200).json({data})
        })
        .catch(({err}) => {
            res.status(400).json({err})
        })
}