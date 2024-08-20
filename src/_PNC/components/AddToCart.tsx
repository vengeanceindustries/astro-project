import { useState } from "react";
import { twMerge } from "tailwind-merge";

declare type AddToCartButtonProps = {
	isLoading?: boolean;
	isAdded?: boolean;
} & ButtonProps;

export function AddToCartButton({
	isLoading,
	isAdded,
	...props
}: AddToCartButtonProps) {
	const text = (function getAddToCartText() {
		switch (true) {
			case !!props.children:
				return props.children;
			case isLoading:
				return "Adding to Cart...";
			case isAdded:
				// return "✓ Added to Cart";
				return <AddedToCart />;
			default:
				return "Add to Cart";
		}
	})();
	return (
		<Button
			aria-disabled={isLoading}
			type="submit"
			{...props}
			className={twMerge("w-full my-2", props.className)}
		>
			{text}
		</Button>
	);
}

const AddedToCart = () => (
	<>
		<span className="text-green-600" aria-hidden>
			✓
		</span>{" "}
		Added to Cart
	</>
);

export default function AddToCart(props: AddToCartButtonProps) {
	const [state, setState] = useState<AddToCartButtonProps>({
		...props,
		isAdded: false,
		isLoading: false,
	});

	function onClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		setState({ ...state, isLoading: true });

		setTimeout(() => {
			setState({ isAdded: true, isLoading: false, secondary: true });
		}, 800);
	}
	return <AddToCartButton onClick={onClick} {...state} />;
}

// GLOBAL BUTTON //////////////////////////////////

declare type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & { secondary?: boolean };

export function Button({ secondary, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			{...props}
			className={twMerge(
				"px-4 py-[0.875rem] leading-none tracking-wide font-bold uppercase",
				"rounded-sm shadow-[inset_0_0_0_1px_black]",
				secondary ? "text-black" : "bg-black text-white",
				"aria-disabled:bg-neutral-200 aria-disabled:text-neutral-500 aria-disabled:shadow-[inset_0_0_0_1px_#AAA]",
				// "aria-disabled:bg-neutral-500 aria-disabled:text-neutral-200 aria-disabled:shadow-none",
				"aria-disabled:cursor-not-allowed",
				"transition-all duration-200",
				props.className
			)}
		/>
	);
}
