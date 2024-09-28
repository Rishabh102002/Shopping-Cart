/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Space Grotesk","Inter", "sans-serif"], // Replace 'Inter' with your font family
            },
            boxShadow: {
                custom: "0px 8px 8px -8px rgba(15, 15, 15, 0.16)",
            },
        },
    },
    plugins: [],
};

