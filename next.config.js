//const {i18n} = require('./next-i18next.config');
const withPWA = require("next-pwa");
const path = require('path')
module.exports = withPWA({
   // i18n,
    target: "serverless",
    //target: "experimental-serverless-trace",
    pwa: {
        dest: "public",
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'sass')],
    },
    webpack: (config, options) => {
        config.module.rules.push(
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        )
        return config
    },
});
