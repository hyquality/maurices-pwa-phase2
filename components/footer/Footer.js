import CalloutItems from "@components/footer/callout-items";
import SubFooter from "@components/footer/sub-footer";
import Columns from "@components/footer/columns";

export default function Footer({data}) {
    return (
        <footer>
            <CalloutItems data={data.calloutItems}/>
            <Columns data={data.columnFooter.columns} signup={data.columnFooter.signUp}/>
            <SubFooter data={data.subfooter}/>
        </footer>
    )
}
