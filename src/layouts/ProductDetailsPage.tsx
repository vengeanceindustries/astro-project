import React, { type PropsWithChildren } from "react";
import ProductImage from "@components/ProductImage";
import type {
	Color,
	ProductDetailsResponse,
	StyleVariant,
} from "src/pages/[locale]/product/details.json";
import clsx from "clsx";
import { createSlot } from "@components/Slot";
export type { ProductDetailsResponse };

export const { Slot, useSlot } = createSlot<PdpSlotName>();

const imgWidth = 550;

export default function PDP({
	aboveAddToCart,
	belowAddToCart,
	content,
	paymentMethods,
	...props
}: PdpSlots & ProductDetailsResponse) {
	const { brand, color, colorways, gender, name, price, sizes, sku } =
		transformProductDetails(props);

	function PdpHeader({ className }: { className: string }) {
		return (
			<header className={className}>
				<h1 className="text-2xl font-black">{name}</h1>
				<p className="text-sm mb-1">{gender}</p>
				<p className="text-sm">
					<a
						href={`/category/brands/${brand}`}
						className="text-inherit underline"
					>
						Explore {brand}
					</a>
				</p>
			</header>
		);
	}

	return (
		<div className="flex flex-col md:flex-row gap-4 bg-white text-black">
			<PdpHeader className="md:hidden" />
			<div className="flex-1 basis-auto" data-id="gallery">
				<ProductImage
					alt={`${name} - ${gender} - ${color}`}
					sku={sku}
					width={imgWidth}
				/>
			</div>
			<div className="flex-1 md:basis-1/3">
				<PdpHeader className="hidden md:block" />
				<p className="my-2">
					<del className="">{price.formattedListPrice}</del>{" "}
					<ins className="no-underline text-red-500">
						{price.formattedSalePrice}
					</ins>
				</p>

				{paymentMethods}

				<div className="my-2">
					<p className="text-sm text-neutral-500">{color}</p>

					{colorways && (
						<ul className="flex gap-3">
							{Object.entries(colorways).map(
								([color, variant]) => (
									<li key={color}>
										<ProductImage
											alt={`${name} - ${gender} - ${color}`}
											sku={variant[0].sku}
											width={85}
										/>
									</li>
								)
							)}
						</ul>
					)}
				</div>

				{sizes && (
					<fieldset>
						<legend className="font-bold mb-1">
							Select a size
						</legend>
						<ul className="flex flex-wrap gap-2">
							{sizes.map((size) => (
								<li key={size.size}>
									<label className="block">
										<input
											className="peer sr-only"
											name="size"
											type="radio"
											value={size.size}
										/>
										<span
											className={clsx(
												"block bg-neutral-100 py-1 px-2",
												"peer-checked:bg-black peer-checked:text-white"
											)}
										>
											{Number(size.size).toFixed(1)}
										</span>
									</label>
								</li>
							))}
						</ul>
					</fieldset>
				)}
				<hr className="my-2" />
				<h2>Fulfillment method</h2>
				<hr className="my-2" />

				{aboveAddToCart}

				<button className="px-4 py-2 font-bold bg-black text-white my-2">
					Add to Cart
				</button>

				{belowAddToCart}
			</div>
		</div>
	);
}

export function PdpWithChildren({
	children,
	...props
}: PropsWithChildren<ProductDetailsResponse>) {
	const slots: PdpSlotList = {
		aboveAddToCart: [],
		belowAddToCart: [],
		paymentMethods: [],
		content: [],
	};

	React.Children.forEach(children, (child, i) => {
		if (!React.isValidElement(child)) return;

		if (child.type === Slot) {
			const name = child.props.name as PdpSlotName;
			if (name in slots) slots[name].push(child);
			return;
		}
	});

	return <PDP {...props} {...slots} />;
}

PDP.WithChildren = PdpWithChildren;
PDP.Slot = Slot;

interface PdpProps {
	brand: string;
	color: string;
	colorways?: Colorways;
	gender: string;
	name: string;
	price: {
		listPrice: number;
		salePrice: number;
		formattedListPrice: string;
		formattedSalePrice: string;
	};
	sizes: ReturnType<typeof transformSizes>;
	sku: string;
}

export type PdpSlotName =
	| "aboveAddToCart"
	| "belowAddToCart"
	| "paymentMethods";
type PdpSlots = Partial<Record<PdpSlotName | "content", React.ReactNode>>;
type PdpSlotList = Record<PdpSlotName | "content", React.ReactNode[]>;

type Colorways = Record<Color, StyleVariant[]>;

export function transformColorways(data: ProductDetailsResponse) {
	return data.styleVariants.reduce((all, variant) => {
		if (all[variant.color]) {
			all[variant.color].push(variant);
		} else {
			all[variant.color] = [variant];
		}
		return all;
	}, {} as Colorways);
}

export function transformSizes(data: ProductDetailsResponse) {
	return data.sizes.map((size) => ({
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
	}));
}

export function transformProductDetails(
	data: ProductDetailsResponse
): PdpProps {
	const [name, genderFromName] = data.model.name.split(" - ");
	const gender = data.model.genders[0] || genderFromName;

	return {
		brand: data.model.brand,
		color: data.style.color,
		gender: gender,
		name: name,
		price: data.style.price,
		sizes: transformSizes(data),
		sku: data.style.sku,
		colorways: transformColorways(data),
	};
}
