import React from 'react';

import HeaderTitle from './header-title';

export default {
    title: 'Maurices React App/Templates/Title',
    component: HeaderTitle
};

const Template = (args) => <HeaderTitle {...args} />;

export const Small = Template.bind({});

Small.args = {
    tag:"h1",
    style: "normal",
    children: "Title",
    className: "",
    size: 'small',
    weight: 'regular',
    color: undefined,
    upper: false,
    position: 'center',
    highlight: false,
    highlightColor: "",
    highlightHeight: 0
};

