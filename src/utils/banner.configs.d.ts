declare interface Banner {
	bannerType: BannerType;
	defaultCountry: CountryCode;
	host: string;
	name: string;
	siteId: SiteId;
}
declare type BannerType = "CS" | "FL" | "KFL";
declare type CountryCode = "CA" | "US";
// declare type CountryCode = "AU" | "CA" | "UK" | "US";
declare type SiteId = BannerType | "CSCA" | `FL${CountryCode}`;
