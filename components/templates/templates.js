import dynamic from "next/dynamic";
import CalloutItem from "@components/templates/callout/callout-item";

export default function Templates({templates, context=""}) {

    let CalloutItem;

    return (
        <>
            {
                templates.map((template) => {
                    CalloutItem = dynamic(import(template.path+ ''))
                    return (
                        <div className={template.class?template.class+"":""} key={"dyn-template-"+context+"-"+template.path}>
                            <CalloutItem data={template.data} key={"dynamic-template-"+template.path}/>
                        </div>

                    )
                })
            }
        </>
    )
}