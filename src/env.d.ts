/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_BANNER: string;
	readonly PUBLIC_REMOTE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
