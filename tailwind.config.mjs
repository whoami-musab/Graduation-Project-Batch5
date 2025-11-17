/** @type {import('tailwindcss').Config} */

const config = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
        colors: {
            myBorderColor: '#d4145a',
        },
        },
    },
    plugins: [],
};

export default config;
