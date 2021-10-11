import React from 'react';

import PlpFilter from './plp-filter';

export default {
    title: 'Maurices React App/Plp/Filter',
    component: PlpFilter
};

const Template = (args) => <PlpFilter {...args} />;

export const Filter = Template.bind({});
Filter.args = {
    collection: {
        title: "Text Title",
        slug: "mew-tops2",
        subcategories: [
            {
                "title": "Shirts & Blouses",
                "qty": "123",
                "image": "/assets/images/plp/catHead_01.jpg",
                "url": "/clothing/tops/shirts-blouses"
            },
            {
                "title": "Tees",
                "qty": "191",
                "image": "/assets/images/plp/catHead_02.jpg",
                "url": "/clothing/tops/tees"
            }
        ]
    },
};
