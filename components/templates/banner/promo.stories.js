import React from 'react';
import Promo from './promo';

export default {
    title: 'Maurices React App/Templates/Banner/Promo',
    component: Promo
}

const Template = (args) => <Promo {...args} />

export const PromoBanner = Template.bind({})

PromoBanner.args = {
    fullwidth: false,
    top: "THE BUNDLE UP EVENT",
    title: "30% Off Select Styles",
    lightMode: true,
    titleColor: "white",
    background: {
        first: "#DDDFE9",
        second: ""
    },
    backgroundImage: "/assets/images/banners/promo/promo1bg.jpg",
    image: "/assets/images/banners/promo/promo1.png",
    button: {
        title: "Shop The Sale",
        url: "#"
    }
}

