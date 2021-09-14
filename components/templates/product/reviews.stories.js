import React from 'react';

import Reviews from './reviews';

export default {
    title: 'Maurices React App/Product/Reviews',
    component: Reviews
};

const Template = (args) => <Reviews {...args} />;

export const Main = Template.bind({});

Main.args = {
    reviews: {
        "total": 4,
        "avg": 3
    },
    size: "small",
    showReviewNumber: true
};


