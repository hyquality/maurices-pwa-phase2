import {REACT_APP_API_URL, REACT_APP_MODE} from "@lib/constants";
import axios from "axios";
import {objToString} from "@lib/helpers";

export default async function handler(req, res) {

    const apiUrl = `${REACT_APP_API_URL}session/token${parseInt(REACT_APP_MODE) ? "/index.php" : ""}`

    await axios
        .get(apiUrl, {
            headers: {
                Cookie: objToString(req.cookies)// `JSESSIONID=${req.cookies.JSESSIONID};`
            }
        }).then((response) => {
            res.setHeader('Set-Cookie', response.headers["set-cookie"]);
            res.status(200).json(response.data)
        })
        .catch(({err}) => {
            res.status(400).json({err})
        })
}