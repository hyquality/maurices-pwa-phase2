import React from "react";
import PropTypes from "prop-types";
import HeaderTitle from "@components/templates/header-title";
export default function PlpDescription({data}) {
    const {title,text} = data;
    return (
        <div>
            <HeaderTitle tag={"h3"} position={"left"}>{title}</HeaderTitle>
            <p>{text}</p>
        </div>
    )
}

PlpDescription.propTypes = {
    data:  PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })

}
PlpDescription.defaultProps = {
    data: {
        title: "Title",
        text:  "Test test"
    }
};