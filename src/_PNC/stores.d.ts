declare type StoresByAvailability = BopisStore[];

declare interface BopisStore {
	storeName: string;
	storeNumber: string;
	formattedAddress: string;
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	phone: string;
	state: string;
	stateName: string;
	zipCode: string;
	city: string;
	country: string;
	countryName: string;
	latitude: number;
	longitude: number;
	formattedDistance: string;
	status: LiteralUnion<"Open">;
	eligibleForBopis: boolean;
	productAvailable: boolean;
	deliveryMode?: DeliveryMode;
}

declare interface DeliveryMode {
	code: string;
	name: string;
	description: string;
}

declare type LiteralUnion<T extends U, U = string> = T | (U & {});
