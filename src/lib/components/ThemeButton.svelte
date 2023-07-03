<script lang="ts">
    import octicons from "@primer/octicons";
</script>

<span class="wrapper">
    <span class="light">
        {@html octicons["sun"].toSVG({height: 24, width: 24})}
    </span>
    <span class="dark">
        {@html octicons["moon"].toSVG({height: 24, width: 24})}
    </span>
    <a
        class="Header-link light"
        href="javascript:void(0)"
        role="button"
        title="Toggle color scheme"
        aria-label="Light color scheme"
        aria-live="polite"
        on:click|preventDefault={() => localStorage.setItem("theme", "dark")}>
    </a>
    <a
        class="Header-link dark"
        href="javascript:void(0)"
        role="button"
        title="Toggle color scheme"
        aria-label="Dark color scheme"
        aria-live="polite"
        on:click|preventDefault={() => localStorage.setItem("theme", "light")}>
    </a>
</span>

<style>
    .wrapper {
        display: grid;
    }

    .wrapper > * {
        grid-area: 1 / 1 / 1 / 1;
        display: block;
        transition: clip-path 0.3s ease-in-out;
    }

    a {
        z-index: 10;
    }

    :global([data-color-mode="dark"]) a.light {
        display: none;
    }

    a.dark {
        display: none;
    }

    :global([data-color-mode="dark"]) a.dark {
        display: block;
    }

    :global([data-color-mode="dark"]) span.light {
        clip-path: polygon(-50% 50%, 50% 150%, 50% 150%, -50% 50%);
    }

    span.light {
        clip-path: polygon(-50% 50%, 50% 150%, 150% 50%, 50% -50%);
    }

    span.dark {
        clip-path: polygon(50% -50%, 150% 50%, 150% 50%, 50% -50%);
    }

    :global([data-color-mode="dark"]) span.dark {
        clip-path: polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%);
    }
</style>
