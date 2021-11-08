import {localApiCall} from "@lib/api";

export default async function handler(req, res) {

    await localApiCall(req.cookies,false,"content/header/reward")
        .then(({data}) => {
            res.status(200).json({data})
        })
        .catch(({err}) => {
            res.status(400).json({err})
        })
}