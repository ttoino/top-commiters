<script lang="ts">
    import octicons from "@primer/octicons";

    const icons = {
        light: octicons["sun"].toSVG({height: 24, width: 24}),
        dark: octicons["moon"].toSVG({height: 24, width: 24}),
    };

    const themes = ["light", "dark"];
</script>

<a class="Header-link" href="#" on:click|preventDefault={() => {
    const theme = localStorage.getItem("theme");
    const index = themes.indexOf(theme ?? "");
    localStorage.setItem("theme", themes[(index + 1) % themes.length]);
}}>
    <span class="light">
        {@html icons.light}
    </span>
    <span class="dark">
        {@html icons.dark}
    </span>
</a>

<style>
    a {
        display: grid;
    }

    span {
        grid-area: 1 / 1 / 1 / 1;
        display: block;
        transition: clip-path 0.3s ease-in-out;
    }

    :global([data-color-mode="dark"]) .light {
        clip-path: polygon(-50% 50%, 50% 150%, 50% 150%, -50% 50%);
    }

    .light {
        clip-path: polygon(-50% 50%, 50% 150%, 150% 50%, 50% -50%);
    }

    .dark {
        clip-path: polygon(50% -50%, 150% 50%, 150% 50%, 50% -50%);
    }

    :global([data-color-mode="dark"]) .dark {
        clip-path: polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%);
    }
</style>
