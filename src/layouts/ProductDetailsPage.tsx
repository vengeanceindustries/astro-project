import React, { type PropsWithChildren } from "react";
import ProductImage from "@components/ProductImage";
import type {
	Color,
	ProductDetailsResponse,
	Sku,
	StyleVariant,
} from "@layouts/ProductDetails";
import clsx from "clsx";
import { createSlot } from "@components/Slot";
export type { ProductDetailsResponse };

const imgWidth = 550;

export type PdpSlotName =
	| "aboveAddToCart"
	| "belowAddToCart"
	| "paymentMethods"
	| "shippingMessage";

export const { Slot, useSlot } = createSlot<PdpSlotName>();

export default function PDP({
	aboveAddToCart,
	belowAddToCart,
	content,
	paymentMethods,
	shippingMessage,
	...props
}: PdpSlots & ProductDetailsResponse) {
	const { colorways, model, sizes, style } = formatProductDetails(props);
	const { gender, name } = model;
	const { color, price, sku } = style;

	return (
		<>
			<div className="flex flex-col md:flex-row gap-4">
				<PdpHeader className="md:hidden" model={model} />

				<div className="flex-1 md:basis-2/3" data-id="gallery">
					<ProductImage
						alt={`${name} - ${gender} - ${color}`}
						sku={sku}
						width={imgWidth}
					/>
				</div>
				<div className="flex-1 md:basis-1/3">
					<PdpHeader className="hidden md:block" model={model} />

					<p className="my-2">
						<ProductPrice price={price} />
					</p>

					{paymentMethods}

					{/* <PdpColorways {...{ colorways, model, style }} /> */}
					<PdpColorways
						colorways={colorways}
						model={model}
						style={style}
					/>
					<PdpSizes sizes={sizes} />

					{shippingMessage}

					<hr className="my-2" />
					<fieldset>
						<legend>Fulfillment method</legend>
					</fieldset>
					<hr className="my-2" />

					{aboveAddToCart}

					<button className="px-4 py-2 font-bold bg-black text-white my-2">
						Add to Cart
					</button>

					{belowAddToCart}
				</div>
			</div>
			<div className="py-4">
				<p dangerouslySetInnerHTML={{ __html: model.description }} />
			</div>
		</>
	);
}

export function PdpHeader({
	className,
	model,
}: { className: string } & Pick<FormattedPdpProps, "model">) {
	return (
		<header className={className}>
			<h1 className="text-2xl font-black">{model.name}</h1>
			<p className="text-sm mb-1">{model.gender}</p>
			<p className="text-sm">
				<a
					href={`/category/brands/${model.brand}`}
					className="text-inherit underline"
				>
					Explore {model.brand}
				</a>
			</p>
		</header>
	);
}

export function ProductPrice({
	price,
}: {
	price: ReturnType<typeof formatPrice>;
}) {
	return (
		<>
			<del className="">{price.formattedListPrice}</del>{" "}
			<ins className="no-underline text-red-500">
				{price.formattedSalePrice}
			</ins>
		</>
	);
}

export function PdpColorwayLink({
	model,
	selectedSku,
	variant,
}: { selectedSku: Sku; variant: StyleVariant } & Pick<
	FormattedPdpProps,
	"model"
>) {
	const { color, sku } = variant;
	const isSelected = selectedSku === sku;
	return (
		<a
			href={`/en/product/~/${sku}`}
			className={clsx(
				"block outline-1 hover:outline hover:outline-black",
				"relative after:content-[''] after:absolute after:bottom-0 after:w-full after:h-[3px]",
				{ "after:bg-black": isSelected }
			)}
		>
			<ProductImage
				alt={`${model.name} - ${model.gender} - ${color}`}
				sku={sku}
				width={100}
			/>
		</a>
	);
}
export function PdpColorways({
	colorways,
	model,
	style,
}: Pick<FormattedPdpProps, "colorways" | "model" | "style">) {
	return (
		<div className="my-2">
			<p className="text-sm text-neutral-500">{style.color}</p>

			{colorways && (
				<ul className="grid grid-cols-5 gap-3">
					{Object.entries(colorways).map(([color, variants]) => (
						<li key={color}>
							<PdpColorwayLink
								model={model}
								selectedSku={style.sku}
								variant={variants[0]}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export function PdpSizes({ sizes }: { sizes: ReturnType<typeof formatSizes> }) {
	if (!sizes?.length) {
		return null;
	}
	return (
		<fieldset>
			<legend className="font-bold mb-1">Select a size</legend>
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
									"block py-2 px-2",
									"bg-neutral-100 border border-transparent rounded",
									"hover:border-neutral-200",
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
		shippingMessage: [],
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

type PdpSlots = Partial<Record<PdpSlotName | "content", React.ReactNode>>;
type PdpSlotList = Record<PdpSlotName | "content", React.ReactNode[]>;

type Colorways = Record<Color, StyleVariant[]>;

type FormattedPdpProps = ReturnType<typeof formatProductDetails>;

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

export function formatSizes(data: ProductDetailsResponse) {
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
		sizes: formatSizes(data),
		sizeChart: data.sizeChart,
		style: formatStyle(data),
	};
}
