<script lang="ts">
    import RankingsSelect from "$lib/components/RankingsSelect.svelte";
    import Row from "$lib/components/Row.svelte";
    import { rankingTypes } from "$lib/rankingTypes";
    import { MetaTags } from "svelte-meta-tags";

    import type { PageData } from "./$types";

    let {
        data,
    }: {
        data: PageData;
    } = $props();

    let country = $derived(data.country.name);
    let flag = $derived(data.country.flag);
    let urlPrefix = $derived(`/${data.country.code}`);
    let rankingType = $derived(rankingTypes[data.rankingType]);
    let updatedAt = $derived(new Date(data.updatedAt).toLocaleString());
</script>

<MetaTags
    title="Top commiters {flag}"
    description="Top 100 Github users from {country} sorted by {rankingType.title}"
    openGraph={{
        description: `Top 100 Github users from ${country} sorted by ${rankingType.title}`,
        images: [
            {
                alt: "Top commiters",
                height: 128,
                url: "/favicon.svg",
                width: 128,
            },
        ],
        title: `Top commiters ${flag}`,
        type: "website",
        url: `https://commits.toino.pt/${data.country.code}/${rankingType}`,
    }}
/>

<div class="d-flex flex-row flex-items-center flex-justify-between mb-4">
    <h2>{flag} {country}</h2>

    <RankingsSelect current={data.rankingType} {urlPrefix} />
</div>

<p>
    Based on the top <strong>{data.numberOfUsers}</strong> users (with at least
    <strong>{data.minFollowers}</strong>
    followers). Updated on <strong>{updatedAt}</strong>.
</p>

<div class="Box">
    {#if data.users.length === 0}
        <div class="blankslate">
            <h3 class="blankslate-heading">No users found</h3>
        </div>
    {:else}
        <ol>
            {#each data.users as user, i (user.login)}
                <Row rank={i + 1} {user} rankingType={data.rankingType} />
            {/each}
        </ol>
    {/if}
</div>
