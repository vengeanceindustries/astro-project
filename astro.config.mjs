import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	adapter: netlify(),
	output: "server",
	i18n: {
		defaultLocale: "en",
		// locales: [ "en-US", "en-GB", "en-CA", "fr-CA", "fr-FR", "de-DE", "it-IT", "ko-KR" ],
		locales: [
			{
				path: "en",
				codes: ["en", "en-US", "en-CA", "en-GB"],
			},
			{
				path: "de",
				codes: ["de", "de-DE"],
			},
			{
				path: "fr",
				codes: ["fr", "fr-CA", "fr-FR"],
			},
			{
				path: "it",
				codes: ["it", "it-IT"],
			},
			// {
			// 	path: "ko",
			// 	codes: ["ko", "ko-KR"],
			// },
		],
		fallback: {
			de: "en",
			fr: "en",
			it: "en",
			// ko: "en",
		},
		routing: "manual",
		// routing: {
		// 	prefixDefaultLocale: false,
		// },
	},
	integrations: [
		partytown(),
		react(),
		tailwind({
			// Example: Disable injecting a basic `base.css` import on every page.
			// Useful if you need to define and/or import your own custom `base.css`.
			// applyBaseStyles: false,
		}),
	],
	server: { headers: {}, open: "/" },
	site: "https://www.footlocker.com", // @TODO: an integration that handles this per banner?
	domains: {
		"de": "https://www.footlocker.de",
		"fr": "https://www.footlocker.fr",
		"fr-CA": "https://www.footlocker.ca/fr/",
		"fr-FR": "https://www.footlocker.fr",
	},
});
