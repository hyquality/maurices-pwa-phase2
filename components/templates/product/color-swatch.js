import React, {useState} from "react";
import PropTypes from 'prop-types';

export default function ColorSwatch({
                                        colors,
                                        className,
                                        size="small",
                                        productSlug,
                                        showLabel = false,
                                        selectedVariant,
                                        onColorSwatchClickMouseEnter = false
                                    }) {

    const sizes = {
        small: "w-5 h-5",
        medium: "w-7 h-7",
        large: "w-10 h-10"
    }
    const onMouseEnter = (index) => (e) => {
        e.preventDefault();
        if (onColorSwatchClickMouseEnter) {
            onColorSwatchClickMouseEnter(e, colors[index]);
        }
    }
    return (
        <>
            {
                colors ? (
                    <div className={className}>
                        {
                            showLabel ? (
                                <label className={"block pb-2 text-xs tracking-label"}>
                                    <span>COLOR</span>: {selectedVariant.attributes?selectedVariant.attributes.color.title:null}
                                </label>) : null
                        }
                        {
                            colors.map(({price, swatch, short, image, prices}, index) => (

                                <a className={`mr-1.5 inline-block cursor-pointer border  rounded-full ${(selectedVariant.attributes !== undefined && short === selectedVariant.attributes.color.short) ? " active border-gray_2" : "border-gray_3"}`}

                                   onClick={onMouseEnter(index)}
                                   data-color={prices}
                                   key={"color-" + productSlug + index}>
                                    {
                                        swatch ? (
                                            <span className={`block ${sizes[size]} rounded-full border-3 border-white`}
                                                  style={{backgroundImage: `url('${swatch}')`}}/>
                                        ) : (
                                            <span className={`block ${sizes[size]} rounded-full border-3 border-white`}
                                                  style={{backgroundColor: short}}/>
                                        )
                                    }

                                </a>
                            ))
                        }
                    </div>
                ) : null
            }

        </>

    )
}

ColorSwatch.propTypes = {
    colors: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            short: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            swatch: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool,
            ]),
            // image: PropTypes.object,
            image: PropTypes.shape({
                    main: PropTypes.string.isRequired,
                    hover: PropTypes.string
                }
            ),
            prices: PropTypes.arrayOf(
                PropTypes.shape({
                        price: PropTypes.shape({
                                main: PropTypes.number.isRequired,
                                old: PropTypes.number,
                                msg: PropTypes.string
                            }
                        )
                    }
                )
            )
        })
    ).isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    showLabel: PropTypes.bool,
    selectedVariant: PropTypes.any,
    onColorSwatchClickMouseEnter: PropTypes.func,
}
ColorSwatch.defaultProps = {
    colors: [],
    showLabel: false,
    selectedVariant: {},
    onColorSwatchClickMouseEnter: undefined,
    className: "",
    size: "small"
};