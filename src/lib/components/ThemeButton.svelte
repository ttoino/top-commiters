<script lang="ts">
    import Octicon from "./Octicon.svelte";
</script>

<span class="wrapper">
    <span class="light">
        <Octicon icon="sun" />
    </span>
    <span class="dark">
        <Octicon icon="moon" />
    </span>
    <button
        class="Header-link light"
        title="Toggle color scheme"
        aria-label="Light color scheme"
        aria-live="polite"
        on:click|preventDefault={() => localStorage.setItem("theme", "dark")}
    >
    </button>
    <button
        class="Header-link dark"
        title="Toggle color scheme"
        aria-label="Dark color scheme"
        aria-live="polite"
        on:click|preventDefault={() => localStorage.setItem("theme", "light")}
    >
    </button>
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

    button {
        appearance: none;
        all: unset;
        cursor: pointer;
        z-index: 10;
    }

    :global([data-color-mode="dark"]) button.light {
        display: none;
    }

    button.dark {
        display: none;
    }

    :global([data-color-mode="dark"]) button.dark {
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
