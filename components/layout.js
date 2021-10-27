import Footer from '@components/footer/footer'
import Meta from '@components/meta'
import Header from "@components/header/header";
import Nav from "@components/header/main-nav/nav";

import React, {useState, useRef, useEffect} from 'react';
import LayoutDataProvider from "./layout-data-provider";


export default function Layout({data,pwa, children}) {

    const [stickyHeader, setStickyHeader] = useState(false);
    const [offsetCompensation, setOffsetCompensation] = useState(0);
    const headerRef = useRef(null);

    // handle scroll event
    const handleScroll = (elTopOffset, elHeight) => {

        if (window.pageYOffset > (elTopOffset + elHeight)) {
            setStickyHeader(true);
            setOffsetCompensation(elHeight)

        } else {
            setStickyHeader(false);
            setOffsetCompensation(0)
        }
    };

    // add/remove scroll event listener
    useEffect(() => {
        let header = headerRef.current.getBoundingClientRect();
        const handleScrollEvent = () => {
            handleScroll(header.top, header.height)
        }

        window.addEventListener('scroll', handleScrollEvent);

        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);

    return (
        <>
            <Meta/>
            <LayoutDataProvider data={data} pwa={pwa}>
                <div style={{marginTop: offsetCompensation}}>
                    <div className={`sticky-wrapper${stickyHeader ? ' stickyHeader' : ''}`} ref={headerRef}>
                        <Header/>
                        <Nav/>
                    </div>

                    <div className="">
                        <main>{children}</main>
                    </div>
                    <Footer/>
                </div>
            </LayoutDataProvider>
        </>
    )
}