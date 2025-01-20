import { defineCollection } from "astro:content";
import { countryLoader } from "@loaders/countryLoader";
import { jokeLoader } from "@loaders/jokeLoader";
import { placeholderLoader } from "@loaders/placeholderLoader";
// import { randomUserLoader } from '@loaders/randomUserLoader';

const countries = defineCollection({
	type: "data",
	schema: countryLoader(),
});

const jokes = defineCollection({
	type: "data",
	schema: jokeLoader(),
});

const posts = defineCollection({
	type: "data",
	schema: placeholderLoader(),
});

// const randomUsers = defineCollection({
// 	type: "data",
// 	schema: randomUserLoader(),
// });

export const collections = {
	countries,
	jokes,
	posts,
	// randomUsers,
};
