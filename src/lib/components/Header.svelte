<script lang="ts">
    import Logo from "$lib/logo.svg?component";

    import Octicon from "./Octicon.svelte";
    import ThemeButton from "./ThemeButton.svelte";
</script>

<header class="Header position-sticky top-0">
    <h1 class="Header-item h2 mr-auto">
        <a href="/" class="Header-link">
            <Logo /><span class="ml-2">Top commiters</span>
        </a>
    </h1>

    <div class="Header-item">
        <ThemeButton />
    </div>

    <div class="Header-item">
        <a
            href="https://github.com/ttoino/top-commiters"
            class="Header-link"
            title="Github"
            aria-label="Top committers Github repository"
            ><Octicon icon="mark-github" /></a
        >
    </div>
</header>

<style>
    h1 :global(svg) {
        height: 1em;
        width: 1em;
        fill: currentColor;
        vertical-align: middle;
    }
</style>
