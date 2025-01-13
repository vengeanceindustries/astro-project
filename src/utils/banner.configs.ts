import type { APIContext, AstroCookies, AstroGlobal } from "astro";

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
export const BANNER_COOKIE = "banner";
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
/**
 * 1) get siteId from search params, eg `?siteId=FLCA`; derive banner object
 * 2) get stored banner object cookie & parse
 * 3) get banner object from stored siteId cookie; derive banner object
 */
export function getBannerFromAstro({ cookies, url }: Pick<AstroGlobal, "cookies" | "url">) {
	let banner = {} as ReturnType<typeof getBannerFromId>;

	const objCookie = cookies.get(BANNER_COOKIE)?.value;
	const searchParam = url.searchParams.get(SITE_ID_COOKIE);

	if (!searchParam && objCookie) {
		banner = JSON.parse(objCookie);
	} else {
		const idCookie = cookies.get(SITE_ID_COOKIE)?.value;
		banner = getBannerFromId(searchParam || idCookie);
	}
	return banner;
}

export function setBannerFromAstro({ cookies, url }: Pick<AstroGlobal, "cookies" | "url">) {
	let siteId = url.searchParams.get(SITE_ID_COOKIE) || cookies.get(SITE_ID_COOKIE)?.value || BANNER_DEFAULT;
	// console.log("BannerSetForm", Astro.request.method, { siteId });
	cookies.set(SITE_ID_COOKIE, siteId, { path: "/" });

	let banner = getBannerFromId(siteId);
	// console.log("BannerSetForm banner:", banner);
	cookies.set(BANNER_COOKIE, banner, { path: "/" });

	return banner;
}
