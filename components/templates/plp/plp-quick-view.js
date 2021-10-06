import React, {useState} from "react";
import HeaderTitle from "@components/templates/header-title";
import PlpCard from "@components/templates/product/card/plp-card";
import Image from "next/image";
import Highlights from "@components/templates/product/highlights";
import Reviews from "@components/templates/product/reviews";
import {getProductCardData, getProductCardPrice} from "@lib/helpers";
import ColorSwatch from "@components/templates/product/color-swatch";
import AttributeSelector from "@components/templates/product/attribute-selector";

export default function PlpQuickView({product}) {
    const {title, slug, variants, highlights, reviews} = product || {}

    const productData = getProductCardData(product)

    const lowPriceVariant = variants.reduce(function (result, item) {
        (result.price===undefined || parseFloat(result.price.main)>parseFloat(item.price.main))?result = item:null
        return result;
    }, 0);
    const [selectedVariant, setSelectedVariant] = useState(lowPriceVariant);


    const [gallery, setGallery] = useState(product.gallery);


    const [cardPrice, setCardPrice] = useState(getProductCardPrice([{price: lowPriceVariant.price}]));
    const [activeIndex, setImageSrc] = useState(0);
    const changeImage = (index) => (e) => {
        e.preventDefault();
        setImageSrc(index)
    }

    const colorSwatchChange =  (e,{title,key}) =>{
        const variant = variants.filter(variant => variant.color.title===title);
        (variant[0] && variant[0].gallery)?setGallery(variant[0].gallery): null
    }
    const attributeChange =  (e,{title,key}) =>{

    }

  //  console.log(selectedVariant);
    return (
        <div className={"plp-quickview"}>
            <HeaderTitle tag={"h2"} position={"left"} size={"extra-small"} color={"dark-gray"}>{title}</HeaderTitle>
            <div className="flex">
                <div className={"w-24"}>
                    <ul className={"gallery"}>
                        {
                            gallery.map(({image}, index) => (
                                <li className={index === activeIndex ? "p-1 mb-1.5 border border-gray_6 " : "border p-1 mb-1.5 border-white"}
                                    key={"quick-view-image-" + slug + "-" + index}>
                                    <a onMouseEnter={changeImage(index)}
                                       rel={index === 0 ? " border border-black " : " "}>
                                        <Image
                                            src={image}
                                            alt={title}
                                            width={74}
                                            height={107}
                                            layout="responsive"
                                            className="block rounded z-0"
                                        />
                                    </a>


                                </li>
                            ))
                        }
                    </ul>

                </div>
                <div className={"w-6/12  pl-8"}>
                    <Image
                        src={gallery[activeIndex].image}
                        alt={title}
                        width={392}
                        height={566}
                        layout="responsive"
                        className="block rounded z-0"
                    />
                </div>
                <div className={"w-5/12 pl-8"}>
                    <Highlights highlights={highlights} slug={slug}/>
                    <div className={"flex"}>
                        <Reviews reviews={reviews} size={"small"} productSlug={slug + "-popup-reviews"} showAvg={true}
                                 showReviewNumber={true}/>
                        <a href="#" className={"ml-2 pl-2 border-l border-gray_3 underline"}>Write a Review</a>
                    </div>
                    <div className="text-xl pt-1.5">
                        {cardPrice}
                    </div>
                    {
                        productData.colors?(
                            <div className={"pt-5"}>
                                <ColorSwatch colors={productData.colors} productSlug={slug + "-popup-color-swatch"}
                                             showLabel={true} selectedVariant={selectedVariant} variants={productData.variants}  onColorSwatchClickMouseEnter={colorSwatchChange}/>
                            </div>
                        ):null
                    }
                    {
                        productData.fits?(
                            <div className={"pt-5"}>
                                <AttributeSelector attributeName={"FIT"} attributeKey={"fit"} attributes={productData.fits} productSlug={slug + "-popup-color-swatch"}
                                                   showLabel={true} selectedVariant={selectedVariant} variants={productData.variants} onColorSwatchClickMouseEnter={colorSwatchChange}/>
                            </div>
                        ):null
                    }
                    {
                        productData.sizes?(
                            <div className={"pt-5"}>
                                <AttributeSelector attributeName={"SIZE"} attributeKey={"size"} attributes={productData.sizes} productSlug={slug + "-popup-color-swatch"}
                                                   showLabel={true} selectedVariant={selectedVariant} variants={productData.variants} onColorSwatchClickMouseEnter={colorSwatchChange}/>
                            </div>
                        ):null
                    }
                </div>
            </div>
        </div>
    )
}
