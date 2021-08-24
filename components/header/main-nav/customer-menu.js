import NavList from "@components/templates/nav-list";
import Templates from "@components/templates/templates";
import React from "react";

export default function CustomerMenu({customer}) {

    return (
        <div>
            <NavList data={customer.nav}
                     className={"customer-header-menu left-0"}/>

            {customer.templates ? (
                <Templates templates={customer.templates}/>
            ) : ("")}
            <button className="btn mt-5">SIGN OUT</button>

        </div>
    )
}