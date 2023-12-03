/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			keyframes: {
				scrollLeft: {
					'0%': {
						transform: 'translateX(10%)',
					},
					'25%': {
						transform: 'translateX(0%)',
					},
					'50%': {
						transform: 'translateX(-10%)',
					},
					'75%': {
						transform: 'translateX(0%)',
					},
					'100%': {
						transform: 'translateX(10%)',
					},
				},
				scrollRight: {
					'0%': {
						transform: 'translateX(-10%)',
					},
					'25%': {
						transform: 'translateX(0%)',
					},
					'50%': {
						transform: 'translateX(10%)',
					},
					'75%': {
						transform: 'translateX(0%)',
					},
					'100%': {
						transform: 'translateX(-10%)',
					},
				},
			},
			animation: {
				"scroll-left": "scrollLeft 250s linear infinite",
				"scroll-right": "scrollRight 225s linear infinite",
			}
		},
	},
	plugins: [],
}
