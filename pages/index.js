import Header from "components/header/Header";
import {getHomePageData} from "../lib/api";

export default function Home({pageData }) {
    return (
        <div className="asc-global-wrapper ">
            <Header data={pageData.data.HeaderContent}/>
        </div>
    )

}

export async function getStaticProps() {
    const { data } = (await getHomePageData()) || {};
    return {
        props: {
            pageData: data
        }
    }
}