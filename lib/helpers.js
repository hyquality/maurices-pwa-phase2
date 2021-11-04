import React from 'react';
import {document} from "browser-monads";
import {SITE_TILE} from "@lib/constants";


export const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}`
}

export function objToString(object) {
    let str = '';
    for (let k in object) {
        if (object.hasOwnProperty(k)) {
            str += `${k}=${object[k]};`;
        }
    }
    return str;
}

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

export function getProductData(data) {
    let arr = {}
    let temp = []

    data.colors.map((color) => (
        data.sizes.map((size) => (
            temp[color.colorId+size.id] = {
                title: "",

                attributes: {
                    color: {
                        title: color.colorName,
                        short: color.colorId,
                        key: "color",
                        swatch: parseImageUrl(color.swatchImageUrl)
                    },
                    size: {
                        title: size.name,
                        short: size.id,
                        key: "size"
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
                price: {
                    main:color.listPrice,
                    old:color.salePrice
                }
            }
        ))

    ))
    arr.variants = temp

    let colorsTemp = []
    let colors = [];
    data.colors.map((color) => (
        colorsTemp[color.colorId] = {
            title: color.colorName,
            short: color.colorId,
            key: "color",
            swatch: color.swatchImageUrl ? color.swatchImageUrl : false,
            image: {
                main: (color.productImageUrl ? color.productImageUrl : ""),
                hover: (color.productImageUrl ? color.productImageUrl : ""),
            },
            prices: [
                {
                    price: color.listPrice
                }
            ]
        }

    ))

    for (let i in colorsTemp) {
        colors.push(colorsTemp[i])
    }
    arr.colors = colors

    let tempSize = []
    let sizeData = [];
    data.sizes.map((size) => (
        tempSize[size.id] = {
            title: size.name,
            short: size.id,
            key: "size"
        }
    ))
    for (let i in tempSize) {
        sizeData.push(tempSize[i])
    }
    arr.sizes = sizeData
    arr.defaultColor = data.defaultColor+data.sizes[0].id
    return arr;
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
                    (data[0].price.old && data[0].price.old!==data[0].price.main) ? (
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

export function generatePromos(catalogData) {
    const {promoSlotB1, promoSlotB4, promoSlotC3, promoSlotD6} = catalogData || {}
    let arr = []
    promoSlotB1 && (
        arr[2] = {
            name: "B1",
            index: 2,
            type: 1,
            width: 336,
            height: 600,
            positionY: "bottom",
            title: promoSlotB1.heading,
            showCaption: true,
            image: promoSlotB1.imageUrl,
            label: "Shop Now",
            url: promoSlotB1.ctaLinkUrl
        }
    )
    promoSlotB4 && (
        arr[8] = {
            name: "B4",
            index: 8,
            type: 2,
            width: 731,
            height: 661,
            positionX: "left",
            title: promoSlotB4.heading,
            showCaption: true,
            image: promoSlotB4.imageUrl,
            label: "Shop Now",
            url: promoSlotB4.ctaLinkUrl
        }
    )
    promoSlotC3 && (
        arr[12] = {
            name: "C3",
            index: 12,
            type: 1,
            width: 336,
            height: 600,
            positionY: "bottom",
            title: promoSlotC3.heading,
            showCaption: true,
            image: promoSlotC3.imageUrl,
            label: "Shop Now",
            url: promoSlotC3.ctaLinkUrl
        }
    )
    promoSlotD6 && (
        arr[15] = {
            name: "C3",
            index: 15,
            type: 2,
            width: 731,
            height: 661,
            positionX: "left",
            title: promoSlotD6.heading,
            showCaption: true,
            image: promoSlotD6.imageUrl,
            label: "Shop Now",
            url: promoSlotD6.ctaLinkUrl
        }
    )
    return arr;
}

export function parseImageUrl(url) {
    return url?`https:${url.replace("?$large$", "")}`:""
}

export function mapProductsJson(products, loadedProductList=false) {
    let arr = loadedProductList?loadedProductList:[]
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
                id: product.id,
                slug: product.id,
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

export function generateFilters(facets) {
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

export function mapHomeComponentsJson(data,path,className){

    for (let i = 0; i < data.templates.length; i++) {
        let obj = {}

        obj.data=data.templates[i].data === undefined?data.templates[i]:data.templates[i].data

        obj.path=data.templates[i].path === undefined?path:data.templates[i].path

        obj.class=data.templates[i].class === undefined?className:data.templates[i].class
        data.templates[i]=obj
    }
    return data;
}