import type { APIContext } from "astro";
import { getBannerDomain } from "@utils/banner.configs";

export interface HeaderResponse {
	header: Header[];
}

export interface Header {
	headerSection?: HeaderSection[];
	headerLinks?: HeaderLink[];
}

export interface HeaderLink {
	name: string;
	linkPath: string;
}

export interface HeaderSection {
	name: string;
	categories: Category[];
	linkPath?: string;
}

export interface Category {
	"name": string;
	"hidden": boolean;
	"expandByDefault"?: boolean;
	"type": "icons" | "list" | "promoLinks";
	"links": Link[];
	"sub-categories": unknown[];
	"style"?: string;
	"linkPath"?: string;
}

export interface Link {
	shopAll?: boolean;
	text?: string;
	url: string;
	icon?: Icon;
	image?: string;
}

export interface Icon {
	name: string;
	url: string;
}

export async function GET(ctx: APIContext) {
	const bannerDomain = getBannerDomain(ctx);
	const lang = ctx.currentLocale || "en";
	const locale = ctx.currentLocale || "en-US";
	const route = `${bannerDomain}/api/content/${lang}/header.details.json`;

	const headers: HeadersInit = { "x-api-lang": locale };
	const init: RequestInit = { headers };
	let resp;
	try {
		resp = await fetch(route, init).then((r) => r.json());
	} catch (err) {
		console.error(`Error with route ${route}:`, err);
	}

	const header = resp?.header as Header;
	// console.log("resp.header:", header);

	if (!header || !Array.isArray(header)) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}

	const initial = {
		components: [] as unknown[],
		links: [] as HeaderLink[],
		sections: [] as HeaderSection[],
	};

	const data = header.reduce((all, item) => {
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

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...(import.meta.env.DEV && { "x-banner-route": route }), // debugging
		},
	});
}
