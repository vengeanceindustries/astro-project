import { getBannerDomain } from "../utils/banner.configs";

export async function GET({ params, request, site, url }) {
	const model = url.searchParams.get("model");
	const sku = url.searchParams.get("sku");

	const bannerDomain = getBannerDomain();
	const baseRoute = `${bannerDomain}/zgw/product-core/v1/pdp/`;
	const route = sku
		? `${baseRoute}/sku/${sku}`
		: `${baseRoute}/model/${model}`;

	const product = await fetch(route).then((r) => r.json());

	if (!product) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}

	return new Response(JSON.stringify(product), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
