import Link from "next/link";
import Image from "next/image";
import {getProductCardData, getProductCardPrice} from "@lib/helpers";
import React, {useState} from "react";
import Icon from "@components/icon";
import ColorSwatch from "@components/templates/product/color-swatch";
import Button from "@components/button";
import Reviews from "@components/templates/product/reviews";

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
    const onColorSwatchClickMouseEnter = (e, data) => {
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
        <div className={"card-item"}>
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
                                        <Icon icon={["far", "heart"]} size={"medium"}/>
                                    </a>

                                    <Image
                                        src={cardImage.hover}
                                        alt={product.title}
                                        width={286}
                                        height={412}
                                        layout="responsive"
                                        className="block rounded z-0"
                                    />

                                    <Button label={"QUICK VIEW"} color="white" size="medium"
                                            className="absolute-x-center bottom-6 w-11/12  z-10"/>

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
                        <ColorSwatch colors={productData.colors} productSlug={product.slug}
                                     onColorSwatchClickMouseEnter={onColorSwatchClickMouseEnter}/>
                    ) : ("")
                }

                {
                    product.reviews ? (
                        <Reviews reviews={product.reviews} productSlug={product.slug} showReviewNumber={true}/>
                    ) : ("")

                }


            </div>
            <div className="text-sm font-black mb-1.5">
                {
                    product.highlights ? (
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
                    ) : ("")

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
