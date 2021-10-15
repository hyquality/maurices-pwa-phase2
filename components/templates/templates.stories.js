import React from 'react';
import Templates from './templates';

export default {
    title: 'Maurices React App/Templates/Templates',
    component: Templates
}

const Template = (args) => <Templates {...args} />

export const Default = Template.bind({})

Default.args = {
    templates: [
        {
            "path": "./banner/hero",
            "class": "banner-hero",
            "data": {
                "fullwidth": true,
                "top": "CHECK IT OFF YOUR LIST",
                "title": "A Very Merry<br> Gift Guide",
                "titleColor": "white",
                "text": "Find gifts they really want — and maybe a little something for you, too.",
                "background": {
                    "first": "#DDDFE9",
                    "second": ""
                },
                "image": "/assets/images/banners/hero/hero1.png",
                "button": {
                    "title": "SHOP THE GIFT GUIDE",
                    "url": "#"
                },
                "highlight": true,
                "highlightColor": "#FF5353",
                "highlightHeight": 44
            }
        },
        {
            "path": "./banner/promo",
            "class": "banner-promo",
            "data": {
                "fullwidth": false,
                "top": "THE BUNDLE UP EVENT",
                "title": "30% Off Select Styles",
                "lightMode": true,
                "titleColor": "white",
                "background": {
                    "first": "#DDDFE9",
                    "second": ""
                },
                "backgroundImage": "/assets/images/banners/promo/promo1bg.jpg",
                "image": "/assets/images/banners/promo/promo1.png",
                "button": {
                    "title": "Shop The Sale",
                    "url": "#"
                }
            }
        },
    ],
}