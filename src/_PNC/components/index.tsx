import { type FormattedPdpModel } from "@PNC/utils";
export { default as AddToCart } from "@PNC/components/AddToCart";
export { PdpColorways } from "@PNC/components/PdpColorways";
export { PdpFulfillment } from "@PNC/components/PdpFulfillment";
export { PdpGallery } from "@PNC/components/PdpGallery";
export { PdpSizes } from "@PNC/components/PdpSizes";
export { ProductImage } from "@PNC/components/ProductImage";
export { ProductPrice } from "@PNC/components/ProductPrice";

export function PdpHeader({
	className,
	model,
}: {
	className: string;
	model: FormattedPdpModel;
}) {
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
