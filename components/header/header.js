import AnnouncementBar from "@components/header/announcement-bar";
import React, {useContext, useEffect} from "react";
import TopBar from "@components/header/top-bar";
import MiddleBar from "@components/header/middle-bar";
import {DataProviderContext} from '../layout-data-provider';

export default function Header() {
    const {
        headerContent
    } = useContext(DataProviderContext)

    const {announcementInfo} = headerContent.announcementBar || {}


    return (
        <>
            <div
                className="relative mar-header w-full top-0 z-20 border-b border-gray_border border-solid md:border-b-0">
                <AnnouncementBar data={announcementInfo}/>
                <TopBar/>
                <MiddleBar/>
            </div>

        </>
    )

}