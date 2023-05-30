<script lang="ts">
    import type { IUser } from "$lib/models/User";
    import type { RankingType } from "$lib/rankingTypes";
    import { rankingTypes } from "$lib/rankingTypes";
    import octicons from "@primer/octicons";

    export let rank: number;
    export let user: IUser;
    export let rankingType: RankingType;
</script>

<li class="Box-row d-flex flex-row flex-items-center position-relative">
    <span class="Label Label--large mr-3">{rank}</span>
    <img
        src={user.avatar}
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
        {@html octicons[rankingTypes[rankingType].icon].toSVG()}
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
