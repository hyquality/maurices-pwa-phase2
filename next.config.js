//const {i18n} = require('./next-i18next.config');
const withPWA = require("next-pwa");
const path = require('path')
module.exports = withPWA({
   // i18n,
    target: "serverless",
    //target: "experimental-serverless-trace",
    images: {
        disableStaticImages: true,
        domains: ['mauricesprodatg.scene7.com',]
    },
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
                loader: 'url-loader',
                options: {
                    limit: 100000
                }

            }
        )
        return config
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/pwa/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
/*    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://maurices.hyquality.com/pwa/api/:path*',
            },
        ]
    },*/
});
