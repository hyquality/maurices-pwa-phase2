import Link from "next/link";
import React, {useState} from "react";
import {generateFilters} from "@lib/helpers";
import ColorSwatch from "@components/templates/product/color-swatch";
import HeaderTitle from "@components/templates/header-title";
import AttributeSelector from "@components/templates/product/attribute-selector";
import Icon from "@components/icon";

export default function PlpFilter({collection, filterProducts}) {
    const {title, subcategories, slug, products} = collection;


    const [selectedFilters, setSelectedFilters] = useState({});

    const [filters, setFilter] = useState(generateFilters(products));

    let tempSections = {}
    filters.attributes.map(({values, name}, index) => (
        tempSections[name] = false
    ))
    const [sections, setSections] = useState(tempSections);
    const filterType = []
    filterType["color"] = "swatch"
    filterType["size"] = "tabs"
    filterType["fit"] = "checks"

    const openSection =(name)=> (e) => {
        e.preventDefault();
        setSections(prevSections => ({ ...prevSections, [name]: !sections[name] }));

    }

/*    const menageFilters = (name,value)=> (e) => {
        e.preventDefault();
        //setSelectedFilters(prevSelectedFilters => ({ ...prevSelectedFilters, [name]: {[value]:true} }));
        console.log(selectedFilters);
    }
    const setDefaultAttrState = () => {   menageFilters()
        let tempSelectedFilters = {}
        filters.attributes.map(({values, name}, index) => (
            values.map(({title,}, valueIndex) => (
                tempSelectedFilters[name]={
                    [title]: false
                }

            ))
        ))
        console.log(tempSelectedFilters)
        //setSelectedFilters(tempSelectedFilters)
    }
    setDefaultAttrState()*/
    return (
        <div className={"filter-wrapper pr-8"}>
            <div className={"pb-5 border-b border-gray_border"}>
                <HeaderTitle className={"pb-2.5"} style={"normal"} size={"text-sm"} tag={"h3"} weight={"regular"}
                             position={"left"} upper={true}>{title}</HeaderTitle>
                {
                    subcategories ? (
                        <ul>
                            {
                                subcategories.map(({url, qty, title}, index) => (
                                    <li className="py-1 text-xs"
                                        key={"subcategory-filter-" + slug + "-" + index}>

                                        <Link href={url}>
                                            <a>{title} <span className={"text-gray_5 ml-1.5"}>({qty})</span> </a>
                                        </Link>
                                    </li>

                                ))
                            }
                        </ul>

                    ) : null
                }
            </div>
            {
                filters.attributes ? (
                    filters.attributes.map(({values, name}, index) => (
                        <div key={"attribute-filter-" + slug + "-" + index} className={"border-b border-gray_border"}>

                            <label className={`cursor-pointer relative flex items-center`} onClick={openSection(name)}>
                                <HeaderTitle className={"py-5"} style={"normal"} size={"text-sm"} tag={"h3"} weight={"regular"}
                                             position={"left"} upper={true}>{name}</HeaderTitle>
                                <span className={"ml-auto mr-3"} >
                                        {
                                            sections[name]?(
                                                <Icon icon={["fas", "minus"]} size={"small"} />
                                            ):(
                                                <Icon icon={["fas", "plus"]} size={"small"} />
                                            )
                                        }
                                    </span>
                            </label>

                            {
                                sections[name] ? (
                                    <div className={"pb-5"}>
                                        {
                                            filterType[name] === "swatch" ? (
                                                <ColorSwatch className={"color-swatch"} colors={values}
                                                             productSlug={"filter-place"} size={"medium"} showName={true}/>
                                            ) : null
                                        }

                                        {
                                            filterType[name] === "tabs" ? (
                                                <AttributeSelector attributeName={"FIT"} attributeKey={"fit"} attributes={values} productSlug={slug + "-popup-color-swatch"}/>
                                            ) : null
                                        }
                                        {
                                            filterType[name] === "checks" ? (
                                                <ul>
                                                    {
                                                        values.map(({title, qty}, valueIndex) => (
                                                            <li className="pb-1"
                                                                key={`attribute-filter-value-${slug}-${name}-${valueIndex}`}>
                                                                <label htmlFor={`attribute-filter-value-${slug}-${name}-${valueIndex}`} className={"text-xs flex items-center"} >
                                                                    <input type="checkbox" id={`attribute-filter-value-${slug}-${name}-${valueIndex}`} className={"mr-2"} />
                                                                    {title} <span className={"text-gray_5 ml-1"}>({qty})</span>
                                                                </label>
                                                            </li>
                                                        ))
                                                    }

                                                </ul>
                                            ) : null
                                        }
                                    </div>
                                ):null
                            }


                        </div>
                    ))
                ) : null
            }
        </div>
    )
}
