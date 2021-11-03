import axios from "axios";
import {REACT_APP_API_URL, REACT_APP_MODE} from "@lib/constants";

export default async function handler(req, res) {
    const {key} = req.query
   const url = `${REACT_APP_API_URL}catalog/typeahead${parseInt(REACT_APP_MODE) ? "/index.json":""}?keywords=${key[0]}`

    await axios
        .get(url)
        .then(({data}) => {
            res.status(200).json({data})
        })
        .catch(({err}) => {
            res.status(400).json({err})
        })
}