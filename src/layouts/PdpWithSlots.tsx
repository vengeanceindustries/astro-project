import PDP, {
	useSlot,
	type PdpSlotName,
	type ProductDetailsResponse,
} from "@layouts/ProductDetailsPage";

export default function PdpWithSlots(data: ProductDetailsResponse) {
	const salePrice = data.style.price.salePrice;

	return (
		<>
			<h1 className="font-mono uppercase text-center p-1">
				PDP with Slots
			</h1>
			<PDP.WithChildren {...data}>
				<PDP.Slot name="paymentMethods">
					<PaymentKlarna salePrice={salePrice} />
				</PDP.Slot>

				<PDP.Slot name="aboveAddToCart">
					<FlxCashAboveAtcTest salePrice={salePrice} />
				</PDP.Slot>

				<PDP.Slot name="belowAddToCart">
					<FlxCashAboveAtcTest salePrice={salePrice} />
				</PDP.Slot>
			</PDP.WithChildren>

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
		</>
	);
}

// ADDED COMPONENTS VIA SLOTS //

export function PaymentKlarna({ salePrice }: { salePrice: number }) {
	const installment = (salePrice / 4).toFixed(2);
	return (
		<p className="text-xs bg-neutral-100 p-1">
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
				This purchase earns you {points.toLocaleString()} points!
			</h5>
			<p className="text-sm">Save on future purchase with FLX Cash</p>
			<p className="text-xs">(15,000 points = $5)</p>
		</div>
	);
}

// TEST CONTENT RELATIVE TO SLOT NAME //

export function FlxCashAboveAtcTest({
	salePrice,
	slot,
}: {
	salePrice: number;
	slot?: PdpSlotName;
}) {
	// fake A/B test flag: //
	const testFlxCashAboveATC = false; // true; //

	slot = useSlot() || slot;

	const showFlxCash =
		(testFlxCashAboveATC && slot === "aboveAddToCart") ||
		(!testFlxCashAboveATC && slot === "belowAddToCart");

	return showFlxCash ? (
		<FlxCashPdpPoints salePrice={salePrice} />
	) : (
		<FlxFreeShippingPromo />
	);
}
