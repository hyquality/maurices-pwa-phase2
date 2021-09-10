import Link from "next/link";
import Image from "next/image";
import {bodyOverlay, getCurrentWidth, getProductCardData, getProductCardPrice, openMainMenu} from "@lib/helpers";
import React, {useState} from "react";
import {MOBILE_BREAKPOINT} from "@lib/constants";
import Icon from "@components/icon";

export default function PlpCard({data}) {
    const product = data;
    const productData = getProductCardData(data)

    const reviews = [1, 2, 3, 4, 5]

    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => {
        setIsHovered(true)

    }
    const onMouseLeave = () => {
        setIsHovered(false)
    }

    const [cardPrice, setCardPrice] = useState(getProductCardPrice(productData.colors[0].prices));
    const [cardImage, setCardImage] = useState(
        {
            main: productData.colors[0].image.main ? productData.colors[0].image.main : product.image.main,
            hover: productData.colors[0].image.hover ? productData.colors[0].image.hover : product.image.hover,
        }
    );
    const onColorSwatchClick = (e, data) => {
        console.log(data);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setCardPrice(getProductCardPrice(data.prices))
        setCardImage(
            {
                main: data.image.main ? data.image.main : product.image.main,
                hover: data.image.hover ? data.image.hover : product.image.hover,
            }
        )

    }
    return (
        <div>
            <div className="flex mb-2.5">
                <Link href={"/product/" + product.slug}>
                    <a
                        className="relative w-full"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        {
                            isHovering ? (
                                <>
                                    <a className="absolute w-4 z-10 top-5 right-5">
                                        <Icon icon={["far", "heart"]} className="w-5"/>
                                    </a>
                                    <Image
                                        src={cardImage.hover}
                                        alt={product.title}
                                        width={286}
                                        height={412}
                                        layout="responsive"
                                        className="block rounded z-0"
                                    />
                                    <button
                                        className="absolute text-sm font-black uppercase tracking-widest bottom-6 w-11/12 bg-white rounded py-4 text-center left-1/2 transform -translate-x-1/2 z-10">QUICK
                                        VIEW
                                    </button>
                                </>


                            ) : (
                                <Image
                                    src={cardImage.main}
                                    alt={product.title}
                                    width={286}
                                    height={412}
                                    layout="responsive"
                                    className="block"
                                />
                            )
                        }

                    </a>

                </Link>
            </div>
            <div className="mb-2.5 flex justify-between">
                {
                    productData.colors ? (

                        <div className="">
                            {

                                productData.colors.map((color, index) => (

                                    <a className={`mr-1.5 inline-block cursor-pointer border border-gray_2 rounded-full ${index === 0 ? " active" : ""}`}

                                       onMouseEnter={((e) => onColorSwatchClick(e, color))}
                                       data-color={color.prices}
                                       key={"color-" + product.slug + index}>
                                        {
                                            color.swatch ? (
                                                <span className="block w-5 h-5 rounded-full border-2 border-white"
                                                      style={{backgroundImage: `url('${color.swatch}')`}}/>
                                            ) : (
                                                <span className="block w-5 h-5 rounded-full border-2 border-white"
                                                      style={{backgroundColor: color.short}}/>
                                            )
                                        }

                                    </a>
                                ))
                            }
                        </div>
                    ) : ("")
                }
                <div className="product-review flex items-center">
                    {
                        product.reviews ? (
                            <>
                                {
                                    reviews.map((r, index) => (
                                        r > product.reviews.avg ? (
                                            <span><Icon icon={["far", "star"]} className="w-3 h-3 px-0.5"/></span>
                                        ) : (
                                            <span> <Icon icon={["fas", "star"]} className="w-3 h-3 px-0.5"/></span>
                                        )

                                    ))
                                }
                                <span className="text-xs pl-1.5">({product.reviews.total})</span>

                            </>
                            ):("")

                    }

                </div>
            </div>
            <div className="text-sm font-black mb-1.5">
                {
                    product.highlights?(
                        product.highlights.map((cat, index) => (
                            <span key={"highlights-" + product.slug + index}>
                             <span>{cat.title}</span>
                                {
                                    product.highlights.length > index + 1 ? (
                                        <span className="px-1.5">+</span>
                                    ) : ("")
                                }
                         </span>


                        ))
                    ):("")

                }
            </div>
            <Link href={"/product/" + product.slug}>
                <a className="text-sm">{product.title} </a>
            </Link>
            <div>
                {cardPrice}
            </div>
        </div>
    )
}
