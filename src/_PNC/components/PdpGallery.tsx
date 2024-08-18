import { ProductImage } from "@PNC/components";
import type { ProductDetailsFormatted } from "@PNC/utils";
import clsx from "clsx";

const imgWidth = 550;

export function PdpGallery({
	model,
	style,
}: Pick<ProductDetailsFormatted, "model" | "style">) {
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
