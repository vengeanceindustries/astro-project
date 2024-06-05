import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	adapter: netlify(),
	output: "server",
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
});
