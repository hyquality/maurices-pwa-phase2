import {useEffect, useState} from "react";
import {MOBILE_BREAKPOINT} from "@lib/constants";

function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

function useScreenWidth() {
    const [isMobile, setIsMobile] = useState(null);
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            if (window.innerWidth < MOBILE_BREAKPOINT) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }, 1000)

        window.addEventListener('resize', debouncedHandleResize)
        window.addEventListener('load', debouncedHandleResize)
        return function cleanup() {
            window.removeEventListener('resize', debouncedHandleResize)
            window.removeEventListener('load', debouncedHandleResize)
        };
    });

    return isMobile;
}

export default useScreenWidth