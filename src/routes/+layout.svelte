<script>
	import "@primer/css/dist/primer.css";
    import Header from "../lib/components/Header.svelte";
    import { page } from "$app/stores";
    import { theme } from "$lib/stores";

    $theme = $page.data.theme ?? "light";

    let data = {};
    $: data = {
        "data-color-mode": $theme ?? t,
        [`data-${$theme}-theme`]: $theme ?? t
    }
</script>

<div {...data}>
    <Header/>
    
    <main class="container-lg p-4">
        <slot />
    </main>
</div>

<style>
    :global(*) {
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
        transition-property: color, background-color, border-color, box-shadow;
    }
</style>
