import { type PropsWithChildren } from "react";
import { createContext, useContext } from "react";

export function createSlot<Name extends string>() {
	const SlotContext = createContext<Name | undefined>(undefined);

	function useSlot() {
		const name = useContext(SlotContext);
		// console.log("useSlot", name);
		return name;
	}

	function Slot({ children, name }: PropsWithChildren<{ name: Name }>) {
		return (
			<SlotContext.Provider value={name}>
				<div data-id={`slot-${name}`}>{children}</div>
			</SlotContext.Provider>
		);
	}

	return { Slot, useSlot };
}
