<script lang="ts">
    import { base } from "$app/paths";
    import {
        type RankingType,
        rankingTypeIndices,
        rankingTypes,
    } from "$lib/rankingTypes";

    let {
        current,
        urlPrefix,
    }: {
        current: RankingType;
        urlPrefix: string;
    } = $props();
</script>

<div class="subnav d-lg-block d-none mb-0">
    <nav class="subnav-links">
        {#each rankingTypeIndices as t (t)}
            <a
                class="subnav-item"
                aria-current={current === t ? "page" : "false"}
                href="{base}/{urlPrefix}/{t}"
            >
                {rankingTypes[t].title}
            </a>
        {/each}
    </nav>
</div>

<details
    class="dropdown details-reset details-overlay d-inline-block d-lg-none"
>
    <summary class="btn" aria-haspopup="true">
        {rankingTypes[current].title}
        <div class="dropdown-caret"></div>
    </summary>

    <ul class="dropdown-menu dropdown-menu-sw">
        {#each rankingTypeIndices as t (t)}
            {#if t !== current}
                <li>
                    <a class="dropdown-item" href="{base}/{urlPrefix}/{t}">
                        {rankingTypes[t].title}
                    </a>
                </li>
            {/if}
        {/each}
    </ul>
</details>
