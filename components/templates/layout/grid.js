import PropTypes from 'prop-types';
import React from "react";
import Container from "@components/container";
import Templates from "@components/templates/templates";

export default function Grid({
                                 fullwidth,
                                 paddingTop,
                                 paddingBottom,
                                 templates,
                                 columns,
                                 columnsMobile,
                                 className,
                                 context = "",
                                 ...props
                             }) {
    const grid = {
        1: {
            w:"w-full",
            p:"grid-item-1_1"
        },
        2: {
            w:"w-1/2",
            p:"grid-item-1_2"
        },
        3: {
            w:"w-1/3",
            p:"grid-item-1_3"
        },
        4: {
            w:"w-1/4",
            p:"grid-item-1_4"
        }
    }
    return (
        <div className={`column-grid ${className} ${paddingTop && "pt-sectionBT"} ${paddingBottom && "pb-sectionBT"}`}>
            {
                fullwidth ? (
                    <div className={`flex flex-wrap justify-between ${!grid[columns]?"flex-col":null}`}>
                        <Templates templates={templates} context={context} className={`grid-item ${grid[columns]?grid[columns].p:null} ${grid[columnsMobile]?"m"+grid[columnsMobile].p:null}`}/>
                    </div>
                ) : (
                    <Container>
                        <div className={`flex flex-wrap justify-between ${!grid[columns]?"flex-col":null}`}>
                            <Templates templates={templates} context={context} className={`grid-item ${grid[columns]?grid[columns].p:null} ${grid[columnsMobile]?"m"+grid[columnsMobile].p:null}`}/>
                        </div>
                    </Container>

                )
            }
        </div>
    )
}

Grid.propTypes = {
    fullwidth: PropTypes.bool,
    paddingTop: PropTypes.bool,
    paddingBottom: PropTypes.bool,
    templates: PropTypes.any,
    context: PropTypes.string,
    columns: PropTypes.oneOf([1,2, 3, 4]),
    columnsMobile:PropTypes.oneOf([1,2, 3, 4]),

}
Grid.defaultProps = {
    fullwidth: false,
    paddingTop: false,
    paddingBottom: false,
    templates: {},
    context: "",
    columns: 2,
    columnsMobile: 1
};