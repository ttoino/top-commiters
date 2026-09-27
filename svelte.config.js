import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    compilerOptions: {
        runes: ({ filename }) =>
            filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
    },
    kit: {
        adapter: adapter({
            routes: {
                exclude: ["<all>", "/sitemap.xml"],
                include: ["/*"],
            },
        }),
        prerender: {
            concurrency: 1,
        },
    },
    preprocess: vitePreprocess(),
};

export default config;
