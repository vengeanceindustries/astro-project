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
		bannerType: "KFL",
		defaultCountry: "US",
		host: "kidsfootlocker.com",
		name: "Kids Foot Locker",
		siteId: "KFL",
	},
};

export const BANNER_DEFAULT = "FL";
export const SITE_ID_COOKIE = "siteId";

export function getBannerFromId(id: string | undefined): typeof banners.FL {
	return banners[id as keyof typeof banners] || banners[BANNER_DEFAULT];
}

export function getValidHostname(url: URL) {
	const banner = Object.values(banners).find((b) => b.host === url.hostname);
	return banner?.host;
}

export function getBannerHost({ cookies, site, url }: APIContext) {
	const hostname = getValidHostname(url);
	if (hostname) return hostname;

	const cookie = cookies?.get(SITE_ID_COOKIE)?.value;
	const id = cookie || import.meta.env.PUBLIC_BANNER;
	return getBannerFromId(id)?.host;
}

export function getBannerDomain(ctx: APIContext) {
	const remote = import.meta.env.PUBLIC_REMOTE || "uat2";
	const subdomains = import.meta.env.PROD ? "" : `${remote}.origin.`;

	const host = getBannerHost(ctx);
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
