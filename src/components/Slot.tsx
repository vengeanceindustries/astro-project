import React, { type PropsWithChildren } from "react";
import { createContext, useContext } from "react";

/**
 * create typed 'slots' object for parent, Slot component, and useSlot context hook
 */
export function createSlot<SlotName extends string>() {
	const SlotContext = createContext<SlotName | undefined>(undefined);

	/**
	 * Slot component typed to parentslot names, with name context
	 */
	function Slot({
		children,
		name,
		...rest
	}: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> & { name: SlotName }) {
		return (
			<SlotContext.Provider value={name}>
				<div {...rest} data-id={`slot-${name}`}>
					{children}
				</div>
			</SlotContext.Provider>
		);
	}

	/**
	 * access Slot component's name via context
	 */
	function useSlot() {
		return useContext(SlotContext);
	}

	type Nodes = React.ReactNode[];

	/**
	 * provide slots object based on parent component's children
	 */
	function createChildrenSlots(children: React.ReactNode) {
		const slots: { [N in SlotName]?: Nodes } & { content: Nodes } = {
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
