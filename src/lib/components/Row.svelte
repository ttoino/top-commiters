<script lang="ts">
    import type { RankingType } from "$lib/rankingTypes";
    import type User from "$lib/User";

    import { rankingTypes } from "$lib/rankingTypes";

    import Octicon from "./Octicon.svelte";

    let {
        rank,
        rankingType,
        user,
    }: {
        rank: number;
        rankingType: RankingType;
        user: User;
    } = $props();
</script>

<li class="Box-row d-flex flex-row flex-items-center position-relative">
    <span class="Label Label--large mr-3">{rank}</span>
    <img
        class="avatar mr-3"
        alt=""
        height="32"
        loading="lazy"
        src="{user.avatar}&s=96"
        width="32"
    />
    <!-- eslint-disable svelte/no-navigation-without-resolve -->
    <a
        class="Box-row-link mr-auto"
        href={user.url}
        rel="noopener noreferrer"
        target="_blank"
    >
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
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
