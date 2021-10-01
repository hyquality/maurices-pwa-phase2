import React from 'react';
import PlpDescription from './plp-description';


export default {
  title: 'Maurices React App/Plp/Description',
  component: PlpDescription
};

const Template = (args) => <PlpDescription {...args} />;

export const Desc = Template.bind({});

Desc.args = {
  data: {
    title: "Text Title",
    text: "When it comes to fashion finds, our fashion tops are where it’s at. "
  },
};
