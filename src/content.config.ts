import { defineCollection } from "astro:content";
// import { countryLoader } from "@loaders/countryLoader";
import { headerLoader } from "@loaders/headerLoader";
import { jokeLoader } from "@loaders/jokeLoader";
// import { placeholderLoader } from "@loaders/placeholderLoader";

// const countries = defineCollection({
// 	type: "data",
// 	schema: countryLoader(),
// });

const header = defineCollection({
	type: "data",
	schema: headerLoader(),
});

const jokes = defineCollection({
	type: "data",
	schema: jokeLoader(),
});

// const posts = defineCollection({
// 	type: "data",
// 	schema: placeholderLoader(),
// });

// const randomUsers = defineCollection({
// 	type: "data",
// 	schema: randomUserLoader(),
// });

export const collections = {
	// countries,
	header,
	jokes,
	// posts,
	// randomUsers,
};
