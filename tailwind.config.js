/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import flowbite from 'flowbite-react/tailwind'

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', flowbite.content()],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [flowbite.plugin()],
}
