/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'coolgray': '#EDEEF0'
			},
			backgroundImage: {
				'layout': 'url("/bubble-dynamic-clay.svg"), url("/lock-dynamic-clay.png")'
			},
			backgroundPosition: {
				'layout': 'top left 600px, left 100px bottom -140px'
			},
			backgroundSize: {
				'layout': 'auto, 20%'
			},
			zIndex: {
				"-1": "-1"
			},
			transformOrigin: {
				"0": "0%"
			}
		}
	},
	plugins: []
};
