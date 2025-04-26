<script lang="ts">
    /* eslint-disable svelte/no-at-html-tags */

    import octicons from "@primer/octicons";

    let {
        icon,
        size = 24,
    }: {
        icon: octicons.IconName;
        size?: number;
    } = $props();

    let svg = $derived(octicons[icon].toSVG({ height: size, width: size }));
</script>

{@html svg}
