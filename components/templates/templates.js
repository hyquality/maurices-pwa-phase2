import dynamic from "next/dynamic";
import PropTypes from "prop-types";

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
Templates.propTypes = {
    templates: PropTypes.any

}
Templates.defaultProps = {
    templates:[]
};