<script lang="ts">
    import octicons from "@primer/octicons";

    export let githubIcon = octicons["mark-github"].toSVG({height: 24, width: 24});
</script>

<header class="Header">
    <h1 class="Header-item h2 mr-auto">
        <a href="/" class="Header-link">
            Top commiters
        </a>
    </h1>

    <div class="Header-item">
        <a href="https://github.com/ttoino/top-commiters" class="Header-link">{@html githubIcon}</a>
    </div>
</header>
