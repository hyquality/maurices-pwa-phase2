import NavList from "@components/templates/nav-list";
import Templates from "@components/templates/templates";
import React, {useContext} from "react";
import Button from "@components/templates/button";
import {DataProviderContext} from '../../layout-data-provider';
import customerNav from '@schemes/customer-nav.json'

export default function CustomerMenu() {
/*    const {
         customer
    } = useContext(DataProviderContext)*/
    const {nav,templates} = customerNav || {}

    return (
        <div>
            <NavList data={nav}
                     className={"customer-header-menu left-0"}/>

            {templates && (
                <Templates templates={templates}/>
            ) }
            <Button label={"SIGN OUT"} size="small" className="mt-5 w-full"/>

        </div>
    )
}