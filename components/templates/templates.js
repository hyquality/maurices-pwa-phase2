import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Template from "@components/templates/template";

export default function Templates({templates, context="", className}) {

    let TemplateItem;

    return (
        <>
            {
                templates.map((template,index) => {
                   // TemplateItem = dynamic(import(template.path+ ''))
                    //let dynamicProps = template.data;
                    return (
                        <div className={`${template.class?template.class+"":""} ${className}`} key={`dyn-template-${context}-${template.path}-${index}`}>
                            {
                                <Template template={template}/>
                   /*             TemplateItem?(
                                    <TemplateItem {...dynamicProps} />
                                ):"no"*/
                            }

                        </div>

                    )
                })
            }
        </>
    )
}
Templates.propTypes = {
    templates: PropTypes.any

}
Templates.defaultProps = {
    templates:[]
};