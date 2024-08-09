import PDP, {
	type PdpSlotName,
	type ProductDetailsResponse,
} from "@layouts/ProductDetailsPage";

export default function PdpWithSlots(data: ProductDetailsResponse) {
	const salePrice = data.style.price.salePrice;

	return (
		<>
			<h1 className="font-mono uppercase text-center p-1">
				PDP with slot props
			</h1>
			<PDP
				{...data}
				aboveAddToCart={
					<FlxCashAboveAtcTest
						salePrice={salePrice}
						slot="aboveAddToCart"
					/>
				}
				belowAddToCart={
					<FlxCashAboveAtcTest
						salePrice={salePrice}
						slot="belowAddToCart"
					/>
				}
				paymentMethods={<PaymentKlarna salePrice={salePrice} />}
			/>

			<hr />

			<h1 className="font-mono uppercase text-center p-1">
				PDP with children slots
			</h1>
			<PDP.WithChildren {...data}>
				<PDP.PaymentMethods>
					<PaymentKlarna salePrice={salePrice} />
				</PDP.PaymentMethods>

				<PDP.AboveAddToCart>
					<FlxCashAboveAtcTest
						salePrice={salePrice}
						slot="aboveAddToCart"
					/>
				</PDP.AboveAddToCart>

				<PDP.BelowAddToCart>
					<FlxCashAboveAtcTest
						salePrice={salePrice}
						slot="belowAddToCart"
					/>
				</PDP.BelowAddToCart>
			</PDP.WithChildren>
		</>
	);
}

// ADDED COMPONENTS VIA SLOTS //

export function PaymentKlarna({ salePrice }: { salePrice: number }) {
	const installment = (salePrice / 4).toFixed(2);
	return (
		<p className="text-xs bg-neutral-50 p-1">
			4 interest-free payments of ${installment} with{" "}
			<strong>Klarna</strong>.{" "}
			<a href="#" className="text-inherit underline">
				Learn more
			</a>
		</p>
	);
}

export function FlxFreeShippingPromo() {
	return (
		<h3 className="bg-purple-200/50 border-1 border-neutral-400 p-2 my-1">
			<em>Free shipping for FLX members!</em>
		</h3>
	);
}
export function FlxCashPdpPoints({ salePrice }: { salePrice: number }) {
	const points = Math.round(salePrice * 100);
	return (
		<div className="bg-purple-200/50 border-1 border-neutral-400 p-2 my-1">
			<h5 className="font-bold">
				This purchase earns you {points} points!
			</h5>
			<p className="text-sm">Save on future purchase with FLX Cash</p>
			<p className="text-sm">(15,000 points = $5)</p>
		</div>
	);
}

// TEST CONTENT RELATIVE TO SLOT NAME //

export function FlxCashAboveAtcTest({
	salePrice,
	slot,
}: {
	salePrice: number;
	slot: PdpSlotName;
}) {
	const testFlxCashAboveATC = true; // false; //

	return testFlxCashAboveATC && slot === "aboveAddToCart" ? (
		<FlxCashPdpPoints salePrice={salePrice} />
	) : (
		<FlxFreeShippingPromo />
	);
}
