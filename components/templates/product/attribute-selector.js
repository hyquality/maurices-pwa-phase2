import React, {useState} from "react";
import PropTypes from 'prop-types';

export default function AttributeSelector({
                                              attributeName,
                                              attributeKey,
                                              attributes,
                                              className,
                                              productSlug,
                                              showLabel = false,
                                              active = 0,
                                              selectedVariant,
                                              variants,
                                              onAttributeClickMouseEnter = false
                                          }) {

    attributes = attributes.filter(attribute => variants[selectedVariant.color.short+selectedVariant.size.short+selectedVariant.fit.short]!==undefined);


    const [activeIndex, setActiveIndex] = useState(active);

    const onMouseEnter = (index) => (e) => {
        e.preventDefault();


        if (onAttributeClickMouseEnter) {
            onAttributeClickMouseEnter(e, attributes[index]);
        }

        setActiveIndex(index)
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

                                <a className={`mr-1.5 py-2.5 px-5 inline-block cursor-pointer rounded-lg border${short === selectedVariant[attributeKey].short ? " bg-gray_border border-gray_2" : " border-gray_3"}`}

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
            short: PropTypes.string.isRequired
        })
    ).isRequired,
    className: PropTypes.string,
    productSlug: PropTypes.string.isRequired,
    showLabel: PropTypes.bool,
    active: PropTypes.number,
    selectedVariant: PropTypes.any,
    onAttributeClickMouseEnter: PropTypes.func,
}

AttributeSelector.defaultProps = {
    attributeName: "Size",
    attributeKey:"size",
    attributes: [],
    showLabel: false,
    productSlug: "",
    active: 0,
    selectedVariant: {},
    onAttributeClickMouseEnter: undefined,
    className: ""
};