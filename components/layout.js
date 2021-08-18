import Footer from '../components/footer/footer'
import Meta from '../components/meta'
import Header from "@components/header/header";
import Nav from "@components/header/nav";
import React, { useState, useRef, useEffect } from 'react';


export default function Layout({preview, data, nav, children}) {
    const [stickyHeader, setStickyHeader] = useState(false);
    const [offsetCompensation, setOffsetCompensation] = useState(0);
    const headerRef = useRef(null);

    // handle scroll event
    const handleScroll = (elTopOffset, elHeight) => {

        if (window.pageYOffset > (elTopOffset + elHeight)) {
            console.log(elHeight);
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
            <div style={{ marginTop: offsetCompensation }}>
                <div  className={`sticky-wrapper${stickyHeader ? ' stickyHeader' : ''}`} ref={headerRef}>
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