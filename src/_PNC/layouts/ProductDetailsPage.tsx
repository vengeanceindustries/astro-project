import React, { useState, type PropsWithChildren } from "react";
import { createSlot } from "@components/Slot";
import {
	PdpAddToCart,
	PdpColorways,
	PdpFulfillment,
	PdpGallery,
	PdpHeader,
	PdpSizes,
	ProductPrice,
} from "@PNC/components";
import type { FormattedPdpSize, ProductDetailsFormatted } from "@PNC/utils";
import { useSelectedSize } from "@PNC/components/PdpSizes";

export type PdpSlotName =
	| "aboveAddToCart"
	| "belowAddToCart"
	| "paymentMethods"
	| "shippingMessage";

export const { createChildrenSlots, Slot, useSlot } = createSlot<PdpSlotName>();

export function PDP({ colorways, model, sizes, style, slots }: PdpProps) {
	// const { colorways, model, sizes, style } = formatProductDetails(props);
	const [selectedSize, handleChange] = useSelectedSize();

	return (
		<>
			<div className="flex flex-col md:flex-row gap-4 p-4 bg-neutral-100">
				<PdpHeader className="md:hidden" model={model} />

				<div className="flex-1 lg:basis-2/3" data-id="gallery">
					<PdpGallery model={model} style={style} />
				</div>
				<div className="flex-1 lg:basis-1/3 p-4 bg-white">
					<PdpHeader className="hidden md:block" model={model} />

					<p className="py-2">
						<ProductPrice {...style.price} showSalePercent />
					</p>

					{slots?.paymentMethods}

					<PdpColorways
						{...{ colorways, model, style }}
						selectedSize={selectedSize?.size}
					/>

					<PdpSizes
						handleChange={handleChange}
						sizes={sizes}
						style={style}
					/>

					<pre className="text-xs [tab-size:1em]">
						{JSON.stringify(selectedSize, null, "\t")}
					</pre>

					{slots?.shippingMessage}

					<PdpFulfillment />

					{slots?.aboveAddToCart}

					<PdpAddToCart />

					{slots?.belowAddToCart}
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
}: PropsWithChildren<ProductDetailsFormatted>) {
	const slots = createChildrenSlots(children);
	return <PDP {...props} slots={slots} />;
}

type PdpSlots = ReturnType<typeof createChildrenSlots>;
type PdpProps = { slots?: Partial<PdpSlots> } & ProductDetailsFormatted;

export default PDP;
PDP.WithChildren = PdpWithChildren;
PDP.Slot = Slot;
