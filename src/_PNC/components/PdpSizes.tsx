import type { FormattedPdpSize, ProductDetailsFormatted } from "@PNC/utils";
import clsx from "clsx";
import { useState } from "react";

export function useSelectedSize() {
	const [selectedSize, setSize] = useState<FormattedPdpSize | undefined>();

	function handleChange(sizeObj: FormattedPdpSize) {
		return (
			e:
				| React.ChangeEvent<HTMLElement>
				| React.MouseEvent<HTMLButtonElement>
		) => {
			console.log("handleChange", sizeObj);
			setSize(sizeObj);
		};
	}
	return [selectedSize, handleChange] as const;
}

type HandleChange = ReturnType<typeof useSelectedSize>[1];

export function PdpSizeIndicator({
	button,
	size,
}: Pick<FormattedPdpSize, "size"> & { button?: boolean }) {
	return (
		<span
			className={clsx(
				"block py-2 px-2",
				"bg-neutral-100 border border-transparent rounded",
				"hover:border-black",
				"peer-focus:ring peer-focus:ring-purple-500",
				button ? "" : "peer-checked:bg-black peer-checked:text-white",
				"peer-aria-disabled:opacity-50 peer-aria-disabled:border-transparent peer-aria-disabled:cursor-not-allowed",
				"peer-aria-disabled:border-neutral-300 peer-aria-disabled:bg-gradient-to-br from-[49%] from-white via-50% via-neutral-500 to-[51%] to-white"
			)}
		>
			{Number(size).toFixed(1)}
		</span>
	);
}

export function PdpSizeField({ handleClick, ...size }: PdpSizeProps) {
	const disabled = !size.active || !size.inventory.inventoryAvailable;
	return (
		<label className="block w-20 text-center text-sm font-semibold cursor-pointer">
			<input
				aria-disabled={disabled}
				className="peer sr-only"
				disabled={disabled}
				name="size"
				onChange={handleClick(size)}
				type="radio"
				value={size.size}
			/>
			<span
				className={clsx(
					"block py-2 px-2",
					"bg-neutral-100 border border-transparent rounded",
					"hover:border-black",
					"peer-focus:ring peer-focus:ring-purple-500",
					"peer-checked:bg-black peer-checked:text-white",
					"peer-aria-disabled:opacity-50 peer-aria-disabled:border-transparent peer-aria-disabled:cursor-not-allowed",
					"peer-aria-disabled:border-neutral-300 peer-aria-disabled:bg-gradient-to-br from-[49%] from-white via-50% via-neutral-500 to-[51%] to-white"
				)}
			>
				{Number(size.size).toFixed(1)}
			</span>
			{/* <PdpSizeIndicator size={size.size} /> */}
		</label>
	);
}

export function PdpSizeButton({ handleClick, ...size }: PdpSizeProps) {
	const disabled = !size.active || !size.inventory.inventoryAvailable;
	return (
		<button
			aria-disabled={disabled}
			className="block peer w-20 text-center text-sm font-semibold cursor-pointer"
			onClick={handleClick(size)}
			type="button"
		>
			{/* <PdpSizeIndicator size={size.size} button /> */}
			<span
				className={clsx(
					"block py-2 px-2",
					"bg-neutral-100 border border-transparent rounded",
					"hover:border-black",
					"peer-focus:ring peer-focus:ring-purple-500",
					"peer-checked:bg-black peer-checked:text-white",
					{
						"opacity-50 border-transparent cursor-not-allowed":
							disabled,
						"border-neutral-300 bg-gradient-to-br from-[49%] from-white via-50% via-neutral-500 to-[51%] to-white":
							disabled,
					}
				)}
			>
				{Number(size.size).toFixed(1)}
			</span>
		</button>
	);
}

declare type PdpSizeProps = FormattedPdpSize & {
	handleClick: HandleChange;
};

export function PdpSizes({
	handleChange,
	sizes,
	style,
}: Pick<ProductDetailsFormatted, "sizes" | "style"> & {
	handleChange: HandleChange;
}) {
	if (!sizes?.length) {
		return null;
	}
	return (
		<fieldset className="my-4">
			<legend className="font-semibold mb-1">Select a size</legend>
			{style.width && (
				<p className="text-xs font-normal text-neutral-500 mb-2">
					{style.width}
				</p>
			)}
			<ul className="flex flex-wrap gap-2">
				{sizes.map((size) => (
					<li key={size.size} className="block">
						<PdpSizeButton {...size} handleClick={handleChange} />
						{/* <PdpSizeField {...size} handleClick={handleChange} /> */}
					</li>
				))}
			</ul>
		</fieldset>
	);
}
