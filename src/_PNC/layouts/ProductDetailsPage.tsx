import React, { useState, type PropsWithChildren } from "react";
import { createSlot } from "@components/Slot";
import type { ProductDetailsResponse } from "@PNC/layouts/ProductDetails";
import {
	PdpAddToCart,
	PdpColorways,
	PdpFulfillment,
	PdpGallery,
	PdpHeader,
	PdpSizes,
	ProductPrice,
	formatProductDetails,
} from "@PNC/components";
export type { ProductDetailsResponse };

export type PdpSlotName =
	| "aboveAddToCart"
	| "belowAddToCart"
	| "paymentMethods"
	| "shippingMessage";

export const { createChildrenSlots, Slot, useSlot } = createSlot<PdpSlotName>();

export default function PDP({ slots, ...props }: PdpProps) {
	const { colorways, model, sizes, style } = formatProductDetails(props);
	const { gender, name } = model;
	const { color, price, sku } = style;
	const [selectedSize, setSize] = useState("");

	return (
		<>
			<div className="flex flex-col md:flex-row gap-4 p-4 bg-neutral-100">
				<PdpHeader className="md:hidden" model={model} />

				<div className="flex-1 lg:basis-2/3" data-id="gallery">
					<PdpGallery model={model} style={style} />
				</div>
				<div className="flex-1 lg:basis-1/3 p-4 bg-white">
					<PdpHeader className="hidden md:block" model={model} />

					<p className="my-2">
						<ProductPrice {...price} showSalePercent />
					</p>

					{slots.paymentMethods}

					<PdpColorways
						{...{ colorways, model, style }}
						selectedSize={selectedSize}
					/>

					<PdpSizes
						onChange={(e) => setSize(e.currentTarget.value)}
						sizes={sizes}
						style={style}
					/>

					{slots.shippingMessage}

					<PdpFulfillment />

					{slots.aboveAddToCart}

					<PdpAddToCart />

					{slots.belowAddToCart}
				</div>
			</div>
			<div className="py-4">
				<p dangerouslySetInnerHTML={{ __html: model.description }} />
			</div>
		</>
	);
}

export function PdpWithChildren({
	children,
	...props
}: PropsWithChildren<ProductDetailsResponse>) {
	const slots = createChildrenSlots(children);

	return <PDP {...props} slots={slots} />;
}

PDP.WithChildren = PdpWithChildren;
PDP.Slot = Slot;

type PdpSlots = ReturnType<typeof createChildrenSlots>;
type PdpProps = { slots: PdpSlots } & ProductDetailsResponse;
