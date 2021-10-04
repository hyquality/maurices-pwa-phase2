import React from 'react';

import CalloutItem from './callout-item';

export default {
    title: 'Maurices React App/Elements/CalloutItem',
    component: CalloutItem
};

const Template = (args) => <CalloutItem {...args} />;

export const Default = Template.bind({});

Default.args = {
    data: {
        id: 0,
        title: "Title",
        icon: "/assets/images/cell_1.png",
        text: "description",
        nav: [
            {
                "id": 0,
                "text": "Learn More",
                "url": "#"
            },
            {
                "id": 1,
                "text": "Sign Up Free",
                "url": "#"
            }
        ]
    }
};

