/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./resources/**/*.blade.php","./resources/**/*.{js,ts,jsx,tsx}"],
        theme: {
            extend: {
                fontFamily: {
                   hepta: ['"Hepta Slab"', 'ui-sans-serif', 'system.ui', 'sans-serif'],
                   
                }
            },
        }, plugins: [],
        };
    
