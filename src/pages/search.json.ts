import { APIContext } from "astro";
import { getBannerDomain } from "../utils/banner.configs";
import { objectToParams } from "../utils/search";

export async function GET({ currentLocale, redirect, url }: APIContext) {
	const bannerDomain = getBannerDomain();
	const baseRoute = `${bannerDomain}/zgw/search-core/products/v2/search`;

	// const searchParams = url.searchParams.toString();
	const searchParams = objectToParams({
		currentPage: url.searchParams.get("currentPage") || 0,
		query: url.searchParams.get("query"),
		pageSize: url.searchParams.get("pageSize") || 48,
		pageType: url.searchParams.get("pageType") || "search",
		sort: url.searchParams.get("sort"),
	});
	const route = `${baseRoute}?${searchParams}`;

	const headers: HeadersInit = { "x-api-lang": currentLocale || "en-US" };

	const results = await fetch(route, { headers }).then((r) => r.json());

	if (!results) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}

	return new Response(JSON.stringify(results), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}