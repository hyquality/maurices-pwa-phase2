import Link from "next/link";
import React, {useState, forwardRef, useImperativeHandle, useContext} from "react";
import {generateFilters} from "@lib/helpers";
import ColorSwatch from "@components/templates/product/color-swatch";
import HeaderTitle from "@components/templates/header-title";
import AttributeSelector from "@components/templates/product/attribute-selector";
import Icon from "@components/templates/icon";
import PlpFilterClearFilterItem from "./plp-filter-clear-filter-item";
import {SelectedFiltersContext} from './filter-container';

export default function PlpFilter({collection}) {
    const {title, subcategories, slug, products} = collection;

    const {
        selectedFilters,
        setSelectedFilters,
        clearFilters,
        menageColorFilters,
        menageCheckFilters
    } = useContext(SelectedFiltersContext)

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

    const openSection = (name) => (e) => {
        e.preventDefault();
        setSections(prevSections => ({...prevSections, [name]: !sections[name]}));

    }

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
                                <HeaderTitle className={"py-5"} style={"normal"} size={"text-sm"} tag={"h3"}
                                             weight={"regular"}
                                             position={"left"} upper={true}>{name}</HeaderTitle>
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
                ) : null
            }
        </div>
    )
}