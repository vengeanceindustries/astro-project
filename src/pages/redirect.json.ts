import { APIContext } from "astro";
import { getBannerDomain } from "../utils/banner.configs";
import { objectToParams } from "../utils/search";

export async function GET({ currentLocale, redirect, url }: APIContext) {
	const bannerDomain = getBannerDomain();
	console.log({ bannerDomain });
	const baseRoute = `${bannerDomain}/zgw/search-core/redirects/category`;

	const searchParams = objectToParams({
		q: url.searchParams.get("q") || url.searchParams.get("query"),
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

	if (results.redirect) {
		return redirect(results.redirect, 302);
	}

	return new Response(JSON.stringify(results), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
