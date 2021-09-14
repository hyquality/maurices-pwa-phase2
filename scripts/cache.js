const fs = require('fs')


async function getSearchData(query,file) {
    const apiNavURL = `'https://maurices.hyquality.com/api'/${file}`

    return await fetch(`${apiNavURL}`)
        .then(res => res.json())
        .then(
            (result) => {
                //console.log(result)
                return result;
            },

            (error) => {
                console.log(error)
            }
        )
    /*    return await axios.get(apiNavURL, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        });*/
}

async function resultData() {
    let file = "dataSearchJson.json"
    const searchData = (await getSearchData("", file)) || {};
    return `export const results = ${JSON.stringify(searchData.data.result)}`
}

try {
    fs.readdirSync('cache')
} catch (e) {
    fs.mkdirSync('cache')
}

fs.writeFile('cache/data.js', resultData(), function (err) {
    if (err) return console.log(err);
    console.log('Result cached.');
})