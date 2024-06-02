import React, { useState } from "react";
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
	const [count, setCount] = useState(0);
	return (
		<div
			{...props}
			className={twMerge("p-4 my-2 -mx-4 bg-black rounded", className)}
		>
			<div>
				{/* <p className="text-xs">My React Component?</p> */}
				{children || <p className="my-0">Cool React Component!</p>}
			</div>
			<button
				className="bg-neutral-100 text-neutral-900 px-2 py-1 rounded my-1"
				type="button"
				onClick={() => setCount(count + 1)}
			>
				<code>
					Clicked button <strong>{count}</strong> times.
				</code>
			</button>
			<pre className="text-xs mt-2">{JSON.stringify(props)}</pre>
		</div>
	);
}
