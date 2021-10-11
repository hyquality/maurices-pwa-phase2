import Link from "next/link";
import React, {useState, forwardRef, useImperativeHandle} from "react";
import {generateFilters} from "@lib/helpers";
import ColorSwatch from "@components/templates/product/color-swatch";
import HeaderTitle from "@components/templates/header-title";
import AttributeSelector from "@components/templates/product/attribute-selector";
import Icon from "@components/icon";
import PlpFilterClearFilterItem from "@components/templates/plp/filter/plp-filter-clear-filter-item";

function PlpFilter({collection, filterProducts, onFilterChange}, ref) {
    const {title, subcategories, slug, products} = collection;



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
    const setDefaultAttrState = () => {
        let tempSelectedFilters = []
        filters.attributes.map(({values, name}, index) => (
            tempSelectedFilters[name] = []
        ))
        filters.attributes.map(({values, name}, index) => (
            values.map(({short, title}, valueIndex) => (
                tempSelectedFilters[name].push(
                    {
                        short: short,
                        title: title,
                        state: false,
                    }
                )

            ))
        ))
        console.log("fire2")
        return tempSelectedFilters
    }
    const [selectedFilters, setSelectedFilters] = useState(setDefaultAttrState);

    const updateSelectedFilters = (name, filters) => {

        setSelectedFilters(prevSelectedFilters => (
            {
                ...prevSelectedFilters, [name]: filters
            }));

        onFilterChangeTrigger()
    }

    const clearFiltersItem = (name,short) => {



    }
    const clearFilters = (e, name) => {
        let tempFilters = selectedFilters
        let tempSelectedFilters = []
        tempFilters[name].map(({short, title}, valueIndex) => (
            tempSelectedFilters.push(
                {
                    short: short,
                    title: title,
                    state: false,
                }
            )

        ))
        tempFilters[name] = tempSelectedFilters
        updateSelectedFilters(name, tempFilters[name])
    }


    const menageColorFilters = (e, {short}, name) => {
        menageFilters(name, short)
    }

    const menageCheckFilters = (name, value) => (e) => {
        menageFilters(name, value)
    }
    const menageFilters = (name, value, forceClear = false) => {

        let modifiedFilters = []
        let tempFilters = forceClear?forceClear:selectedFilters
        const modified = tempFilters[name].filter((item) => item.short === value)
        modifiedFilters = tempFilters[name].filter((item) => item.short !== value)
        console.log(modified)
        console.log(modifiedFilters)
        modifiedFilters.push({
            state: !modified[0].state,
            short: modified[0].short,
            title: modified[0].title
        })
        tempFilters[name] = modifiedFilters
        console.log(tempFilters)
       updateSelectedFilters(name, tempFilters[name])

    }





    const onFilterChangeTrigger =()=>{
        if (onFilterChange) {
            console.log("fire")
            console.log(selectedFilters)
            onFilterChange(selectedFilters);
        }
    }

   // onFilterChangeTrigger()

    useImperativeHandle(ref, () => ({
        setFromOutside (data,selectedFiltersDump) {

            if(data.name==="all"){
                setSelectedFilters(setDefaultAttrState())
                onFilterChangeTrigger()
            } else {
                menageFilters(data.name, data.short, selectedFiltersDump)
            }
        }
    }), [])
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
export default forwardRef(PlpFilter)