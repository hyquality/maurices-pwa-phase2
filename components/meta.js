import Head from 'next/head'
import {CMS_NAME, HOME_OG_IMAGE_URL} from '../lib/constants'

export default function Meta() {
    return (

        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <link rel="manifest" href="/manifest.json"/>
            <link
                href="/icons/favicon.ico"
                rel="icon"
                type="image/png"
                sizes="16x16"
            />
            <link rel="apple-touch-icon" href="/icons/icon-192x192.png"/>

            <meta name="msapplication-TileColor" content="#000000"/>
            <meta name="theme-color" content="#5ab7b2" />

            <meta
                name="keywords"
                content="Women's Fashion | Denim, Accessories, Plus Size & More | maurices"
            />
            <meta
                name="description"
                content={`At maurices, we offer a wide selection of women's clothing from sizes 0-24, including jeans, tops, dresses and more. Enjoy free shipping on orders over $50!`}
            />
        </Head>
    )
}