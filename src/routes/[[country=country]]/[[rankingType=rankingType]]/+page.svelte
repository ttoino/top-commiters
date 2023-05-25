<script lang="ts">
    import RankingsSelect from "$lib/components/RankingsSelect.svelte";
    import Row from "$lib/components/Row.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    const country = data.country?.name ?? "Global";
    const flag = data.country?.flag ?? "🌐";
    const urlPrefix = data.country ? `/${data.country.code}` : "";
</script>

<svelte:head>
    <title>Top commiters {flag}</title>
</svelte:head>

<main class="container-lg p-4">
    <div class="d-flex flex-row flex-items-center flex-justify-between mb-4">
        <h2>{flag} {country}</h2>

        <RankingsSelect current={data.rankingType} {urlPrefix} />
    </div>

    <div class="Box">
        <ol>
            {#each data.users as user, i }
                <Row
                    rank={i + 1}
                    {user}
                    rankingType={data.rankingType}
                />
            {/each}
        </ol>
    </div>
</main>
