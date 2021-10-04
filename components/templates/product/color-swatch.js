import React, {useState} from "react";
import PropTypes from 'prop-types';

export default function ColorSwatch({
                                        colors,
                                        className,
                                        productSlug,
                                        showLabel = false,
                                        onColorSwatchClickMouseEnter = false
                                    }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const onMouseEnter = (index) => (e) => {
        e.preventDefault();
        console.log(index);
        const {price, swatch, short, image, prices} = colors[index]
        if(onColorSwatchClickMouseEnter){
            onColorSwatchClickMouseEnter(e, {
                price,
                swatch,
                short,
                image,
                prices
            });
        }

        setActiveIndex(index)
    }
    return (
        <>
            {
                colors ? (
                    <div className={className}>
                        {
                            showLabel ? (
                                <label className={"block pb-2 text-xs tracking-label"}>
                                    <span>COLOR</span>: {colors[activeIndex].title}
                                </label>) : null
                        }
                        {
                            colors.map(({price, swatch, short, image, prices}, index) => (

                                <a className={`mr-1.5 inline-block cursor-pointer border border-gray_2 rounded-full ${index === activeIndex ? " active" : ""}`}

                                   onMouseEnter={onMouseEnter(index)}
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
    showLabel: PropTypes.bool,
    onColorSwatchClickMouseEnter: PropTypes.func,
}

ColorSwatch.defaultProps = {
    colors: [],
    showLabel: false,
    onColorSwatchClickMouseEnter: undefined,
    className: ""
};