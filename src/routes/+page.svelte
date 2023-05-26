<script lang="ts">
    import countries from "$lib/countries.json";
</script>

<svelte:head>
    <title>Top commiters</title>
</svelte:head>

<div class="Box">
    <ul>
        {#each Object.values(countries) as country}
            <li class="Box-row d-flex flex-row flex-items-center">
                <a href={`/${country.code}/contribs`} class="Box-row-link mr-auto">
                    {country.flag} {country.name}
                </a>
            </li>
        {/each}
    </ul>
</div>
