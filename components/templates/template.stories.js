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
            "w": 336,
            "h": 336,
            "x": "center",
            "y": "bottom",
            "title": "JUST WHAT YOU’RE LOOKING FOR…",
            "titleColor": "white",
            "size": "text-base",
            "showCaption": true,
            "image": "/assets/images/slider/s0.jpg"
        }
    },
}