import Footer from '../components/footer/footer'
import Meta from '../components/meta'
import Header from "@components/header/header";
import Nav from "@components/header/nav";
import React, { useState, useRef, useEffect } from 'react';


export default function Layout({preview, data, nav, children}) {
    const [stickyHeader, setStickyHeader] = useState({ isStickyHeader: false, offsetCompensation: 0 });
    const headerRef = useRef(null);

    // handle scroll event
    const handleScroll = (elTopOffset, elHeight) => {
        if (window.pageYOffset > (elTopOffset + elHeight)) {
            setStickyHeader({ isStickyHeader: true, offsetCompensation: elHeight });
        } else {
            setStickyHeader({ isStickyHeader: false, offsetCompensation: 0 });
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
            <div style={{ marginTop: stickyHeader.offsetCompensation }}>
                <div  className={`sticky-wrapper${stickyHeader.isStickyHeader ? ' stickyHeader' : ''}`} ref={headerRef}>
                    {
                        data.HeaderContent ? (
                            <Header data={data.HeaderContent}/>
                        ) : ("")
                    }

                    {
                        nav.data ? (
                            <Nav data={nav.data}/>
                        ) : ("")
                    }
                </div>

                <div className="">
                    <main>{children}</main>
                </div>
                {
                    data.footerContent ? (
                        <Footer data={data.footerContent}/>
                    ) : ("")
                }

            </div>
        </>
    )
}