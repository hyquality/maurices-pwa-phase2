import React, {useState} from "react";
import PropTypes from 'prop-types';

export default function AttributeSelector({
                                              attributeName,
                                              attributeKey,
                                              attributes,
                                              className,
                                              productSlug,
                                              showLabel = false,
                                              selectedFilters = false,
                                              selectedVariant,
                                              variants,
                                              onAttributeClickMouseEnter = false
                                          }) {


    const onMouseEnter = (index) => (e) => {
        e.preventDefault();

        if (onAttributeClickMouseEnter) {
            onAttributeClickMouseEnter(e, attributes[index],attributeKey);
        }
    }
    const checkIsNotExist = (short) => {
        return false
/*        if(selectedVariant){
            const key = Object.keys(selectedVariant.attributes).map(function (key) {
                return (attributeKey === key) ? short : selectedVariant.attributes[key].short
            });
            return variants[key.join("")] === undefined
        }
        return false*/
    }
    return (
        <>
            {
                attributes ? (
                    <div className={className}>
                        {
                            showLabel ? (
                                <label className={"block pb-2 text-xs tracking-label"}>
                                    <span>{attributeName}</span>:
                                </label>) : null
                        }
                        {
                            attributes.map(({title, short}, index) => (

                                <a className={`mr-1.5 mb-1.5 text-center min-w-min96 py-1.5 px-5 inline-block cursor-pointer rounded-lg border${((selectedVariant && short === selectedVariant.attributes[attributeKey].short) || (selectedFilters && selectedFilters.filter((item) => item.short === short)[0].state)) ? " bg-gray_border border-gray_2 active" : " border-gray_3"} ${checkIsNotExist(short) ? " opacity-40" : ""}`}

                                   onClick={onMouseEnter(index)}
                                   key={short + "-" + productSlug + index}>
                                    <span className={"text-gray_2"}>{title}</span>

                                </a>
                            ))
                        }
                    </div>
                ) : null
            }

        </>

    )
}

AttributeSelector.propTypes = {
    attributeName: PropTypes.string.isRequired,
    attributeKey: PropTypes.string.isRequired,
    attributes: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            short: PropTypes.string.isRequired,
            key: PropTypes.string,
        })
    ).isRequired,
    className: PropTypes.string,
    productSlug: PropTypes.string.isRequired,
    showLabel: PropTypes.bool,
    selectedVariant: PropTypes.any,
    variants: PropTypes.any.isRequired,
    onAttributeClickMouseEnter: PropTypes.func,
}

AttributeSelector.defaultProps = {
    attributeName: "Size",
    attributeKey: "size",
    attributes: [],
    showLabel: false,
    productSlug: "",
    selectedVariant: false,
    variants: {},
    onAttributeClickMouseEnter: undefined,
    className: ""
};