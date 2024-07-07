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

export async function GET(ctx: APIContext) {
	const bannerDomain = getBannerDomain(ctx);
	const lang = ctx.currentLocale || "en";
	const locale = ctx.currentLocale || "en-US";
	const slug = ctx.params.page?.split(".")?.[0];
	const route = `${bannerDomain}/api/content/${lang}/${slug}.page.json`;
	// console.log("page.[page].json:", { route });

	const headers: HeadersInit = { "x-api-lang": locale };

	try {
		const results = await fetch(route, { headers }).then((r) => {
			console.log("page.[page].json response:", {
				status: r.status,
				statusText: r.statusText,
				body: r.body,
			});
			return r.json();
		});

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
	} catch (err) {
		console.error("AEM Page JSON error:", err);
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}
}
