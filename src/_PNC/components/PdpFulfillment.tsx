import clsx from "clsx";

export function PdpFulfillmentInput({
	children,
	...props
}: React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) {
	const id = props.id || `${props.name}-${props.value}`;
	return (
		<label
			className={clsx(
				"block peer p-4 rounded-md",
				"outline outline-1 outline-neutral-300",
				"hover:outline-neutral-500",
				"has-[:checked]:outline-black"
			)}
			htmlFor={id}
		>
			<div className="flex items-center">
				<input
					{...props}
					className="peer sr-only"
					id={id}
					type="radio"
				/>
				<span
					className={clsx(
						"relative block basis-6 h-6 rounded-full mr-4",
						"outline outline-1 outline-neutral-600 outline-offset-4x",
						"bg-white",
						"hover:bg-neutral-100 peer-hover:bg-neutral-100",
						"after:absolute after:inset-1 after:rounded-full",
						"peer-checked:after:bg-black"
					)}
					data-id="radio-indicator"
				/>
				<div className="flex-1">{children}</div>
			</div>
		</label>
	);
}

export function PdpFulfillment() {
	return (
		<fieldset>
			<legend className="sr-only">Fulfillment method</legend>
			<ul className="flex flex-col gap-2">
				<li>
					<PdpFulfillmentInput
						defaultChecked
						name="fulfillmentMethod"
						value="shipping"
					>
						<p className="text-base font-semibold">Ship to me</p>
						<p className="text-sm text-[#b80094]">
							Free standard shipping for FLX Rewards members
						</p>
					</PdpFulfillmentInput>
				</li>
				<li>
					<PdpFulfillmentInput name="fulfillmentMethod" value="bopis">
						<p className="text-base font-semibold">Ship to store</p>
						<p className="text-xs">
							Select your local store to grab your order
						</p>
					</PdpFulfillmentInput>
				</li>
			</ul>
		</fieldset>
	);
}
