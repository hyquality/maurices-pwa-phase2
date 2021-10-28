import React, {useState, useEffect} from 'react';
import {window, document} from "browser-monads";
import {MOBILE_BREAKPOINT, SITE_TILE} from "@lib/constants";

export async function bodyOverlay(mode = 0) {
    switch (mode) {
        case 1:
            document.body.classList.add('on')
            break;
        case 2:
            document.body.classList.remove('on')
            break;
        default:
            document.body.classList.toggle('on')
    }
}

export async function openMainMenu(mode = 0) {
    switch (mode) {
        case 1:
            document.body.classList.add('menu-opened')
            break;
        case 2:
            document.body.classList.remove('menu-opened')
            break;
        default:
            document.body.classList.toggle('menu-opened')
    }
}

export async function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}


const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export function useCurrentWidth() {
    // save current window width in the state object
    let [width, setWidth] = useState(getWidth());

    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null;
        const resizeListener = () => {
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId);
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(() => setWidth(getWidth()), 150);
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);
        resizeListener()
        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    return width;
}

export function getCurrentWidth() {
    return parseInt(getWidth());
}

export function isMobile() {
    if (getCurrentWidth() <= 768) return true
    return false
}

export function isDescktop() {
    if (getCurrentWidth() > 768) return true
    return false
}

export function getTheTitle(title) {
    return `${title} - ${SITE_TILE}`
}


export function getVariantAttribute(variants, property) {
    let temp = []
    let data = [];
    variants.map((variant) => (
        variant.attributes[property] ? (
            !temp[variant.attributes[property].short] ? (
                temp[variant.attributes[property].short] = {
                    title: variant.attributes[property].title,
                    short: variant.attributes[property].short,
                    key: property
                }
            ) : null
        ) : null


    ))
    for (let i in temp) {
        data.push(temp[i])
    }
    return data.length > 0 ? data : false;
}

export function getVariantColor(variants) {
    let temp = []
    let colors = [];
    variants.map((variant) => (
        !temp[variant.attributes.color.short] ? (
            temp[variant.attributes.color.short] = {
                title: variant.attributes.color.title,
                short: variant.attributes.color.short,
                key: "color",
                swatch: variant.attributes.color.swatch ? variant.attributes.color.swatch : false,
                image: {
                    main: (variant.image.main ? variant.image.main : ""),
                    hover: (variant.image.hover ? variant.image.hover : ""),
                },
                prices: [
                    {
                        price: variant.price
                    }
                ]
            }
        ) : (
            temp[variant.attributes.color.short].prices.push({
                price: variant.price
            })
        )

    ))
    for (let i in temp) {
        colors.push(temp[i])
    }
    return colors;
}

export function getProductCardData(data) {
    let arr = {}
    let temp = []

    data.variants.map((variant) => (

        temp[(variant.attributes.color.short ? variant.attributes.color.short : "") + (variant.attributes.size ? variant.attributes.size.short : "") + (variant.attributes.fit ? variant.attributes.fit.short : "")] = variant
    ))
    arr.variants = temp
    arr.colors = getVariantColor(data.variants)
    arr.sizes = getVariantAttribute(data.variants, "size")
    arr.fits = getVariantAttribute(data.variants, "fit")
    return arr;
}

export function getProductCardPrice(data, qty = 1) {
    data.sort(function (a, b) {
        if (a.price.main < b.price.main) {
            return -1;
        }
        if (a.price.main > b.price.main) {
            return 1;
        }
        return 0;
    })
    //if(data.length===1) return getPrice(data[0].price)
    return (
        <span>
            {
                data.length === 1 ? (
                    data[0].price.old ? (
                        <>
                            {getPrice(data[0].price.main, "text-red_2", qty)} {getPrice(data[0].price.old, "line-through", qty)}
                        </>

                    ) : (getPrice(data[0].price.main, "", qty))

                ) : (
                    <>
                        {getPrice(data[0].price.main, "", qty)} - {getPrice(data[data.length - 1].price.main, "", qty)}
                    </>
                )
            }
            {
                data[0].price.msg ? (
                    <span className="text-red_2 block text-xs">
                        {data[0].price.msg}
                    </span>
                ) : ("")
            }
        </span>

    )
}

