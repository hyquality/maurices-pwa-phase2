import React from 'react';
import Hero from './hero';

export default {
    title: 'Maurices React App/Elements/Banner/Hero',
    component: Hero,
    argTypes: {
        backgroundColor: { control: 'highlightColor' },
    },
}

const Template = (args) => <Hero {...args} />

export const HeroBanner = Template.bind({})

HeroBanner.args = {
    fullwidth: true,
    top: "A Very Merry Gift Guide",
    title: "Title",
    titleColor: undefined,
    text: "description",
    background: {
        first: "#f2f3f7",
        second: "#dddfe9"
    },
    image: "/assets/images/banners/hero/hero1.png",
    button: {
        title: "Button",
        url: "#"
    },
    highlight: false,
    highlightColor: "",
    highlightHeight: 0,
}

