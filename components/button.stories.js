import React from 'react';

import Button from './button';

export default {
  title: 'Maurices React App/Elements/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};


const Template = (args) => <Button {...args} />;

export const Small = Template.bind({});
Small.args = {
  label: 'Button',
  size: 'small'
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Button',
  size: 'medium'
};
