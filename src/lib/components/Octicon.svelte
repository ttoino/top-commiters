<script lang="ts">
    /* eslint-disable svelte/no-at-html-tags */

    import octicons from "@primer/octicons";

    export let icon: octicons.IconName;
    export let size: number = 24;

    $: svg = octicons[icon].toSVG({ height: size, width: size });
</script>

{@html svg}
