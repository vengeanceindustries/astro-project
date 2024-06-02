/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			backgroundImage: {
				"blue-purple-gradient":
					"linear-gradient(83.21deg, #3245FF 0%, #B845ED 100%)",
				"blue-green-gradient":
					"linear-gradient(247.23deg, #4AF2C8 0%, #2F4CB3 100%)",
				"red-pink-gradient":
					"linear-gradient(66.77deg, #D83333 0%, #F041FF 100%)",
				"orange-yellow-gradient":
					"linear-gradient(266.93deg, #F8E42E 0%, #FF7D54 100%)",
			},
		},
	},
	plugins: [],
};