export function getPrice(price, className = "", qty = 1) {
    return (
        <span className={className}>{getPriceMark()}{(price * qty).toFixed(2)}</span>
    )
}

export function getPriceMark() {
    return "$"
}

export function retrieveFilterList(products) {

}

export function generatePromos(promos) {
    let arr = []
    promos.map((promo) => (
        arr[(promo.index - 1)] = {
            promo
        }
    ))
    return arr;
}

export function parseImageUrl(url) {
    return `https:${url.replace("?$large$", "")}`
}

export function mapProductsJson(products) {
    let arr = []
    products.filter(function (product) {
        let variants = []
        let price = {}
        price.main = product.minListPrice
        if (product.minSalePrice !== product.minListPrice) {
            price.old = product.minSalePrice
        }

        product.colors.map((color, index) => (
            variants.push(
                {
                    title: "",
                    attributes: {
                        color: {
                            title: color.colorName,
                            short: color.colorId,
                            swatch: parseImageUrl(color.swatchImageUrl)
                        }
                    },
                    image: {
                        main: parseImageUrl(color.productImageUrl),
                        hover: parseImageUrl(color.productImageUrl)
                    },
                    gallery: [
                        {
                            image: parseImageUrl(color.productImageUrl),
                        }
                    ],
                    price: price
                }
            )
        ))
        arr.push(
            {
                highlights: [
                    {
                        title: product.description
                    }
                ],
                subcategories: [],
                image: {
                    main: parseImageUrl(product.colors[0].productImageUrl),
                    hover: parseImageUrl(product.colors[0].productImageUrl)
                },
                gallery: [],
                reviews: {
                    total: product.bvNumReviews,
                    avg: product.bvRating
                },
                variants: variants
            }
        )
        return null;
    });
    return arr;
}

export function generateFilters2(facets) {
    let arr = {}
    let attrArr = [];

    for (let i in facets) {
        let optionArr = [];
        for (let p in facets[i].options) {
            optionArr.push({
                title: facets[i].options[p].name,
                short: facets[i].options[p].code,
                swatch: facets[i].options[p].swatchImageUrl ? facets[i].options[p].swatchImageUrl : null,
                qty: 0
            })
        }
        attrArr.push({
            name: facets[i].code,
            values: optionArr
        });
    }
    arr.attributes = attrArr;
    return arr;
}

export function generateFilters(products) {
    let arr = {}
    let subCatArr = [];
    let attrArr = [];

    products.filter(function (product) {
        let productId = -1
        product.subcategories.filter(function (cat) {
            let i = subCatArr.findIndex(x => (x.title === cat.title));
            if (i <= -1) {
                subCatArr.push({
                    title: cat.title,
                    qty: 1
                });
            } else {
                subCatArr[i].qty += 1
            }
        })
        product.variants.filter(function (variant) {
            for (let property in variant.attributes) {
                if (variant.attributes.hasOwnProperty(property)) {
                    let r = attrArr.findIndex(x => (x.name === property));
                    if (r <= -1) {
                        attrArr.push({
                            name: property,
                            values: [
                                {
                                    title: variant.attributes[property].title,
                                    short: variant.attributes[property].short,
                                    swatch: variant.attributes[property].swatch ? variant.attributes[property].swatch : null,
                                    qty: 1
                                }
                            ]
                        });
                    } else {
                        let t = attrArr[r].values.findIndex(x => (x.title === variant.attributes[property].title));
                        if (t <= -1) {
                            attrArr[r].values.push({
                                title: variant.attributes[property].title,
                                short: variant.attributes[property].short,
                                swatch: variant.attributes[property].swatch ? variant.attributes[property].swatch : null,
                                qty: 1
                            });
                        } else {
                            productId === -1 ? attrArr[r].values[t].qty += 1 : null
                        }
                    }
                }
            }
            productId = products.findIndex(x => (x.title === product.title))

        })
        return null;
    });
    arr.subcategory = subCatArr;
    arr.attributes = attrArr;
    return arr;
}