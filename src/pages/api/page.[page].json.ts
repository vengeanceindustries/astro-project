import type { APIContext } from "astro";
import { getBannerDomain } from "@utils/banner.configs";

export function sanitizeContent(obj: any) {
	if (Array.isArray(obj)) {
		return obj.reduce((all, c) => {
			all.push(sanitizeContent(c));
			return all;
		}, []);
	}
	if (typeof obj === "object") {
		if ("bi" in obj) delete obj.bi;
		if ("cq" in obj) delete obj.cq;
		// if ("guid" in obj) delete obj.guid;

		const entries = Object.entries(obj);
		entries.forEach(([key, val]) => {
			obj[key] = sanitizeContent(val);
		});
		return obj;
	}
	return obj;
}

export async function GET({ cookies, currentLocale, params, url }: APIContext) {
	// console.log("url:", url);
	// console.log("params:", params);
	const bannerDomain = getBannerDomain(cookies); // url.origin || site || bannerDomain;
	const locale = currentLocale || "en";
	const slug = params.page?.split(".")?.[0];
	const route = `${bannerDomain}/api/content/${locale}/${slug}.page.json`;

	const headers: HeadersInit = { "x-api-lang": currentLocale || "en-US" };

	const results = await fetch(route, { headers }).then((r) => r.json());

	if (!results?.page) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}

	// public-facing // @TODO figure out what would need to change for AEM //
	const data = sanitizeContent(results.page);

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...(import.meta.env.DEV && { "x-banner-route": route }), // debugging
		},
	});
}
