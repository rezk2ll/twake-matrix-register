/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'coolgray': '#EDEEF0'
			},
			backgroundImage: {
				'layout': 'url("/Chat-bubble-dynamic-clay.png"), url("/Chat-bubble-dynamic-clay.png") '
			}	
		}
	},
	plugins: []
};
