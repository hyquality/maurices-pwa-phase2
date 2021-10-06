import React from "react";
import PropTypes from 'prop-types';

export default function Highlights({highlights, slug}) {

    return (
        <div className="text-xs font-normal mb-1.5">
            {
                highlights ? (
                    highlights.map(({title}, index) => (
                        <span key={"highlights-" + slug + index}>
                             <span>{title}</span>
                            {
                                highlights.length > index + 1 ? (
                                    <span className="px-1.5">+</span>
                                ) : ("")
                            }
                         </span>


                    ))
                ) : ("")
            }
        </div>

    )
}

Highlights.propTypes = {
    highlights: PropTypes.arrayOf(
        PropTypes.shape({
                title: PropTypes.string.isRequired
            }
        ).isRequired
    ).isRequired,
    slug: PropTypes.string.isRequired
}

Highlights.defaultProps = {
    highlights: [
        {
            title:"test"
        }
    ],
    slug: "slug1"
};