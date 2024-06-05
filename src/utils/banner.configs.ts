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

export function getBanner(
	id: keyof typeof banners | string
): typeof banners.FL {
	return banners[id as keyof typeof banners] || banners.FL;
}

export function getBannerDomain() {
	// const bannerDomain = "https://www.uat2.origin.footlocker.com";
	const remote = import.meta.env.PUBLIC_REMOTE || "uat2";
	const subdomains = import.meta.env.PROD ? "" : `${remote}.origin.`;

	const banner = import.meta.env.PUBLIC_BANNER;
	const host = getBanner(banner).host; // "footlocker.com"; // based on banner

	return `https://www.${subdomains}${host}`;
}
