import Link from "next/link";
import Image from "next/image";
import {getProductCardData, getProductCardPrice} from "@lib/helpers";
import React, {useState} from "react";
import Icon from "@components/icon";
import ColorSwatch from "@components/templates/product/color-swatch";
import Button from "@components/button";
import Reviews from "@components/templates/product/reviews";
import Highlights from "@components/templates/product/highlights";

export default function PlpCard({data, openPopup}) {
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
                    <div
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

                                    <Button label={"QUICK VIEW"} onClick={openPopup(product)} color="white"
                                            size="medium"
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

                    </div>

                </Link>
            </div>
            <div className="mb-2.5 flex justify-between">
                <ColorSwatch colors={productData.colors} productSlug={product.slug}
                             onColorSwatchClickMouseEnter={onColorSwatchClickMouseEnter}/>
                <Reviews reviews={product.reviews} productSlug={product.slug} showReviewNumber={true}/>
            </div>
            <div>
                <Highlights highlights={product.highlights} slug={product.slug}/>
            </div>
            <Link href={"/product/" + product.slug}>
                <a className="text-sm">{product.title} </a>
            </Link>
            <div className="text-sm">
                {cardPrice}
            </div>
        </div>
    )
}
