import type { APIContext } from "astro";
import { getBannerDomain } from "@utils/banner.configs";

export async function GET({ currentLocale, site, url }: APIContext) {
	const model = url.searchParams.get("model");
	const sku = url.searchParams.get("sku");

	const bannerDomain = getBannerDomain();
	const requestHost = bannerDomain; // url.origin || site || bannerDomain;
	const baseRoute = `${requestHost}/zgw/product-core/v1/pdp/`;
	const route = sku
		? `${baseRoute}/sku/${sku}`
		: `${baseRoute}/model/${model}`;

	const headers: HeadersInit = { "x-api-lang": currentLocale || "en-US" };

	// console.log("GET /product.json", { bannerDomain, requestHost, route });
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
			...(import.meta.env.DEV && { "x-banner-route": route }),
		},
	});
}
