import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            fallback: "error.html",
        }),
        prerender: {
            concurrency: 64,
        },
    },
    preprocess: vitePreprocess(),
};

export default config;
