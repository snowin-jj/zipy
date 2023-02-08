/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'media',
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'primary-700': '#783df4',
				'primary-600': '#8855f5',
				'primary-500': '#996df7',
				'primary-400': '#aa85f8',
				'primary-300': '#bb9df9',
				'primary-200': '#ccb5fb',
				'primary-100': '#dccdfc',
				'black-700': '#0d0d0d',
				'black-600': '#1a1a1a',
				'black-500': '#272727',
				'black-400': '#343434',
				'black-300': '#404040',
				'black-200': '#4d4d4d',
				'black-100': '#5a5a5a',
				'c-gray-700': '#909090',
				'c-gray-600': '#9d9d9d',
				'c-gray-500': '#aaaaaa',
				'c-gray-400': '#b7b7b7',
				'c-gray-300': '#c3c3c3',
				'c-gray-200': '#d0d0d0',
				'c-gray-100': '#dddddd',
			},
			fontFamily: {
				sans: ['var(--font-inter)'],
			},
			screens: {
				md: '700px',
				lg: '1400px',
			},
		},
	},
	plugins: [],
};
