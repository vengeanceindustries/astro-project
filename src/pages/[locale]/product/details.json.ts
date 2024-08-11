import type { APIContext } from "astro";
import { getBannerDomain } from "@utils/banner.configs";

export async function GET(ctx: APIContext) {
	const bannerDomain = getBannerDomain(ctx);
	const locale = ctx.currentLocale || "en-US";
	const { url } = ctx;
	const model = url.searchParams.get("model");
	const sku = url.searchParams.get("sku");
	const baseRoute = `${bannerDomain}/zgw/product-core/v1/pdp/`;
	const route = sku
		? `${baseRoute}/sku/${sku}`
		: `${baseRoute}/model/${model}`;

	const headers: HeadersInit = { "x-api-lang": locale };
	console.log("GET /product/details.json", {
		bannerDomain,
		// requestHost,
		route,
	});
	const resp = await fetch(route, { headers }); // .then((r) => r.json());
	console.log("JSON 👉", resp);
	return resp;
	// let results;
	// let data;
	// try {
	// 	results = await resp.json();
	// 	data = JSON.stringify(results);
	// } catch (err) {
	// 	console.error("❌👉", err);
	// }

	// // if (!results) {
	// // 	return new Response(JSON.stringify(results), {
	// // 		status: 404,
	// // 		statusText: "Not found",
	// // 	});
	// // }

	// return new Response(data, {
	// 	// status: 200,
	// 	status: resp.status,
	// 	statusText: resp.statusText,
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		...(import.meta.env.DEV && { "x-banner-route": route }), // debugging
	// 	},
	// });
}
