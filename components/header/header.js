import AnnouncementBar from "@components/header/announcement-bar";
import React, {Component} from "react";
import TopBar from "@components/header/top-bar";
import MiddleBar from "@components/header/middle-bar";

export default function Header({data, store, customer, minicart}) {

    return (
        <header
            className="relative mar-header w-full top-0 z-20 border-b border-gray_border border-solid md:border-b-0">
            <AnnouncementBar data={data.announcement}/>
            <TopBar/>
            <MiddleBar minicart={minicart} store={store} customer={customer}/>
        </header>
    )

}