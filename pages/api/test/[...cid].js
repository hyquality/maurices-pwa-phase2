import axios from "axios";
import {objToString} from "@lib/helpers";
export default async function handler(req, res) {
    const {cid} = req.query
    res.setHeader('Cookie', ['type=ninja', 'language=javascript'])
    const url = `https://maurices.hyquality.com/apitest.php`


    //const cookie = req.getHeader('Cookie');
   // res.status(200).json(req.cookies)

    await axios
        .get(url,{
            headers:{
                Cookie: objToString(req.cookies)
            }})
        .then(({data,headers,config  }) => {
            res.status(200).json(data)
        })
        .catch(({err}) => {
            res.status(400).json({err})
        })
}