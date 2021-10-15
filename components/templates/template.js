import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React from "react";

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
Template.propTypes = {
    template: PropTypes.any

}
Template.defaultProps = {
    template:{}
};