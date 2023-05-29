import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const theme = writable<"light" | "dark" | null>(null);
theme.subscribe((value) => {
    if (!value) return;

    if (browser) document.cookie = `theme=${value};path=/;max-age=31536000`;
});
