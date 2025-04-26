<script lang="ts">
    import "@primer/css/dist/primer.css";

    import type { Snippet } from "svelte";

    import Header from "../lib/components/Header.svelte";

    let {
        children,
    }: {
        children?: Snippet;
    } = $props();
</script>

<Header />

<main class="container-lg p-4">
    {@render children?.()}
</main>

<style>
    :global(*) {
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
        transition-property: color, background-color, border-color, box-shadow;
    }
</style>
