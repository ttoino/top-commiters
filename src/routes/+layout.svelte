<script lang="ts">
    import "@primer/css/dist/primer.css";
    import Header from "../lib/components/Header.svelte";
</script>

<Header />

<main class="container-lg p-4">
    <slot />
</main>

<style>
    :global(*) {
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
        transition-property: color, background-color, border-color, box-shadow;
    }
</style>
