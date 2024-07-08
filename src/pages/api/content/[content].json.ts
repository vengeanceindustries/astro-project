import type { APIContext } from "astro";
import { getBannerDomain } from "@utils/banner.configs";

export async function GET(ctx: APIContext) {
	const bannerDomain = getBannerDomain(ctx);
	const lang = ctx.currentLocale || "en";
	const locale = ctx.currentLocale || "en-US";
	const slug = ctx.params.content?.split(".")?.[0];
	const route = `${bannerDomain}/api/content/${lang}/${slug}.details.json`;
	console.log("GET content:", { route });

	const headers: HeadersInit = { "x-api-lang": locale };
	let resp;

	try {
		resp = await fetch(route, { headers }).then((r) => r.json());
	} catch (err) {
		console.error(`Error with route ${route}:`, err);
	}

	if (!resp) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}

	// console.log("Content resp:", resp);
	return new Response(JSON.stringify(resp), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...(import.meta.env.DEV && { "x-banner-route": route }), // debugging
		},
	});
}
