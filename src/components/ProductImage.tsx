import type { Sku } from "@layouts/ProductDetails";

export default function ProductImage({
	sku,
	width,
	...rest
}: { sku: Sku; width: number } & React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>) {
	return (
		<img
			{...rest}
			src={`https://images.footlocker.com/is/image/EBFL2/${sku}?wid=${width}&hei=${width}`}
			className="block w-full h-auto"
		/>
	);
}
