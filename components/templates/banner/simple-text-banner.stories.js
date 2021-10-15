import React from 'react';
import SimpleTextBanner from './simple-text-banner';

export default {
    title: 'Maurices React App/Templates/Banner/SimpleTextBanner',
    component: SimpleTextBanner
}

const Template = (args) => <SimpleTextBanner {...args} />

export const SimpleTextBannerBanner = Template.bind({})

SimpleTextBannerBanner.args = {
    "label": "IN STORE + ONLINE",
    "title": "30% OFF",
    "subtite": "all dresses",
    "notation": "*exclusions apply",
    "color": "#E0F3F2",
    "textColor": "#58B7B1",
    "url": "#",
    "nav": [
        {
            "id": 0,
            "text": "Shop Now",
            "url": "#"
        },
        {
            "id": 1,
            "text": "Shop Plus",
            "url": "#"
        }
    ]
}