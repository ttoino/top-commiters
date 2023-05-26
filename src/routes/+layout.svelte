<script>
	import "@primer/css/dist/primer.css";
    import Header from "../lib/components/Header.svelte";
</script>

<Header/>

<main class="container-lg p-4">
    <slot />
</main>
