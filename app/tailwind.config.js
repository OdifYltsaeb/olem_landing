const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/styles/**/*.{css, scss}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat'],
                fancy: ['Barlow Condensed'],
            },
            colors: {
                orange: '#FDA769',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: ['dim', 'emerald'],
        darkTheme: 'dim',
    },
};
