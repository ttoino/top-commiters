<script lang="ts">
    import type User from "$lib/User";
    import type { RankingType } from "$lib/rankingTypes";
    import { rankingTypes } from "$lib/rankingTypes";
    import Octicon from "./Octicon.svelte";

    export let rank: number;
    export let user: User;
    export let rankingType: RankingType;
</script>

<li class="Box-row d-flex flex-row flex-items-center position-relative">
    <span class="Label Label--large mr-3">{rank}</span>
    <img
        src="{user.avatar}&s=96"
        alt=""
        class="avatar mr-3"
        width="32"
        height="32"
        loading="lazy"
    />
    <a href={user.url} class="Box-row-link mr-auto">
        {#if user.name}
            {user.name}

            <span class="color-fg-muted">
                @{user.login}
            </span>
        {:else}
            @{user.login}
        {/if}
    </a>
    <span class="Counter">
        <Octicon icon={rankingTypes[rankingType].icon} size={16} />
        {user[rankingTypes[rankingType].prop]}
    </span>
</li>

<style>
    a::before {
        content: "";
        display: block;
        position: absolute;
        inset: 0;
    }
</style>
