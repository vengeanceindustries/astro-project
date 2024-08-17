import React, { type PropsWithChildren } from "react";
import { createContext, useContext } from "react";

export function createSlot<SlotName extends string>() {
	const SlotContext = createContext<SlotName | undefined>(undefined);

	function Slot({ children, name }: PropsWithChildren<{ name: SlotName }>) {
		return (
			<SlotContext.Provider value={name}>
				<div data-id={`slot-${name}`}>{children}</div>
			</SlotContext.Provider>
		);
	}

	function useSlot() {
		return useContext(SlotContext);
	}

	type Nodes = React.ReactNode[];
	type SlotList = { [N in SlotName]?: Nodes } & { content: Nodes };

	function createChildrenSlots(children: React.ReactNode) {
		const slots: SlotList = {
			content: [],
		};

		React.Children.forEach(children, (child, i) => {
			if (!React.isValidElement(child)) return;

			if (child.type === Slot) {
				const name = child.props.name as SlotName;
				if (name in slots) {
					(slots[name] as Nodes).push(child);
				} else {
					(slots[name] as Nodes) = [child];
				}
				return;
			}
			slots.content.push(child);
		});

		return slots;
	}

	return { createChildrenSlots, Slot, useSlot };
}
