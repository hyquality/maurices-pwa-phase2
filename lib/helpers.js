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

export function getProductCardData(data) {
    let arr = {}
    let colors = []
    let prices = []
    let temp = []
    data.variants.map((variant, index) => (

        !temp[variant.color.short] ? (


            temp[variant.color.short] = {
                title: variant.color.title,
                short: variant.color.short,
                swatch: variant.color.swatch ? variant.color.swatch : false,
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
            temp[variant.color.short].prices.push({
                price: variant.price
            })
        )

    ))
    for (let i in temp) {
        colors.push(temp[i])
    }

    arr.colors = colors

    return arr;
}

export function getProductCardPrice(data) {
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
        <span className="text-sm">
            {
                data.length === 1 ? (
                    data[0].price.old ? (
                        <>
                            {getPrice(data[0].price.main, "text-red_2")} {getPrice(data[0].price.old, "line-through")}
                        </>

                    ) : (getPrice(data[0].price.main))

                ) : (
                    <>
                        {getPrice(data[0].price.main)} - {getPrice(data[data.length - 1].price.main)}
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

export function getPrice(price, className = "") {
    return (
        <span className={className}>{getPriceMark()}{price.toFixed(2)}</span>
    )
}

export function getPriceMark() {
    return "$"
}