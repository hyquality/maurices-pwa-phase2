import React, {useState} from "react";
import PropTypes from 'prop-types';

export default function ColorSwatch({
                                        colors,
                                        className,
                                        size = "small",
                                        productSlug,
                                        showLabel = false,
                                        showName = false,
                                        selectedFilters = false,
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

            onColorSwatchClickMouseEnter(e, colors[index], 'color');
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
                                    <span>COLOR</span>: {selectedVariant.attributes ? selectedVariant.attributes.color.title : null}
                                </label>) : null
                        }
                        {
                            colors.map(({title, swatch, short, qty}, index) => (

                                <a className={`mr-1.5 inline-flex cursor-pointer  times-center`}

                                   onClick={onMouseEnter(index)}

                                   key={"color-" + productSlug + index}>
                                    {
                                        swatch ? (
                                            <span className={`inline-block border rounded-full  ${((selectedVariant.attributes !== undefined && short === selectedVariant.attributes.color.short) || (selectedFilters && selectedFilters.filter((item) => item.short === short)[0].state)) ? " active border-gray_2" : "border-gray_3"}`}>
                                                <span className={`block ${sizes[size]} rounded-full border-3 border-white`}
                                                      style={{backgroundImage: `url('${swatch}')`}}/>
                                            </span>

                                        ) : (
                                            <span className={`inline-block border rounded-full  ${((selectedVariant.attributes !== undefined && short === selectedVariant.attributes.color.short) ||  (selectedFilters && selectedFilters.filter((item) => item.short === short)[0].state))  ? " active border-gray_2" : "border-gray_3"}`}>
                                            <span className={`block ${sizes[size]} rounded-full border-3 border-white`}
                                                  style={{backgroundColor: short}}/>
                                            </span>
                                        )
                                    }
                                    {
                                        showName ? (
                                            title? (
                                                <span
                                                    className={`flex items-center`}>
                                                    {title}
                                                    {
                                                        qty?(<span>({qty})</span>):null
                                                    }
                                                </span>
                                            ) : null
                                        ) : null
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
            key: PropTypes.string,
            swatch: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool,
            ]),
            qty: PropTypes.number,
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
    showName: PropTypes.bool,
    selectedVariant: PropTypes.any,
    onColorSwatchClickMouseEnter: PropTypes.func,
}
ColorSwatch.defaultProps = {
    colors: [],
    showLabel: false,
    showName: false,
    selectedVariant: {},
    onColorSwatchClickMouseEnter: undefined,
    className: "",
    size: "small"
};