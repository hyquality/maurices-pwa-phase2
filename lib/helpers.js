import React, { useState,  useEffect } from 'react';
import { window, document } from "browser-monads";

export async function bodyOverlay() {
    document.body.classList.toggle('on')
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