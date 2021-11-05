import NavList from "@components/templates/nav-list";
import Templates from "@components/templates/templates";
import React, {useContext, useEffect, useState} from "react";
import Button from "@components/templates/button";
import {DataProviderContext} from '../../layout-data-provider';
import customerNav from '@schemes/customer-nav.json'

export default function CustomerMenu() {
    const {
        profileInfo,loyaltyInfo
    } = useContext(DataProviderContext)
    const {defaultPaymentInfo, homeAddress, favoriteProductsCount} = profileInfo || {}
    const [navigation, setNavigation] = useState(false);
    const {nav,templates} = customerNav || {}
    useEffect(()=>{
        console.log(defaultPaymentInfo)
        nav.forEach(function(elem, index){
            if(index===2) nav[index].caption = `${defaultPaymentInfo.cardType} ${defaultPaymentInfo.lastFourDigits}`
            if(index===3) nav[index].caption = `${homeAddress.address1}`
            if(index===4) nav[index].caption = `${favoriteProductsCount} items`
            if(index===5) nav[index].caption = `${loyaltyInfo.points} pts`
        });

        setNavigation(nav)
    },[nav])
    return (
        <div>
            <NavList data={navigation}
                     className={"customer-header-menu left-0"}/>

            {templates && (
                <Templates templates={templates}/>
            ) }
            <Button label={"SIGN OUT"} size="small" className="mt-5 w-full"/>

        </div>
    )
}