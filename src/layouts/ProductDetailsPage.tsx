import ProductImage from "@components/ProductImage";
import React from "react";
import type {
	Color,
	ProductDetailsResponse,
	Sku,
	StyleVariant,
} from "src/pages/[locale]/product/details.json";

function PdpPaymentMethods({ children }: React.PropsWithChildren) {
	return <div data-id="paymentMethods">{children}</div>;
}

function BelowAddToCart({ children }: React.PropsWithChildren) {
	return <div data-id="belowAddToCart">{children}</div>;
}

export function PdpWithChildren({
	children,
	...props
}: React.PropsWithChildren<PdpProps>) {
	let belowAddToCart = [] as React.ReactNode[];
	let paymentMethods = [] as React.ReactNode[];
	let content = [] as React.ReactNode[];

	React.Children.forEach(children, (child, i) => {
		if (!React.isValidElement(child)) return;
		// const kid = { ...child, key: child.type.toString() + i };

		switch (child.type) {
			case BelowAddToCart:
				return belowAddToCart.push(child);
			case PdpPaymentMethods:
				return paymentMethods.push(child);
			default:
				return content.push(child);
		}
	});

	return (
		<PDP
			{...props}
			belowAddToCart={belowAddToCart}
			content={content}
			paymentMethods={paymentMethods}
		/>
	);
}

export function PDP({
	belowAddToCart,
	content,
	paymentMethods,
	...props
}: ChildrenToSlots & PdpProps) {
	const { brand, color, colorways, gender, name, price, sku } = props;
	const imgWidth = 539;

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
				PdpHeader
			</div>
			<div className="flex-1 md:basis-1/3">
				<PdpHeader className="hidden md:block" />
				<p className="my-2">
					<del className="">{price.formattedListPrice}</del>{" "}
					<ins className="no-underline text-red-500">
						{price.formattedSalePrice}
					</ins>
				</p>

				<p className="text-sm text-neutral-500">{color}</p>

				{colorways && (
					<ul className="flex gap-3">
						{Object.entries(colorways).map(([color, variant]) => (
							<li key={color}>
								<ProductImage
									alt={`${name} - ${gender} - ${color}`}
									sku={variant[0].sku}
									width={85}
								/>
							</li>
						))}
					</ul>
				)}

				{paymentMethods}

				<button className="px-4 py-2 font-bold bg-black text-white my-2">
					Add to Cart
				</button>

				{belowAddToCart}
			</div>
		</div>
	);
}

PDP.PaymentMethods = PdpPaymentMethods;
PDP.BelowAddToCart = BelowAddToCart;

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
interface ChildrenToSlots {
	belowAddToCart: React.ReactNode[];
	content: React.ReactNode[];
	paymentMethods: React.ReactNode[];
}
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

export default function PdpWithSlots(data: ProductDetailsResponse) {
	const salePrice = data.style.price.salePrice;

	return (
		<PdpWithChildren {...transformProductDetails(data)}>
			<PDP.PaymentMethods>
				<PaymentKlarna salePrice={salePrice} />
			</PDP.PaymentMethods>

			<PDP.BelowAddToCart>
				<FlxCashPdpPoints salePrice={salePrice} />
			</PDP.BelowAddToCart>
		</PdpWithChildren>
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

export function FlxCashPdpPoints({ salePrice }: { salePrice: number }) {
	const points = Math.round(salePrice * 100);
	return (
		<div className="bg-purple-200/50 border-1 border-neutral-400 p-2">
			<h5 className="font-bold">
				This purchase earns you {points} points!
			</h5>
			<p className="text-sm">Save on future purchase with FLX Cash</p>
			<p className="text-sm">(15,000 points = $5)</p>
		</div>
	);
}
