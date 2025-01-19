import type { APIContext, AstroGlobal } from "astro";

type Banners = Record<SiteId, Banner>;

export const banners = {
	CS: {
		bannerType: "CS",
		defaultCountry: "US",
		host: "champssports.com",
		name: "Champs Sports",
		siteId: "CS",
	},
	CSCA: {
		bannerType: "CS",
		defaultCountry: "CA",
		host: "champssports.ca",
		name: "Champs Sports Canada",
		siteId: "CSCA",
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
} as Banners;

export const BANNER_DEFAULT = "FL";
export const SITE_ID_COOKIE = "siteId";

export function getBannerFromId(id: string | undefined): typeof banners.FL {
	return banners[id as keyof typeof banners] || banners[BANNER_DEFAULT];
}

export function getValidHostname(url: URL) {
	const banner = Object.values(banners).find((b) => b.host === url.hostname);
	return banner?.host;
}

export function getBannerHost({ cookies, url }: APIContext) {
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
/**
 * 1) get siteId from search params, eg `?siteId=FLCA`; derive banner object
 * 2) get stored banner object cookie & parse
 * 3) get banner object from stored siteId cookie; derive banner object
 */
export function getBannerFromAstro(context: AstroGlobal) {
	const siteId = context.params.siteId?.toUpperCase();
	console.log("getBannerFromAstro", { siteId });
	let banner = getBannerFromId(siteId);
	return banner;
}

export function setBannerFromAstro(context: APIContext) {
	const siteId = context.params.siteId?.toUpperCase();
	const locale = context.params.locale ?? context.currentLocale ?? context.preferredLocale!;
	const banner = getBannerFromId(siteId);
	const isBannerMatch = banner?.siteId === siteId;
	console.log("setBannerFromAstro", { siteId, locale, isBannerMatch }, banner);
	// context.locals.banner = banner;

	if (!isBannerMatch) {
		return context.redirect(`/${banner?.siteId}/${locale}/`);
	}
}
