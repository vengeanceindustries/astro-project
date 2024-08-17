import clsx from "clsx";

const DEFAULT_WIDTH = 100;

export function getProductImageSrc({ sku, src, ...rest }: ProductImageProps) {
	const height = rest.height || rest.width || DEFAULT_WIDTH;
	const width = rest.width || rest.height || DEFAULT_WIDTH;

	if (src) {
		const imgSrc = new URL(src);
		imgSrc.searchParams.set("wid", width.toString());
		imgSrc.searchParams.set("hei", height.toString());
		return imgSrc.toString();
	}
	return `https://images.footlocker.com/is/image/EBFL2/${sku}?wid=${width}&hei=${height}`;
}

export default function ProductImage({
	className,
	sku,
	...rest
}: ProductImageProps) {
	const src = getProductImageSrc({ sku, ...rest });
	return (
		<img
			{...rest}
			className={clsx("block w-full h-auto", className)}
			src={src}
		/>
	);
}

type ProductImageProps = { sku?: string } & React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;
