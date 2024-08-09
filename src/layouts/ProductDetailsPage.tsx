import ProductImage from "@components/ProductImage";
import React from "react";
import type {
	Color,
	ProductDetailsResponse,
	Sku,
	StyleVariant,
} from "src/pages/[locale]/product/details.json";
export type { ProductDetailsResponse };

function PdpPaymentMethods({ children }: React.PropsWithChildren) {
	return <div data-id="paymentMethods">{children}</div>;
}

function PdpAboveAddToCard({ children }: React.PropsWithChildren) {
	return <div data-id="aboveAddToCart">{children}</div>;
}

function PdpBelowAddToCart({ children }: React.PropsWithChildren) {
	return <div data-id="belowAddToCart">{children}</div>;
}

const imgWidth = 550;

export default function PDP({
	aboveAddToCart,
	belowAddToCart,
	content,
	paymentMethods,
	...props
}: PdpSlots & ProductDetailsResponse) {
	const { brand, color, colorways, gender, name, price, sku } =
		transformProductDetails(props);

	function PdpHeader({ className }: { className: string }) {
		return (
			<header className={className}>
				<h1 className="text-2xl font-black">{name}</h1>
				<p className="text-sm mb-1">{gender}</p>
				<p className="text-sm">
					<a
						href={`/category/brands/${brand}`}
						className="text-inherit underline"
					>
						Explore {brand}
					</a>
				</p>
			</header>
		);
	}

	return (
		<div className="flex flex-col md:flex-row gap-4 bg-white text-black">
			<PdpHeader className="md:hidden" />
			<div className="flex-1 basis-auto" data-id="gallery">
				<ProductImage
					alt={`${name} - ${gender} - ${color}`}
					sku={sku}
					width={imgWidth}
				/>
			</div>
			<div className="flex-1 md:basis-1/3">
				<PdpHeader className="hidden md:block" />
				<p className="my-2">
					<del className="">{price.formattedListPrice}</del>{" "}
					<ins className="no-underline text-red-500">
						{price.formattedSalePrice}
					</ins>
				</p>

				{paymentMethods}

				<div className="my-2">
					<p className="text-sm text-neutral-500">{color}</p>

					{colorways && (
						<ul className="flex gap-3">
							{Object.entries(colorways).map(
								([color, variant]) => (
									<li key={color}>
										<ProductImage
											alt={`${name} - ${gender} - ${color}`}
											sku={variant[0].sku}
											width={85}
										/>
									</li>
								)
							)}
						</ul>
					)}
				</div>

				<hr className="my-2" />
				<h2>Sizes</h2>
				<hr className="my-2" />
				<h2>Fulfillment method</h2>
				<hr className="my-2" />

				{aboveAddToCart}

				<button className="px-4 py-2 font-bold bg-black text-white my-2">
					Add to Cart
				</button>

				{belowAddToCart}
			</div>
		</div>
	);
}

export function PdpWithChildren({
	children,
	...props
}: React.PropsWithChildren<ProductDetailsResponse>) {
	const slots: PdpSlotList = {
		aboveAddToCart: [],
		belowAddToCart: [],
		paymentMethods: [],
		content: [],
	};

	React.Children.forEach(children, (child, i) => {
		if (!React.isValidElement(child)) return;

		switch (child.type) {
			case PdpAboveAddToCard:
				return slots.aboveAddToCart.push(child);
			case PdpBelowAddToCart:
				return slots.belowAddToCart.push(child);
			case PdpPaymentMethods:
				return slots.paymentMethods.push(child);
			default:
				return slots.content.push(child);
		}
	});

	return <PDP {...props} {...slots} />;
}

PDP.WithChildren = PdpWithChildren;
PDP.PaymentMethods = PdpPaymentMethods;
PDP.AboveAddToCart = PdpAboveAddToCard;
PDP.BelowAddToCart = PdpBelowAddToCart;

interface PdpProps {
	brand: string;
	color: string;
	colorways?: Colorways;
	gender: string;
	name: string;
	price: {
		listPrice: number;
		salePrice: number;
		formattedListPrice: string;
		formattedSalePrice: string;
	};
	sku: string;
}
export type PdpSlotName =
	| "aboveAddToCart"
	| "belowAddToCart"
	| "paymentMethods";
type PdpSlots = Partial<Record<PdpSlotName | "content", React.ReactNode>>;
type PdpSlotList = Record<PdpSlotName | "content", React.ReactNode[]>;

type Colorways = Record<Color, StyleVariant[]>;

export function transformProductDetails(
	data: ProductDetailsResponse
): PdpProps {
	let [name, gender] = data.model.name.split(" - ");
	gender = gender || data.model.genders[0];
	const salePrice = data.style.price.salePrice;

	const colorways = data.styleVariants.reduce((all, variant) => {
		if (all[variant.color]) {
			all[variant.color].push(variant);
		} else {
			all[variant.color] = [variant];
		}
		return all;
	}, {} as Colorways);

	return {
		brand: data.model.brand,
		color: data.style.color,
		gender: gender,
		name: name,
		price: data.style.price,
		sku: data.style.sku,
		colorways: colorways,
	};
}
