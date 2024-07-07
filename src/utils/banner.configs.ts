import type { APIContext, AstroCookies } from "astro";

/**
 * Banner Detection Scenarios
 * ==========================
 * DATA:
 * server request => host => domain
 * window location => host => domain
 */

export const banners = {
	CS: {
		bannerType: "CS",
		defaultCountry: "US",
		host: "champssports.com",
		name: "Champs Sports",
		siteId: "CS",
	},
	FL: {
		bannerType: "FL",
		defaultCountry: "US",
		host: "footlocker.com",
		name: "Foot Locker",
		siteId: "FL",
	},
	FLCA: {
		bannerType: "FL",
		defaultCountry: "CA",
		host: "footlocker.ca",
		name: "Foot Locker Canada",
		siteId: "FLCA",
	},
	KFL: {
		bannerType: "LFL",
		defaultCountry: "US",
		host: "kidsfootlocker.com",
		name: "Kids Foot Locker",
		siteId: "KFL",
	},
};

export const BANNER_DEFAULT = "FL";

export function getBannerFromId(id: string): typeof banners.FL {
	return banners[id as keyof typeof banners] || banners[BANNER_DEFAULT];
}

export function getBannerDomain({ cookies, site, url }: APIContext) {
	const remote = import.meta.env.PUBLIC_REMOTE || "uat2";
	const subdomains = import.meta.env.PROD ? "" : `${remote}.origin.`;

	const cookie = cookies?.get("FL_BANNER_ID")?.value;
	console.log("getBannerDomain", { cookie });

	const id = cookie || import.meta.env.PUBLIC_BANNER;
	const host = url.host || getBannerFromId(id).host;

	return `https://www.${subdomains}${host}`;
}

export function getBannerConfigFromHost(hostname: string) {
	const obj = Object.values(banners).find((b) => b.host === hostname);
	return obj || banners[BANNER_DEFAULT];
}

export function getBannerFromHost(hostname: string) {
	const obj = Object.values(banners).find((b) => b.host === hostname);
	return obj?.siteId || BANNER_DEFAULT;
}
