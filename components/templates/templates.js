import dynamic from "next/dynamic";

export default function Templates({templates, context=""}) {

    let TemplateItem;

    return (
        <>
            {
                templates.map((template) => {
                    TemplateItem = dynamic(import(template.path+ ''))
                    let dynamicProps = template.data;
                    return (
                        <div className={template.class?template.class+"":""} key={"dyn-template-"+context+"-"+template.path}>
                            <TemplateItem {...dynamicProps} />
                        </div>

                    )
                })
            }
        </>
    )
}