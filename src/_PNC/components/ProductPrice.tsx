import type { FormattedProductPrice } from "@PNC/utils";

export function ProductPrice({
	className,
	formattedListPrice,
	formattedSalePrice,
	listPrice,
	salePrice,
	showSalePercent = true,
}: FormattedProductPrice & {
	className?: string | undefined;
	showSalePercent?: boolean;
}) {
	// console.log("Price:", { listPrice, salePrice });
	if (salePrice < listPrice) {
		const salePercent = showSalePercent
			? Math.round(((listPrice - salePrice) / salePrice) * 100)
			: undefined;
		// console.log("Price:", { salePercent });
		return (
			<p className={className}>
				<ins className="text-lg no-underline text-red-600 mr-2">
					{formattedSalePrice}
				</ins>
				<del className="text-sm">{formattedListPrice}</del>{" "}
				{salePercent && (
					<span className="text-xs text-red-700">
						{salePercent}% off
					</span>
				)}
			</p>
		);
	}
	return <p>{formattedSalePrice}</p>;
}
