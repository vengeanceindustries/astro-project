declare interface ProductDetailsResponse {
	id: string;
	model: Model;
	style: Style;
	inventory: Inventory;
	sizes: Size[];
	styleVariants: StyleVariant[];
	sizeChart: SizeChart;
}

declare interface Inventory {
	inventoryAvailable: boolean;
	storeInventoryAvailable: boolean;
	warehouseInventoryAvailable: boolean;
	dropshipInventoryAvailable: boolean | null;
	inventoryAvailableLocations: string[] | null;
	preSell: boolean | null;
	backOrder: boolean | null;
	purchaseOrderDate: null | string;
}

declare interface Model {
	id: ModelDocumentIDEnum;
	modelWebKey: string;
	companyNumber: string;
	banner: Banner;
	languageIsoCode: LanguageISOCode;
	active: boolean;
	number: number;
	name: Name;
	description: string;
	keywords: any[];
	brand: string;
	genders: string[];
	sports: string[];
	vendor: null;
	productHierarchy: ProductHierarchy;
	sizeChartId: string;
}

declare type Banner = string;
// declare enum Banner {
// 	Footlocker = "Footlocker",
// 	KidsFootlocker = "Kids Footlocker",
// }

declare enum LanguageISOCode {
	EnUs = "en-us",
}

declare type ModelDocumentIDEnum = string;
declare type Name = string;
declare type StyleDocumentIDEnum = string;

declare interface ProductHierarchy {
	productTypes: string[];
	styles: string[];
	subStyles: string[];
}

declare interface SizeChart {
	id: string;
	sizeChartGridMap: SizeChartGridMap[];
	sizeChartTipTx: string;
	sizeChartImage: string;
}

declare interface SizeChartGridMap {
	label: string;
	sizes: string[];
}

declare interface Size {
	id: string;
	productWebKey: string;
	styleDocumentId: StyleDocumentIDEnum;
	modelDocumentId: ModelDocumentIDEnum;
	companyNumber: string;
	banner: Banner;
	languageIsoCode: LanguageISOCode;
	active: boolean;
	productNumber: string;
	size: string;
	strippedSize: string;
	sizeVariants: null;
	upc: string;
	storeUpc: string;
	storeSku: StoreSku;
	price: Price;
	priceNet: null;
	inventory: Inventory;
}

declare interface Price {
	listPrice: number;
	salePrice: number;
	formattedListPrice: FormattedPrice;
	formattedSalePrice: FormattedPrice;
	currencyIso: null;
	vendorShippingPrice: number | null;
	formattedVendorShippingPrice: FormattedPrice;
	priceRange: PriceRange;
	taxClassificationCode: null | string;
	topSalesAmount: number | null;
}

declare type FormattedPrice = string;

declare type PriceRange = string;

declare type Sku = string;

declare type StoreSku = string;

declare interface Style {
	id: StyleDocumentIDEnum;
	sku: Sku;
	styleWebKey: string;
	modelWebKey: string;
	modelDocumentId: ModelDocumentIDEnum;
	companyNumber: string;
	banner: Banner;
	languageIsoCode: LanguageISOCode;
	active: boolean;
	description: string;
	color: Color;
	primaryColor: string;
	secondaryColors: string[];
	width: string;
	leagueName: string;
	playerName: string;
	teamName: string;
	fitVariant: string;
	keywords: string[];
	productDesignator: string;
	newArrivalDate: null | string;
	ageBuckets: any[];
	price: Price;
	priceNet: null;
	flagsAndRestrictions: { [key: string]: boolean | null };
	launchAttributes: LaunchAttributes;
	giftCardDenominations: number[] | null;
	eligiblePaymentTypes: { [key: string]: boolean | null };
	vendorAttributes: VendorAttributes;
	imageUrl: ImageURL | null;
}

declare type Color = string;

declare interface ImageURL {
	base: string;
	imageSku: string;
	variants: string[];
}

declare interface LaunchAttributes {
	launchProduct: boolean;
	launchType: string;
	webOnlyLaunchMsg: string;
	webOnlyLaunch: boolean;
	launchDate: null | string;
	launchDisplayCounterEnabled: boolean;
	launchDisplayCounterKickStartTime: null | string;
}

declare interface VendorAttributes {
	supplierSkus: string[];
}

declare interface StyleVariant {
	active: boolean;
	styleWebKey: string;
	sku: Sku;
	upc: string;
	storeUpc: string;
	productWebKey: string;
	style: Name;
	color: Color;
	description: string;
	playerName: string;
	imageSku: string;
	size: string;
	ageBuckets: null;
	price: Price;
	priceNet: null;
	inventory: Inventory;
}
