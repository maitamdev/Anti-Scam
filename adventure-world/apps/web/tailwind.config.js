/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#E6F0FF',
                    100: '#B3D1FF',
                    500: '#2563EB',
                    700: '#1D4ED8',
                    900: '#1E3A8A',
                },
                secondary: {
                    50: '#ECFDF5',
                    500: '#10B981',
                    700: '#047857',
                },
            },
        },
    },
    plugins: [],
};
