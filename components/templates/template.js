import dynamic from "next/dynamic";

export default function Template({template, context=""}) {

    let TemplateItem = dynamic(import(template.path+ ''))
    let dynamicProps = template.data;
    return (
        <>
            <div className={template.class?template.class+"":""} key={"dyn-template-"+context+"-"+template.path}>
                <TemplateItem {...dynamicProps} />
            </div>
        </>
    )
}