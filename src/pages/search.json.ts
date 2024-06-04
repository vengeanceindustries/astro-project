import { APIRoute } from "astro";

export function objectToParams(obj: Record<string, any>) {
	return new URLSearchParams(obj).toString();
}

export const GET: APIRoute = async ({ request, currentLocale, url }) => {
	const bannerDomain = "https://www.uat2.origin.footlocker.com";
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

	const headers: HeadersInit = { "x-api-lang": currentLocale || "en" };

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
};
