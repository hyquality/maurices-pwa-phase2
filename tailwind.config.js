const {toRgba} = require("tailwindcss/lib/util/withAlphaVariable");
module.exports = {
   // mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        container: {
            // you can configure the container to be centered
            center: true,

            // or have default horizontal padding
            padding: '1rem',

            // default breakpoints but with 40px removed
            screens: {
                sm: '600px',
                md: '768px',
                lg: '984px',
                xl: '1240px',
                '2xl': '1440px',
            },
        },

        extend: {
            minWidth: {
                'min352': '22rem',
            },
            maxWidth: {
                'logo-width': '18rem',
                'max-13': '13rem',
                'cellout-width': '4.5rem',
                'cellout-width-small': '3.5rem',
            },
            colors: {
                'main': '#5D5D5D',
                'red': '#FF5353',
                'red_2': '#D03C3C',
                'gray_1': '#F6F8F8',
                'gray_2': '#4B5666',
                'gray_3': '#D4D5D5',
                'gray_4': '#333333',
                'gray_border': '#E8EBEB',
                'green': '#58B7B1',
                'balck_7': 'rgba(0,0,0,0.7)',
                success: '#0070f3',
                cyan: '#79FFE1',
            },
            spacing: {
                28: '7rem',
                '30px': '1.875rem'
            },
            letterSpacing: {
                menu: '0.094rem',
                tighter: '-.04em',
            },
            lineHeight: {
                tight: 1.2,
            },
            fontSize: {
                'sm-10': '0.625rem',
                '5xl': '2.5rem',
                '6xl': '2.75rem',
                '7xl': '4.5rem',
                '8xl': '6.25rem',
            },
            boxShadow: {
                small: '0 1px 5px rgba(0, 0, 0, 0.12)',
                medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}