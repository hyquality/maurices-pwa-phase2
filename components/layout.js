import Footer from '../components/footer/Footer'
import Meta from '../components/meta'
import Header from "@components/header/header";


export default function Layout({preview, data, children}) {
    return (
        <>
            <Meta/>
            <div className="pt-40">
                <Header data={data.HeaderContent}/>
                <div className="min-h-screen">
                    <main>{children}</main>
                </div>
                <Footer data={data.footerContent}/>
            </div>
        </>
    )
}