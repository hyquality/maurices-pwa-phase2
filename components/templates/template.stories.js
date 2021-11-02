import React from 'react';
import Template from './template';

export default {
    title: 'Maurices React App/Templates/Template',
    component: Template
}

const TemplateTemplate = (args) => <Template {...args} />

export const Default = TemplateTemplate.bind({})

Default.args = {
    template:             {
        "path": "./banner/simple-banner",
        "class": "simple-banner",
        "data": {
            "width": 336,
            "height": 336,
            "positionX": "center",
            "positionY": "bottom",
            "title": "JUST WHAT YOU’RE LOOKING FOR…",
            "titleColor": "white",
            "size": "text-base",
            "showCaption": true,
            "image": "/assets/images/slider/s0.jpg"
        }
    },
}