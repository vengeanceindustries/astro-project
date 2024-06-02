import React from "react";
import { twMerge } from "tailwind-merge";

export type MyReactComponentProps = React.PropsWithChildren<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>
>;

export default function MyReactComponent({
	children,
	className,
	...props
}: MyReactComponentProps) {
	return (
		<div
			{...props}
			className={twMerge(
				"px-4 py-2 my-2 -mx-4 bg-black rounded",
				className
			)}
		>
			<p>My React Component!</p>
			{children}
		</div>
	);
}
