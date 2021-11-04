import Breadcrumbs from "@components/breadcrumbs";
import HeaderTitle from "@components/templates/header-title";
import PlpSubcategotyList from "@components/templates/plp/plp-subcategoty-list";
import FilterContainer from "@components/templates/plp/filter/filter-container";
import PlpFilter from "@components/templates/plp/filter/plp-filter";
import PlpList from "@components/templates/plp/plp-list";
import PlpDescription from "@components/templates/plp/plp-description";
import Popup from "@components/templates/popup";
import React, {useState} from "react";
import dynamic from "next/dynamic";

export default function PlpContent({loadFilteredCatalog,data,error,catalogData,isSearch=false}) {

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState("");
    const [catalogDesc, setCatalogDesc] = useState(false);

    const openQuickView = (data) => (e) => {
        e.preventDefault()
        let TemplateItem = dynamic(import('@components/templates/plp/plp-quick-view'))
        setPopupContent(<TemplateItem product={data}/>)
        setIsPopupVisible(true)
    }

    const closeQuickView = (e) => {
        e.preventDefault();
        setIsPopupVisible(false)
    }



    return (
        <>

            {
                error && (
                    <div className={"min-h-min512 flex items-center justify-center"}>Category not found</div>
                )
            }
            {
                (!data && !error) && (
                    <div className={"min-h-min512 flex items-center justify-center"}>loading...</div>
                )
            }
            {
                catalogData && (
                    <>

                        <Breadcrumbs title={false} elements={catalogData.breadcrumbs}/>
                        <HeaderTitle weight={"bold"} size={"text-4xl"} tag={"h1"}
                                     style={"utopia"}>{catalogData.categoryDisplayName}</HeaderTitle>
                        <PlpSubcategotyList subcategoryCallouts={catalogData.subcategoryCallouts}/>
                        <FilterContainer catalogData={catalogData} loadFilteredCatalog={loadFilteredCatalog}>
                            <div className="flex">
                                <div className="filter w-1/4">
                                    <PlpFilter/>
                                </div>
                                <div className="w-3/4 pb-28">

                                    <PlpList openPopup={openQuickView}/>
                                    {
                                        catalogDesc ? (
                                            <PlpDescription data={catalogDesc}/>
                                        ) : null
                                    }

                                </div>
                            </div>
                        </FilterContainer>
                        <Popup content={popupContent} visible={isPopupVisible} closePopup={closeQuickView}
                               className={"w-full max-w-5xl"}/>
                    </>
                )
            }
        </>
    )
}