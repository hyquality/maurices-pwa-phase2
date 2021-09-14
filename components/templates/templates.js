import dynamic from "next/dynamic";

export default function Templates({templates, context=""}) {

    let TemplateItem;

    return (
        <>
            {
                templates.map((template) => {
                    TemplateItem = dynamic(import(template.path+ ''))
                    return (
                        <div className={template.class?template.class+"":""} key={"dyn-template-"+context+"-"+template.path}>
                            <TemplateItem data={template.data} />
                        </div>

                    )
                })
            }
        </>
    )
}