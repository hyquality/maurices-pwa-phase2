import React, {useEffect, useState} from "react";
import HeaderTitle from "@components/templates/header-title";
import PlpCard from "@components/templates/product/card/plp-card";
import Image from "next/image";
import Highlights from "@components/templates/product/highlights";
import Reviews from "@components/templates/product/reviews";
import {getProductCardData, getProductCardPrice, getProductData, myLoader} from "@lib/helpers";
import ColorSwatch from "@components/templates/product/color-swatch";
import AttributeSelector from "@components/templates/product/attribute-selector";
import Icon from "@components/templates/icon";
import CalloutItem from "@components/templates/callout/callout-item";
import Button from "@components/templates/button";
import useSWR from "swr";
import {REACT_APP_API_URL, REACT_APP_MODE} from "@lib/constants";

const fetcher = (url) => fetch(url).then((res) => res.json())


export default function PlpQuickView({product}) {
    const {title, slug, highlights, reviews, description} = product || {}

    const [productData, setProductData] = useState(false);
    //const [apiUrl, setApiUrl] = useState(`api/product${parseInt(REACT_APP_MODE) ? "/33412" : slug}`);
    const {
        data,
        error
    } = useSWR(slug ? `/api/product${parseInt(REACT_APP_MODE) ? "/33412" : slug}` : null, fetcher)


    useEffect(() => {
        if (data) {
            console.log(data)
             setProductData(getProductData(data.data.product))
        }
    }, [data])

    const [selectedVariant, setSelectedVariant] = useState(false);

    useEffect(() => {
        if (productData) {
            const lowPriceVariant = productData.variants.reduce(function (result, item) {
                (result.price === undefined || parseFloat(result.price.main) > parseFloat(item.price.main)) ? result = item : null
                return result;
            }, 0);
            console.log(productData.variants)
            console.log(productData.defaultColor)
              setSelectedVariant(productData.variants[productData.defaultColor])
        }
    }, [productData])


    const [gallery, setGallery] = useState(false);

    const [qty, setQty] = useState(1);

    const [cardPrice, setCardPrice] = useState(false);

    useEffect(() => {
        if (selectedVariant) {
            setCardPrice(getProductCardPrice([{price: selectedVariant.price}], qty))
            setGallery(selectedVariant.gallery)
        }
    }, [selectedVariant])


    const [activeIndex, setImageSrc] = useState(0);

    const [showDescription, setShowDescription] = useState(false);

    const changeImage = (index) => (e) => {
        e.preventDefault();
        setImageSrc(index)
    }

    const cahngeActiveVariant = (short, key) => {
        const stringKey = Object.keys(selectedVariant.attributes).map(function (attrKey) {
            return (attrKey === key) ? short : selectedVariant.attributes[attrKey].short
        });
        const variant = productData.variants[stringKey.join("")]
        if (variant !== undefined) {
            setSelectedVariant(variant)
            setCardPrice(getProductCardPrice([{price: variant.price}], qty))
        }
    }
    const colorSwatchChange = (e, {title, short, key}) => {
        cahngeActiveVariant(short,"color")
        setImageSrc(0);
        const variant = productData.variants.filter(variant => variant.attributes.color.title === title);
       // const variant = productData.variants[short] ? productData.variants[short] : false

       // setSelectedVariant(variant)
       // setCardPrice(getProductCardPrice([{price: variant.price}], qty))
    }
    const attributeChange = (e, {short, key}) => {
        cahngeActiveVariant(short, key)
    }

    const changeQty = (value) => (e) => {
        value < 0 ? value = 0 : null
        setQty(value)
        setCardPrice(getProductCardPrice([{price: selectedVariant.price}], value))
    }
    const qtyFieldOnChange = (e) => {
        setQty(e.target.value)
        setCardPrice(getProductCardPrice([{price: selectedVariant.price}], e.target.value))
    }

    const toggleDescription = (e) => {
        setShowDescription(!showDescription)
    }

    if (error) {
        return <div>failed to load</div>
    }
    if (!data) {
        return <div>loading...</div>
    }

    const addToCart =(e) => {
        e.preventDefault();

        console.log(selectedVariant)
/*        const res = fetch("api/cart/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({a: 1, b: 'Textual content'})
        });

        // If the status code is not in the range 200-299,
        // we still try to parse and throw it.
        if (res.ok) {
           console.log(res)
        }*/
    }
    return (
        <div className={"plp-quickview relative pb-20"}>
            <HeaderTitle tag={"h2"} className={"pb-0"} position={"text-left"} size={"text-xl"}
                         color={"dark-gray"}>{title}</HeaderTitle>
            <a href="#" className="underline hover:no-underline text-xs">View Full Details</a>
            <div className="flex pt-5">
                <div className={"w-24"}>
                    <ul className={"gallery"}>
                        {
                            gallery && (
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
                            )

                        }
                    </ul>

                </div>
                <div className={"w-6/12  pl-8"}>
                    {
                        gallery && (
                            <Image
                                src={gallery[activeIndex].image}
                                alt={title}
                                width={392}
                                height={566}
                                layout="responsive"
                                className="block rounded z-0"
                            />
                        )
                    }

                </div>
                <div className={"w-5/12 pl-8 max-h-max640 overflow-auto"}>
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
                        productData.colors ? (
                            <div className={"pt-5"}>
                                <ColorSwatch colors={productData.colors} size={"medium"}
                                             productSlug={slug + "-popup-color-swatch"}
                                             showLabel={true} selectedVariant={selectedVariant}
                                             onColorSwatchClickMouseEnter={colorSwatchChange}/>
                            </div>
                        ) : null
                    }
                    {
                        productData.sizes ? (
                            <div className={"pt-5"}>
                                <AttributeSelector attributeName={"SIZE"} attributeKey={"size"}
                                                   attributes={productData.sizes}
                                                   productSlug={slug + "-popup-color-swatch"}
                                                   showLabel={true}
                                                   selectedVariant={selectedVariant}
                                                   onAttributeClickMouseEnter={attributeChange}/>
                            </div>
                        ) : null
                    }
                    <div className={"pt-5"}>
                        <label className={"block pb-2 text-xs tracking-label uppercase"}>
                            <span>Qty:</span>
                        </label>
                        <div className={"relative inline-block"}>
                            <button className={"absolute flex items-center w-3 h-3 right-3 top-1/2 -mt-3"}
                                    onClick={changeQty((qty + 1))}><Icon icon={["fas", "chevron-up"]} className="w-5"/>
                            </button>
                            <input type="number"
                                   className={"qty-field w-20 pl-5 py-2 border border-gray_3 rounded-lg outline-none"}
                                   value={qty} onChange={qtyFieldOnChange} min={0}/>
                            <button className={"absolute flex items-center w-3 h-3 right-3 bottom-1/2 -mb-3"}
                                    onClick={changeQty((qty - 1))}><Icon icon={["fas", "chevron-down"]}
                                                                         className="w-5"/></button>
                        </div>
                    </div>
                    <div className={"pt-5 flex"}>
                        <a href="#" className={"flex items-center underline  hover:no-underline"}><Icon
                            icon={["fas", "map-marker-alt"]} className={"pr-2"} size={"small"}/>Find in Store</a>
                        <a className={"flex ml-auto items-center underline  hover:no-underline"} href="#"><Icon
                            icon={["far", "heart"]} className={"pr-2"} size={"medium"}/>Add To My Favorites</a>
                    </div>
                    <div className={"mt-4 py-4 px-5 bg-gray_1"}>
                        <CalloutItem data={{
                            id: parseInt(slug),
                            title: "",
                            icon: "/assets/images/cell_4.png",
                            text: "<strong>Free Shipping</strong> on all orders $50 or more + <strong>Free Returns</strong> to any Maurices store.",
                            w: 44,
                            h: 32
                        }}/>
                    </div>

                    {
                        description ? (
                            <div className={"mt-3 py-4 border-t border-gray_border"}>
                                <label className={"flex pb-2 text-xs tracking-label uppercase cursor-pointer"}
                                       onClick={toggleDescription}>
                                    <span>PRODUCT DETAILS:</span>
                                    <span className={"ml-auto mr-3"}>
                                        {
                                            showDescription ? (
                                                <Icon icon={["fas", "minus"]} size={"small"}/>
                                            ) : (
                                                <Icon icon={["fas", "plus"]} size={"small"}/>
                                            )
                                        }
                                    </span>
                                </label>
                                {
                                    showDescription ? (
                                        <div>
                                            {description}
                                        </div>
                                    ) : null
                                }

                            </div>
                        ) : null
                    }

                </div>
            </div>
            <div className="quick-view-button absolute bottom-0 bottom-0 left-0 w-full pt-5 px-8 -mx-7 shadow-top">

                <Button label={"ADD TO BAG"} size="small" color={"green"} onClick={addToCart}/>
            </div>
        </div>
    )
}
