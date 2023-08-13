<script lang="ts">
    import {
        rankingTypeIndices,
        type RankingType,
        rankingTypes,
    } from "$lib/rankingTypes";

    export let current: RankingType;
    export let urlPrefix: string;
</script>

<div class="subnav d-lg-block d-none mb-0">
    <nav class="subnav-links">
        {#each rankingTypeIndices as t}
            <a
                href="{urlPrefix}/{t}"
                class="subnav-item"
                aria-current={current === t ? "page" : "false"}
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
        {#each rankingTypeIndices as t}
            {#if t !== current}
                <li>
                    <a href="{urlPrefix}/{t}" class="dropdown-item">
                        {rankingTypes[t].title}
                    </a>
                </li>
            {/if}
        {/each}
    </ul>
</details>
