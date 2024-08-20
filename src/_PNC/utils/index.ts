// TYPES //

export type Colorways = Record<Color, StyleVariant[]>;

export type FormattedPdpModel = ReturnType<typeof formatModel>;
export type FormattedPdpSize = ReturnType<typeof formatSize>;
export type FormattedProductPrice = ReturnType<typeof formatPrice>;

export type ProductDetailsFormatted = ReturnType<typeof formatProductDetails>;

// UTILS //

export function formatColorways(data: ProductDetailsResponse) {
	return data.styleVariants.reduce((all, variant) => {
		if (all[variant.color]) {
			all[variant.color].push(variant);
		} else {
			all[variant.color] = [variant];
		}
		return all;
	}, {} as Colorways);
}

export function formatSize(size: Size) {
	return {
		size: size.size,
		strippedSize: size.strippedSize,
		productNumber: size.productNumber,
		productWebKey: size.productWebKey,
		active: size.active,
		inventory: {
			dropshipInventoryAvailable:
				size.inventory.dropshipInventoryAvailable,
			inventoryAvailable: size.inventory.inventoryAvailable,
			storeInventoryAvailable: size.inventory.storeInventoryAvailable,
			warehouseInventoryAvailable:
				size.inventory.warehouseInventoryAvailable,
		},
	};
}

export function formatModel({ model }: ProductDetailsResponse) {
	const [name, genderFromName] = model.name.split(" - ");
	const gender = model.genders[0] || genderFromName;

	return {
		brand: model.brand,
		description: model.description,
		gender: gender,
		name: name,
	};
}

export function formatPrice({ style }: Pick<ProductDetailsResponse, "style">) {
	return {
		listPrice: style.price.listPrice,
		salePrice: style.price.salePrice,
		formattedListPrice: style.price.formattedListPrice,
		formattedSalePrice: style.price.formattedSalePrice,
	};
}

export function formatStyle({ style }: ProductDetailsResponse) {
	return {
		// active: style.active, // won't recieve data if not active [currently]
		ageBuckets: style.ageBuckets,
		color: style.color,
		eligiblePaymentTypes: style.eligiblePaymentTypes,
		flagsAndRestrictions: style.flagsAndRestrictions,
		imageUrl: style.imageUrl,
		launchAttributes: style.launchAttributes,
		price: formatPrice({ style }),
		sku: style.sku,
		width: style.width,
	};
}

export function formatProductDetails(data: ProductDetailsResponse) {
	return {
		colorways: formatColorways(data),
		model: formatModel(data),
		sizes: data.sizes.map(formatSize),
		sizeChart: data.sizeChart,
		style: formatStyle(data),
	};
}
