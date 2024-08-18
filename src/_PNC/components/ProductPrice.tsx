import type { FormattedProductPrice } from "@PNC/components/utils";

export function ProductPrice({
	formattedListPrice,
	formattedSalePrice,
	listPrice,
	salePrice,
	showSalePercent = true,
}: FormattedProductPrice & {
	showSalePercent?: boolean;
}) {
	console.log("Price:", { listPrice, salePrice });
	if (salePrice < listPrice) {
		const salePercent = showSalePercent
			? Math.round(((listPrice - salePrice) / salePrice) * 100)
			: undefined;
		// console.log("Price:", { salePercent });
		return (
			<p>
				<ins className="text-lg no-underline text-red-600 mr-2">
					{formattedSalePrice}
				</ins>
				<del className="text-sm">{formattedListPrice}</del>{" "}
				{salePercent && (
					<div className="text-xs text-red-700">
						{salePercent}% off
					</div>
				)}
			</p>
		);
	}
	return <p>{formattedSalePrice}</p>;
}
