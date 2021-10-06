import React from 'react';

import ColorSwatch from './color-swatch';

export default {
    title: 'Maurices React App/Product/ColorSwatch',
    component: ColorSwatch
};

const Template = (args) => <ColorSwatch {...args} />;


export const Main = Template.bind({});

Main.args = {
    colors: [
        {
            /** Title of the color */
            title: "Red",
            /** Short name of the color */
            short: "red",
            key: "color",
            image: {
                main: "/assets/images/plp/115961_C5426.jpeg",
                hover: "/assets/images/plp/118676_C7453.jpeg"
            },
            prices: [
                {
                    price: {
                        main: "25.00",
                        old: "27.00",
                        msg: "Limited Time! Now 30% Off"
                    }
                }
            ]
        },
        {
            title: "Green",
            short: "green",
            key: "color",
            image: {
                main: "/assets/images/plp/115961_C5426.jpeg",
                hover: "/assets/images/plp/118676_C7453.jpeg"
            },
            prices: [
                {
                    price: {
                        main: "25.00",
                        old: "27.00",
                        msg: "Limited Time! Now 30% Off"
                    }
                }
            ]
        }
    ],
    className: "",
    selectedVariant: {
        "title": "",
        "attributes": {
            "color": {
                "title": "Red",
                "short": "red"
            },
            "size": {
                "title": "Small",
                "short": "S"
            },
            "fit": {
                "title": "Regular",
                "short": "regular"
            }
        },
        "image": {
            "main": "/assets/images/plp/43394_C7978.jpeg",
            "hover": "/assets/images/plp/118676_C7453.jpeg"
        },
        "gallery": [
            {
                "image": "/assets/images/plp/43394_C7978.jpeg"
            },
            {
                "image": "/assets/images/plp/118676_C7453.jpeg"
            }
        ],
        "price": {
            "main": 34.00
        }
    },
    productSlug: "kimono-cowl-neck-poncho"
};


