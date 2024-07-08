import type { APIContext } from "astro";
import { getBannerDomain } from "@utils/banner.configs";
import type { ValueOf } from "node_modules/astro/dist/type-utils";

export interface FooterResponse {
	footer: Footer[];
}

export interface Footer {
	affiliates?: Affiliate[];
	callouts?: Callout[];
	footerLinks?: FooterLink[];
	properties?: Property[];
	quickLinks?: QuickLink[];
	socialLinks?: SocialLink[];
}

export interface Affiliate {
	title: string;
	logo: string;
	url: string;
	alt: string;
	isNewWindow: boolean;
}

export interface Callout {
	title: string;
	desc: string;
	linkdesc: string;
	linkurl: string;
	isNewWindow: boolean;
}

export interface FooterLink {
	heading: string;
	links: Link[];
}

interface Link {
	desc: string;
	url: string;
	isNewWindow: boolean;
}

export interface Property {
	legal?: string;
	copyright?: string;
}

export interface QuickLink {
	label: string;
	url: string;
	image: string;
	isNewWindow: boolean;
}

export interface SocialLink {
	icon: string;
	url: string;
	alt: string;
	isNewWindow: boolean;
}

export async function GET(ctx: APIContext) {
	const bannerDomain = getBannerDomain(ctx);
	const { currentLocale, site, url } = ctx;
	console.log("APIContext:", { site, url });
	const lang = currentLocale || "en";
	const locale = currentLocale || "en-US";
	const route = `${bannerDomain}/api/content/${lang}/footer.details.json`;

	const headers: HeadersInit = { "x-api-lang": locale };
	const init: RequestInit = { headers };
	let resp;
	try {
		resp = await fetch(route, init).then((r) => r.json());
	} catch (err) {
		console.error(`Error with route ${route}:`, err);
	}

	const footer = resp?.footer as Footer;
	// console.log("footer:", footer);

	if (!footer || !Array.isArray(footer)) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}

	const data = footer.reduce((all, item, i) => {
		const [key, val] = Object.entries(item)[0];
		all[key as keyof Footer] = val;
		return all;
	}, {} as Footer);

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...(import.meta.env.DEV && { "x-banner-route": route }), // debugging
		},
	});
}
