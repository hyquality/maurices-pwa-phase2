import dynamic from "next/dynamic";

export default function Templates({templates, context="", className}) {

    let TemplateItem;

    return (
        <>
            {
                templates.map((template,index) => {
                    TemplateItem = dynamic(import(template.path+ ''))
                    let dynamicProps = template.data;
                    return (
                        <div className={`${template.class?template.class+"":""} ${className}`} key={`dyn-template-${context}-${template.path}-${index}`}>
                            <TemplateItem {...dynamicProps} />
                        </div>

                    )
                })
            }
        </>
    )
}