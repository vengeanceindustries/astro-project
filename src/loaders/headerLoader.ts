import { z } from "astro:content";
import fetch from "node-fetch";

export const HeaderSchema = z.object({
	id: z.number(),
});

export type Header = z.infer<typeof HeaderSchema>;

export function headerLoader() {
	return HeaderSchema.shape;
}

export async function fetchHeader(): Promise<Header> {
	const route = `https://www.uat2.origin.footlocker.com/api/content/header.details.json`;
	const headers = { "fl-api-lang": "en-US" };
	const res = await fetch(route, { headers });
	console.log("💀 Header Data 👉", { status: res.status, statusText: res.statusText });

	if (res.status === 404) {
		throw new Error("Unexpected data format");
	}
	try {
		const data = (await res.json()) as Header;
		console.log("💀 Header Data 👉", data);
		return data;

		// return data.map(
		// 	(item: any): Header => ({
		// 		id: item.id,
		// 		...item,
		// 	})
		// );
	} catch (error) {
		console.error("Error loading headers:", error);
		return {} as Header;
	}
}
