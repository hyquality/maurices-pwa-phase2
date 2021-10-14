import React from 'react';
import Accent from './accent';

export default {
    title: 'Maurices React App/Elements/Banner/Accent',
    component: Accent,
}

const Template = (args) => <Accent {...args} />

export const AccentBanner = Template.bind({})

AccentBanner.args = {
    "w": 700,
    "h": 695,
    "title": "Keep it Cozy",
    "description": "Sweaters that feel as good as they look.",
    "showCaption": true,
    "image": "/assets/images/banners/ads/column-banner2.jpg",
    "className": "w-1/3 m-auto",
    "nav": [
        {
            "text": "Shop Sweaters",
            "url": "#"
        },
        {
            "text": "Plus Sweaters",
            "url": "#"
        }
    ]
}
