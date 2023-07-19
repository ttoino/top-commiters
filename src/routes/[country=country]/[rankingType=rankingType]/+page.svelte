<script lang="ts">
    import { page } from "$app/stores";
    import RankingsSelect from "$lib/components/RankingsSelect.svelte";
    import Row from "$lib/components/Row.svelte";
    import { rankingTypes, type RankingType } from "$lib/rankingTypes";
    import type { PageData } from "./$types";
    import { MetaTags } from "svelte-meta-tags";

    export let data: PageData;

    const country = data.country.name;
    const flag = data.country.flag;
    const urlPrefix =  `/${data.country.code}`;
    let rankingType: RankingType;
    $: rankingType = $page.params.rankingType as RankingType;

    const {
        numberOfUsers,
        minFollowers,
    } = data.metadata;

    const updatedAt = new Date(data.metadata.updatedAt).toLocaleString();
</script>

<MetaTags
    title="Top commiters {flag}"
    description="Top 100 Github users from {country} sorted by {rankingTypes[rankingType].title}"
    openGraph={{
        type: "website",
        url: `https://commits.toino.pt/${data.country.code}/${rankingType}`,
        title: `Top commiters ${flag}`,
        description: `Top 100 Github users from ${country} sorted by ${rankingTypes[rankingType].title}`,
        images: [
            {
                url: "/favicon.svg",
                width: 128,
                height: 128,
                alt: "Top commiters"
            }
        ]
    }} />

<div class="d-flex flex-row flex-items-center flex-justify-between mb-4">
    <h2>{flag} {country}</h2>

    <RankingsSelect current={rankingType} {urlPrefix} />
</div>

<p>
    Based on the top <strong>{numberOfUsers}</strong> users (with at least <strong>{minFollowers}</strong> followers).
    Updated on <strong>{updatedAt}</strong>.
</p>

<div class="Box">
    {#if data.users.length === 0}
        <div class="blankslate">
            <h3 class="blankslate-heading">
                No users found
            </h3>
        </div>
    {:else}
        <ol>
            {#each data.users as user, i }
                <Row
                    rank={i + 1}
                    {user}
                    {rankingType}
                />
            {/each}
        </ol>
    {/if}
</div>
