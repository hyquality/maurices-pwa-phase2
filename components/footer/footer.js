import CalloutList from "@components/templates/callout/callout-list";
import SubFooter from "@components/footer/sub-footer";
import Columns from "@components/footer/columns";
import {DataProviderContext} from '../layout-data-provider';
import {useContext} from "react";
export default function Footer() {
    const {
        footerContent
    } = useContext(DataProviderContext)
    return (
        <>
            {
                footerContent?(
                    <footer>
                        <CalloutList data={footerContent.calloutItemList.calloutItemInfo.calloutItems}/>
                        <Columns />
                        <SubFooter />
                    </footer>
                ):null
            }

        </>

    )
}
