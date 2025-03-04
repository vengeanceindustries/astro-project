import clsx from "clsx";
import { ProductImage } from "@PNC/components";
import type { FormattedPdpModel, ProductDetailsFormatted } from "@PNC/utils";

export function PdpColorwayLink({
	model,
	selectedSku,
	variant,
	variants,
}: {
	model: FormattedPdpModel;
	selectedSku: Sku;
	variant: StyleVariant;
	variants: StyleVariant[];
}) {
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
