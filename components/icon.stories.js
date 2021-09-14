import React from 'react';
import Icon from './icon'
import {faHeart} from "@fortawesome/free-solid-svg-icons";

export default {
    title: 'Maurices React App/Icon',
    component: Icon,
};

const Template = (args) => <Icon {...args} />;

export const Main = Template.bind({});

Main.args = {
    icon: faHeart,
    className: "",
    size: "small"
};
