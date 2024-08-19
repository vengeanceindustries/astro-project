import { createSlot } from "@components/Slot";
import clsx from "clsx";

type SlotNames = "afterLabel";
const { createChildrenSlots, Slot } = createSlot<SlotNames>();

export function PdpFulfillmentInput({
	children,
	...props
}: React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) {
	const id = props.id || `${props.name}-${props.value}`;
	const slots = createChildrenSlots(children);
	return (
		<div
			className={clsx(
				"block peer px-4 rounded-md",
				"outline outline-1 outline-neutral-300",
				"has-[:checked]:outline-black"
			)}
		>
			<label className="flex items-center py-4" htmlFor={id}>
				<input
					{...props}
					className="peer sr-only"
					id={id}
					type="radio"
				/>
				<span
					className={clsx(
						"relative block basis-5 h-5 rounded-full mr-4",
						"outline outline-1 outline-neutral-600 outline-offset-4x",
						"bg-white",
						"hover:bg-neutral-100 peer-hover:bg-neutral-100",
						"peer-focus:ring peer-focus:ring-purple-500",
						"after:absolute after:inset-1 after:rounded-full",
						"peer-checked:after:bg-black"
					)}
					data-id="radio-indicator"
				/>
				<div className="flex-1">{slots.children}</div>
			</label>

			{slots.afterLabel && (
				<div className="ml-9 border-t py-4">{slots.afterLabel}</div>
			)}
		</div>
	);
}

export function PdpFulfillment() {
	return (
		<fieldset className="block my-4">
			<legend className="sr-only">Fulfillment method</legend>
			<ul className="flex flex-col gap-3">
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

						<Slot name="afterLabel">
							<PdpBopisStore store={{ name: "Chicago" }} />
						</Slot>
					</PdpFulfillmentInput>
				</li>
			</ul>
		</fieldset>
	);
}

export function PdpBopisStore({ store }: { store: { name: string } }) {
	return (
		<div className="flex flex-wrap gap-1 justify-between">
			<p className="uppercase font-semibold text-sm">{store.name}</p>
			<p className="text-sm">
				<a href="/store-locator" className="text-[#036ad8] underline">
					Change store
				</a>
			</p>
			<p className="text-xs grow">
				We don’t have your size at this store
			</p>
		</div>
	);
}
