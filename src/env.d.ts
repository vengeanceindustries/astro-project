/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/content-collections" />
/// <reference types="./utils/banner.configs.d.ts" />
interface ImportMetaEnv {
	readonly PUBLIC_BANNER: string;
	readonly PUBLIC_REMOTE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		banner: Banner;
		title: string;
	}
}
