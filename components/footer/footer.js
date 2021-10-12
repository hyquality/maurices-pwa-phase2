import CalloutList from "@components/templates/callout/callout-list";
import SubFooter from "@components/footer/sub-footer";
import Columns from "@components/footer/columns";
import {DataProviderContext} from '../layout-data-provider';
import {useContext} from "react";
export default function Footer() {
    const {
        footer
    } = useContext(DataProviderContext)
    return (
        <>
            {
                footer?(
                    <footer>
                        <CalloutList data={footer.calloutItems}/>
                        <Columns />
                        <SubFooter />
                    </footer>
                ):null
            }

        </>

    )
}
