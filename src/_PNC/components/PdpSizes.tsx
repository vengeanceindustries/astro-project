import type {
	FormattedPdpSize,
	ProductDetailsFormatted,
} from "@PNC/components";
import clsx from "clsx";

export function PdpSizeField({
	onChange,
	...size
}: FormattedPdpSize & {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
	const disabled = !size.active || !size.inventory.inventoryAvailable;
	return (
		<label className="block w-20 text-center text-sm font-semibold cursor-pointer">
			<input
				aria-disabled={disabled}
				className="peer sr-only"
				disabled={disabled}
				name="size"
				onChange={onChange}
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
					// "peer-aria-disabled:opacity-50 peer-aria-disabled:border-transparent peer-aria-disabled:cursor-not-allowed",
					"peer-disabled:opacity-50 peer-disabled:border-transparent peer-disabled:cursor-not-allowed",
					"peer-disabled:border-neutral-300 peer-disabled:bg-gradient-to-br from-[49%] from-white via-50% via-neutral-500 to-[51%] to-white"
				)}
			>
				{Number(size.size).toFixed(1)}
			</span>
		</label>
	);
}

export function PdpSizes({
	onChange,
	sizes,
	style,
}: Pick<ProductDetailsFormatted, "sizes" | "style"> & {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
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
						<PdpSizeField {...size} onChange={onChange} />
					</li>
				))}
			</ul>
		</fieldset>
	);
}
