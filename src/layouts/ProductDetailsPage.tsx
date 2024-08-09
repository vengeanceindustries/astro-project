import React from "react";

function PdpPayment({ children }: React.PropsWithChildren) {
	return <div data-id="payment">{children}</div>;
}

function FlxPromo({ children }: React.PropsWithChildren) {
	return <div data-id="flxPromo">{children}</div>;
}

export function PDP({
	children,
	color,
	gender,
	name,
	price,
	sku,
}: React.PropsWithChildren<PdpProps>) {
	let payment = [] as React.ReactNode[];
	let flxPromo = [] as React.ReactNode[];
	let content = [] as React.ReactNode[];

	React.Children.forEach(children, (child, i) => {
		if (!React.isValidElement(child)) return;
		// const kid = { ...child, key: child.type.toString() + i };

		switch (child.type) {
			case PdpPayment:
				return payment.push(child);
			case FlxPromo:
				return flxPromo.push(child);
			default:
				return content.push(child);
		}
	});

	const imgWidth = 539;

	return (
		<div className="flex flex-col md:flex-row gap-4 bg-white text-black">
			<header className="md:hidden">
				<h1 className="text-xl font-bold">{name}</h1>
				<p className="text-sm">{gender}</p>
			</header>
			<div className="flex-1 basis-auto" data-id="gallery">
				<img
					alt={`${name} ${gender} ${color}`}
					src={`https://images.footlocker.com/is/image/EBFL2/${sku}?wid=${imgWidth}&hei=${imgWidth}`}
					className="block w-full h-auto"
				/>
			</div>
			<div className="flex-1 md:basis-1/3">
				<header className="hidden md:block">
					<h1 className="text-xl font-bold">{name}</h1>
					<p className="text-sm">{gender}</p>
				</header>
				<p>
					<del className="">{price.formattedListPrice}</del>{" "}
					<ins className="no-underline text-red-500">
						{price.formattedSalePrice}
					</ins>
				</p>
				{payment}
				{!!flxPromo && (
					<div className="outline-1 outline-dashed outline-blue-500/50">
						{flxPromo}
					</div>
				)}
			</div>
		</div>
	);
}

PDP.Payment = PdpPayment;
PDP.FlxPromo = FlxPromo;

interface PdpProps {
	name: string;
	color: string;
	gender: string;
	price: {
		listPrice: number;
		salePrice: number;
		formattedListPrice: string;
		formattedSalePrice: string;
	};
	sku: string;
}

export default function PdpWithSlots() {
	const data = {
		model: {
			name: "Nike Air Max 270",
			brand: "Nike",
			gender: "Women",
		},
		style: {
			color: "Red / Black",
			price: {
				listPrice: 210.0,
				salePrice: 179.99,
				formattedListPrice: "$210.00",
				formattedSalePrice: "$179.99",
			},
			sku: "D3808102",
		},
	};
	return (
		<PDP
			color={data.style.color}
			gender={data.model.gender}
			name={data.model.name}
			price={data.style.price}
			sku={data.style.sku}
		>
			<PDP.Payment>
				<PaymentKlarna salePrice={data.style.price.salePrice} />
			</PDP.Payment>
			<PDP.FlxPromo>Earn 600 FLX points!</PDP.FlxPromo>
		</PDP>
	);
}

export function PaymentKlarna({ salePrice }: { salePrice: number }) {
	const installment = (salePrice / 4).toFixed(2);
	return <strong>Pay in four installments of ${installment}</strong>;
}
