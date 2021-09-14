import NavList from "@components/templates/nav-list";
import Templates from "@components/templates/templates";
import React from "react";
import Button from "@components/button";

export default function CustomerMenu({customer}) {

    return (
        <div>
            <NavList data={customer.nav}
                     className={"customer-header-menu left-0"}/>

            {customer.templates ? (
                <Templates templates={customer.templates}/>
            ) : ("")}
            <Button label={"SIGN OUT"} size="small" className="mt-5 w-full"/>

        </div>
    )
}