/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'coolgray': '#EDEEF0'
			},
			backgroundImage: {
				'layout': 'url("/bubble-dynamic-clay.svg"), url("/calendar-dynamic-clay.svg"), url("/copy-dynamic-clay.svg"), url("/mail-dynamic-clay.svg")'
			},
			backgroundPosition: {
				'layout': 'top left 600px, left 400px bottom, right 20px bottom,top 150px right'
			}
		}
	},
	plugins: []
};
