import Footer from '@components/footer/footer'
import Meta from '@components/meta'
import Header from "@components/header/header";
import Nav from "@components/header/main-nav/nav";

import React, {useState, useRef, useEffect} from 'react';


export default function Layout({data, nav, children}) {
    const {header, footer, store, customer, minicart, mainNav} = data
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
            <div style={{marginTop: offsetCompensation}}>
                <div className={`sticky-wrapper${stickyHeader ? ' stickyHeader' : ''}`} ref={headerRef}>
                    {
                        header ? (
                            <Header data={header} customer={customer} store={store} minicart={minicart}/>
                        ) : ("")
                    }

                    {
                        mainNav ? (
                            <Nav data={mainNav}
                                 store={store ? store : {}}
                                 customer={customer ? customer : {}}/>
                        ) : ("")
                    }
                </div>

                <div className="">
                    <main>{children}</main>
                </div>
                {
                    footer ? (
                        <Footer data={footer}/>
                    ) : ("")
                }

            </div>
        </>
    )
}