import dynamic from "next/dynamic";

export default function Template({template, context=""}) {

    let TemplateItem = dynamic(import(template.path+ ''))
    return (
        <>
            <div className={template.class?template.class+"":""} key={"dyn-template-"+context+"-"+template.path}>
                <TemplateItem data={template.data} />
            </div>
        </>
    )
}