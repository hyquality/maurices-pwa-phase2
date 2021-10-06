import React, {useState} from "react";
import PropTypes from 'prop-types';

export default function AttributeSelector({
                                              attributeName,
                                              attributeKey,
                                              attributes,
                                              className,
                                              productSlug,
                                              showLabel = false,
                                              selectedVariant,
                                              variants,
                                              onAttributeClickMouseEnter = false
                                          }) {


    const onMouseEnter = (index) => (e) => {
        e.preventDefault();

        if (onAttributeClickMouseEnter) {
            onAttributeClickMouseEnter(e, attributes[index]);
        }
    }
    const checkIsNotExist = (short) => {
        const key = Object.keys(selectedVariant.attributes).map(function (key) {
            return (attributeKey === key) ? short : selectedVariant.attributes[key].short
        });
        return variants[key.join("")] === undefined
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

                                <a className={`mr-1.5 py-1.5 px-5 inline-block cursor-pointer rounded-lg border${short === selectedVariant.attributes[attributeKey].short ? " bg-gray_border border-gray_2 active" : " border-gray_3"} ${checkIsNotExist(short) ? " opacity-40" : ""}`}

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
            key: PropTypes.string.isRequired,
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
    selectedVariant: {},
    variants: {},
    onAttributeClickMouseEnter: undefined,
    className: ""
};