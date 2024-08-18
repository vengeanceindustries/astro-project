import clsx from "clsx";
import ProductImage from "@PNC/components/ProductImage";
import type { Sku, StyleVariant } from "@PNC/layouts/ProductDetails";
import {
	type FormattedPdpSize,
	type ProductDetailsFormatted,
} from "@PNC/components/utils";
export { type FormattedPdpSize, type ProductDetailsFormatted, ProductImage };
export { PdpGallery } from "@PNC/components/PdpGallery";
export { PdpSizes } from "@PNC/components/PdpSizes";
export { ProductPrice } from "@PNC/components/ProductPrice";

export function PdpHeader({
	className,
	model,
}: { className: string } & Pick<ProductDetailsFormatted, "model">) {
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

export function PdpColorwayLink({
	model,
	selectedSku,
	variant,
	variants,
}: {
	selectedSku: Sku;
	variant: StyleVariant;
	variants: StyleVariant[];
} & Pick<ProductDetailsFormatted, "model">) {
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
}: Pick<ProductDetailsFormatted, "colorways" | "model" | "style"> & {
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

export function PdpFulfillment() {
	return (
		<>
			<hr className="my-2" />
			<fieldset>
				<legend>Fulfillment method</legend>
			</fieldset>
			<hr className="my-2" />
		</>
	);
}

export function PdpAddToCart() {
	return (
		<button className="px-4 py-2 font-bold bg-black text-white my-2">
			Add to Cart
		</button>
	);
}
