import svg from "@poppanator/sveltekit-svg";
import { sveltekit } from "@sveltejs/kit/vite";
import { svelteSitemap } from "svelte-sitemap/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        sveltekit(),
        svg(),
        svelteSitemap({
            domain: "https://commits.toino.pt",
            outDir: ".svelte-kit/cloudflare",
        }),
    ],
});
