import React from 'react';

import Breadcrumbs from './breadcrumbs';

export default {
  title: 'Maurices React App/Breadcrumbs',
  component: Breadcrumbs
/*  argTypes: {
    backgroundColor: { control: 'color' },
  },*/
};

const Template = (args) => <Breadcrumbs {...args} />;

export const Home = Template.bind({});
Home.args = {
  title: 'Home',
};

export const Test = Template.bind({});
Test.args = {
  title: 'Test',
};
