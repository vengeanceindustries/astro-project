import type { APIContext } from "astro";
import { getBannerDomain } from "@utils/banner.configs";
import { objectToParams } from "@utils/search";

export async function GET(ctx: APIContext) {
	const { redirect, url } = ctx;
	const bannerDomain = getBannerDomain(ctx);
	const locale = ctx.currentLocale || "en-US";
	const baseRoute = `${bannerDomain}/zgw/search-core/redirects/category`;

	const query = url.searchParams.get("q") || url.searchParams.get("query");
	const searchParams = objectToParams({ q: query });
	const route = `${baseRoute}?${searchParams}`;

	const headers: HeadersInit = { "x-api-lang": locale };

	const results = await fetch(route, { headers }).then((r) => r.json());
	console.log("redirect?", { route, headers }, results);

	if (!results) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}

	if (results.redirect) {
		return redirect(results.redirect, 302);
	}

	return new Response(JSON.stringify(results), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...(import.meta.env.DEV && { "x-banner-route": route }),
		},
	});
}
