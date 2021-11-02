import Link from "next/link";
import React, {useState, forwardRef, useImperativeHandle, useContext, useEffect} from "react";
import {generateFilters, generateFilters2} from "@lib/helpers";
import ColorSwatch from "@components/templates/product/color-swatch";
import HeaderTitle from "@components/templates/header-title";
import AttributeSelector from "@components/templates/product/attribute-selector";
import Icon from "@components/templates/icon";
import PlpFilterClearFilterItem from "./plp-filter-clear-filter-item";
import {SelectedFiltersContext} from './filter-container';

export default function PlpFilter(props) {
    const filterType = []
    filterType["colorGroup"] = "swatch"
    filterType["Size"] = "tabs"
    filterType["product.price_range"] = "checks"

    filterType["product.silhouette"] = "checks"

    const {
        selectedFilters,
        selectedFlat,
        clearFilters,
        menageColorFilters,
        menageCheckFilters,
        facets,
        filters,
        title, subcategories, slug, products
    } = useContext(SelectedFiltersContext)

//generateFilters(products)
   // const [filters, setFilter] = useState(false);

    let tempSections = {}
    const [sections, setSections] = useState(tempSections);
    //console.log(filters)

    useEffect(()=>{
        if (filters){
            filters.attributes.map(({values, name}, index) => (
                tempSections[name] = false
            ))
        }
    },[filters])

    useEffect(()=>{
        selectedFlat.map(({name}, index) => (
            setSections(prevSections => ({...prevSections, [name]: true}))
        ))
    },[selectedFlat])


    const openSection = (name) => (e) => {
        e.preventDefault();
        setSections(prevSections => ({...prevSections, [name]: !sections[name]}));

    }

    return (
        <div className={"filter-wrapper pr-8"}>
            <div className={"pb-5 border-b border-gray_border"}>
                <HeaderTitle className={"pb-2.5"} style={"normal"} size={"text-sm"} tag={"h3"} weight={"regular"}
                             position={"text-left"} upper={true}>{title}</HeaderTitle>
                {
                    subcategories ? (
                        <ul>
                            {
                                subcategories.map(({categoryId, displayName}, index) => (
                                    <li className="py-1 text-xs"
                                        key={"subcategory-filter-" + categoryId + "-" + index}>

                                        <Link href={`/catalog/${categoryId}`}>
                                            <a>{displayName} <span className={"text-gray_5 ml-1.5"}>({0})</span> </a>
                                        </Link>
                                    </li>

                                ))
                            }
                        </ul>

                    ) : null
                }
            </div>
            {
                filters ? (
                    filters.attributes.map(({values, name}, index) => (
                        <div key={"attribute-filter-" + slug + "-" + index} className={"border-b border-gray_border"}>

                            <label className={`cursor-pointer relative flex items-center`} onClick={openSection(name)}>
                                <HeaderTitle className={"py-5"} style={"normal"} size={"text-sm"} tag={"h3"}
                                             weight={"regular"}
                                             position={"text-left"} upper={true}>{name}</HeaderTitle>
                                <span className={"ml-auto mr-3"}>
                                        {
                                            sections[name] ? (
                                                <Icon icon={["fas", "minus"]} size={"small"}/>
                                            ) : (
                                                <Icon icon={["fas", "plus"]} size={"small"}/>
                                            )
                                        }
                                    </span>
                            </label>

                            {
                                sections[name] ? (
                                    <div className={"pb-5"}>
                                        {
                                            filterType[name] === "swatch" ? (
                                                <div>
                                                    <PlpFilterClearFilterItem selectedFilters={selectedFilters}
                                                                              name={name} clearFilters={clearFilters}/>
                                                    <ColorSwatch className={"color-swatch"} colors={values}
                                                                 productSlug={"filter-place"} size={"medium"}
                                                                 selectedFilters={selectedFilters[name]}
                                                                 onColorSwatchClickMouseEnter={menageColorFilters}
                                                                 showName={true}/>
                                                </div>

                                            ) : null
                                        }

                                        {
                                            filterType[name] === "tabs" ? (
                                                <div>
                                                    <PlpFilterClearFilterItem selectedFilters={selectedFilters}
                                                                              name={name} clearFilters={clearFilters}/>
                                                    <AttributeSelector attributeName={"FIT"} attributeKey={name}
                                                                       attributes={values}
                                                                       selectedFilters={selectedFilters[name]}
                                                                       onAttributeClickMouseEnter={menageColorFilters}
                                                                       productSlug={slug + "-popup-color-swatch"}/>
                                                </div>

                                            ) : null
                                        }
                                        {
                                            filterType[name] === "checks" ? (
                                                <div>
                                                    <PlpFilterClearFilterItem selectedFilters={selectedFilters}
                                                                              name={name} clearFilters={clearFilters}/>

                                                    <ul>
                                                        {
                                                            values.map(({title, short, qty}, valueIndex) => (
                                                                <li className="pb-1"
                                                                    key={`attribute-filter-value-${slug}-${name}-${valueIndex}`}>
                                                                    <label
                                                                        htmlFor={`attribute-filter-value-${slug}-${name}-${valueIndex}`}
                                                                        className={"text-xs flex items-center"}>
                                                                        <input type="checkbox"
                                                                               id={`attribute-filter-value-${slug}-${name}-${valueIndex}`}
                                                                               className={"mr-2"}
                                                                               name={`attribute-filter-value-${slug}-${name}-${valueIndex}`}
                                                                               checked={selectedFilters[name].filter((item) => item.short === short)[0].state}
                                                                               onChange={menageCheckFilters(name, short)}/>
                                                                        {title} <span
                                                                        className={"text-gray_5 ml-1"}>({qty})</span>
                                                                    </label>
                                                                </li>
                                                            ))
                                                        }

                                                    </ul>
                                                </div>

                                            ) : null
                                        }
                                    </div>
                                ) : null
                            }


                        </div>
                    ))
                ):(
                    <div>loading...</div>
                )
            }
        </div>
    )
}