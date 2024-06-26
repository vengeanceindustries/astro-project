import type { APIContext } from "astro";
import { getBannerDomain } from "@utils/banner.configs";

export async function GET({ cookies, currentLocale, url }: APIContext) {
	const bannerDomain = getBannerDomain(cookies); // url.origin || site || bannerDomain;
	const locale = currentLocale || "en";
	const route = `${bannerDomain}/api/content/${locale}/header.details.json`;

	const headers: HeadersInit = { "x-api-lang": currentLocale || "en-US" };

	const results = await fetch(route, { headers }).then((r) => r.json());
	const header = results?.header;
	// console.log("HeaderNav results.header:", header);

	if (!header || !Array.isArray(header)) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}

	const initial = {
		components: [] as any[],
		links: [] as any[],
		sections: [] as any[],
	};
	type HeaderReponse = typeof initial;

	const data = header.reduce((all, item, i) => {
		if (item.zone) {
			all.components.push(item);
			return all;
		}
		if ("headerLinks" in item) {
			all.links.push(...item.headerLinks);
		} else if ("headerSection" in item) {
			all.sections.push(...item.headerSection);
		}
		return all;
	}, initial);

	// console.log("data.sections", data.sections);

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...(import.meta.env.DEV && { "x-banner-route": route }), // debugging
		},
	});
}
