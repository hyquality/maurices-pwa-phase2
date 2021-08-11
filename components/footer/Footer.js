import Container from '../container'
import CalloutItems from "@components/footer/callout-items";
export default function Footer({data}) {
    return (
        <footer>
            <CalloutItems data={data.calloutItems}/>

        </footer>
    )
}
