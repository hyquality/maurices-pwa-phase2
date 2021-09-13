import React from "react";
import PropTypes from 'prop-types';

export default function ColorSwatch({colors, className, productSlug, onColorSwatchClickMouseEnter}) {
    return (
        <div className={className}>
            {
                colors.map(({price, swatch, short, image, prices}, index) => (

                    <a className={`mr-1.5 inline-block cursor-pointer border border-gray_2 rounded-full ${index === 0 ? " active" : ""}`}

                       onMouseEnter={((e) => onColorSwatchClickMouseEnter(e, {price, swatch, short, image, prices}))}
                       data-color={prices}
                       key={"color-" + productSlug + index}>
                        {
                            swatch ? (
                                <span className="block w-5 h-5 rounded-full border-2 border-white"
                                      style={{backgroundImage: `url('${swatch}')`}}/>
                            ) : (
                                <span className="block w-5 h-5 rounded-full border-2 border-white"
                                      style={{backgroundColor: short}}/>
                            )
                        }

                    </a>
                ))
            }
        </div>
    )
}

ColorSwatch.propTypes = {
    colors: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            short: PropTypes.string.isRequired,
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
    onColorSwatchClickMouseEnter: PropTypes.func,
}

ColorSwatch.defaultProps = {
    colors: [],
    onColorSwatchClickMouseEnter: undefined,
    className: ""
};