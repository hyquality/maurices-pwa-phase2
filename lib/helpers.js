import React, { useState,  useEffect } from 'react';
import { window, document } from "browser-monads";
import {MOBILE_BREAKPOINT, SITE_TILE} from "@lib/constants";

export async function bodyOverlay(mode=0) {
    switch(mode) {
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
export async function openMainMenu(mode=0) {
    switch(mode) {
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
    return new Promise( res => setTimeout(res, delay) );
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