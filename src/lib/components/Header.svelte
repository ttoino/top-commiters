<script lang="ts">
    import octicons from "@primer/octicons";
    import ThemeButton from "./ThemeButton.svelte";

    const githubIcon = octicons["mark-github"].toSVG({height: 24, width: 24});
</script>

<header class="Header position-sticky top-0">
    <h1 class="Header-item h2 mr-auto">
        <a href="/" class="Header-link">
            Top commiters
        </a>
    </h1>

    <div class="Header-item">
        <ThemeButton />
    </div>

    <div class="Header-item">
        <a href="https://github.com/ttoino/top-commiters" class="Header-link" title="Github" aria-label="Top committers Github repository">{@html githubIcon}</a>
    </div>
</header>
