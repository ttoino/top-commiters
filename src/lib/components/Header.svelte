<script lang="ts">
    import { resolve } from "$app/paths";
    import Logo from "$lib/logo.svg?component";

    import Octicon from "./Octicon.svelte";
    import ThemeButton from "./ThemeButton.svelte";
</script>

<header class="Header position-sticky top-0">
    <h1 class="Header-item h2 mr-auto">
        <a class="Header-link" href={resolve("/")}>
            <Logo /><span class="ml-2">Top commiters</span>
        </a>
    </h1>

    <div class="Header-item">
        <ThemeButton />
    </div>

    <div class="Header-item">
        <a
            class="Header-link"
            aria-label="Top committers Github repository"
            href="https://github.com/ttoino/top-commiters"
            rel="noopener noreferrer"
            target="_blank"
            title="Github"
        >
            <Octicon icon="mark-github" />
        </a>
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
