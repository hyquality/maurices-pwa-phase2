import React from 'react';
import SimpleBanner from './simple-banner';

export default {
    title: 'Maurices React App/Templates/Banner/SimpleBanner',
    component: SimpleBanner
}

const Template = (args) => <SimpleBanner {...args} />

export const SimpleBannerBanner = Template.bind({})

SimpleBannerBanner.args = {
    "width": 336,
    "height": 336,
    "positionX": "left",
    "positionY": "center",
    "title": "Tops",
    "titleTextAlign": "left",
    "size": "text-3xl",
    "showCaption": true,
    "image": "/assets/images/slider/s1.jpg"
}