import React, { useState, type PropsWithChildren } from "react";
import ProductImage from "@components/ProductImage";
import type {
	Color,
	ProductDetailsResponse,
	Size,
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
	const [selectedSize, setSize] = useState("");

	return (
		<>
			<div className="flex flex-col md:flex-row gap-4 p-4 bg-neutral-100">
				<PdpHeader className="md:hidden" model={model} />

				<div className="flex-1 lg:basis-2/3" data-id="gallery">
					<PdpGallery {...{ model, style }} />
				</div>
				<div className="flex-1 lg:basis-1/3 p-4 bg-white">
					<PdpHeader className="hidden md:block" model={model} />

					<p className="my-2">
						<ProductPrice price={price} />
					</p>

					{paymentMethods}

					{/* <PdpColorways {...{ colorways, model, style }} /> */}
					<PdpColorways
						colorways={colorways}
						model={model}
						selectedSize={selectedSize}
						style={style}
					/>
					{/* <p>
						<strong>{selectedSize}</strong>
					</p> */}
					<PdpSizes
						onChange={(e) => setSize(e.currentTarget.value)}
						sizes={sizes}
						style={style}
					/>

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

export function PdpGallery({
	model,
	style,
}: Pick<FormattedPdpProps, "model" | "style">) {
	const alt = `${model.name} - ${model.gender} - ${style.color}`;
	const variants = style.imageUrl?.variants;

	const masonry = variants && (
		<ul
			className={clsx(
				"hidden md:grid",
				"auto-rows-fr gap-4",
				"grid-cols-2 lg:grid-cols-3 xl:grid-rows-[masonry]"
			)}
		>
			{variants.map((variant, i) => (
				<li
					key={variant}
					className={clsx(
						{ "col-span-2 row-span-2": i === 0 },
						"bg-white"
					)}
				>
					<ProductImage
						alt={`${alt} - ${i + 1}`}
						src={variant}
						width={imgWidth}
					/>
				</li>
			))}
		</ul>
	);
	return (
		<div data-id="gallery">
			{masonry}
			<ProductImage
				alt={alt}
				className="md:hidden"
				sku={style.sku}
				src={style.imageUrl?.base}
				width={imgWidth}
			/>
		</div>
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
	variants,
}: {
	selectedSku: Sku;
	variant: StyleVariant;
	variants: StyleVariant[];
} & Pick<FormattedPdpProps, "model">) {
	const { color, sku } = variant;
	const isSelected = selectedSku === sku;
	const isActive =
		!variants?.length ||
		variants.some((v) => v.inventory.inventoryAvailable && v.active);

	return (
		<a
			aria-selected={isSelected}
			href={`/en/product/~/${sku}`}
			className={clsx(
				"text-black hover:text-black hover:no-underline",
				"block outline-1 hover:outline hover:outline-black",
				"relative after:absolute after:bottom-0 after:w-full after:h-[3px]",
				"aria-selected:after:bg-black",
				{
					"before:bg-white before:border before:border-neutral-600 before:absolute before:top-1/2 before:left-0 before:right-[10%]":
						!isActive,
					"before:shadow-[0_0_0_2px_white] before:-rotate-[35deg]":
						!isActive,
				}
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
	selectedSize,
	style,
}: Pick<FormattedPdpProps, "colorways" | "model" | "style"> & {
	selectedSize?: string;
}) {
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
								variants={variants.filter(
									(v) => v.size === selectedSize
								)}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export function PdpSizeField({
	onChange,
	...size
}: FormattedPdpSize & {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
	const disabled = !size.active || !size.inventory.inventoryAvailable;
	return (
		<label className="block w-20 text-center text-sm font-semibold cursor-pointer">
			<input
				aria-disabled={disabled}
				className="peer sr-only"
				disabled={disabled}
				name="size"
				onChange={onChange}
				type="radio"
				value={size.size}
			/>
			<span
				className={clsx(
					"block py-2 px-2",
					"bg-neutral-100 border border-transparent rounded",
					"hover:border-black",
					"peer-focus:ring peer-focus:ring-purple-500",
					"peer-checked:bg-black peer-checked:text-white",
					// "peer-aria-disabled:opacity-50 peer-aria-disabled:border-transparent peer-aria-disabled:cursor-not-allowed",
					"peer-disabled:opacity-50 peer-disabled:border-transparent peer-disabled:cursor-not-allowed",
					"peer-disabled:border-neutral-300 peer-disabled:bg-gradient-to-br from-[49%] from-white via-50% via-neutral-500 to-[51%] to-white"
				)}
			>
				{Number(size.size).toFixed(1)}
			</span>
		</label>
	);
}

export function PdpSizes({
	onChange,
	sizes,
	style,
}: Pick<FormattedPdpProps, "sizes" | "style"> & {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
	if (!sizes?.length) {
		return null;
	}
	return (
		<fieldset className="my-4">
			<legend className="font-semibold mb-1">Select a size</legend>
			{style.width && (
				<p className="text-xs font-normal text-neutral-500 mb-2">
					{style.width}
				</p>
			)}
			<ul className="flex flex-wrap gap-2">
				{sizes.map((size) => (
					<li key={size.size} className="block">
						<PdpSizeField {...size} onChange={onChange} />
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

type FormattedPdpSize = ReturnType<typeof formatSize>;

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
