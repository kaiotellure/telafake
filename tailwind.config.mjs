/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			opensans: "Open Sans, sans-serif"
		},
		extend: {
			borderColor: {
				DEFAULT: 'rgba(0,0,0,.2)'
			}
		},
	},
	plugins: [],
}
