<script lang="ts">
    import countries from "$lib/countries.json";
    import { MetaTags } from "svelte-meta-tags";

    let value = "";

    let filteredCountries: (typeof countries)[keyof typeof countries][] = [];

    $: filteredCountries = Object.values(countries).filter((country) => {
        return [country.name, country.flag, country.code, ...country.alias]
            .map((s) => s.toLowerCase().includes(value.toLowerCase()))
            .includes(true);
    });
</script>

<MetaTags
    title="Top commiters"
    description="Top commiters lists the top users on github by country"
    openGraph={{
        type: "website",
        url: "https://commits.toino.pt",
        title: "Top commiters",
        description: "Top commiters lists the top users on github by country",
        images: [
            {
                url: "/favicon.svg",
                width: 128,
                height: 128,
                alt: "Top commiters",
            },
        ],
    }}
/>

<input
    type="search"
    placeholder="🔍 Search countries..."
    name="filter-country"
    id="filter-country"
    class="form-control input-block mb-4 p-3"
    bind:value
/>

<div class="Box">
    {#if filteredCountries.length === 0}
        <div class="blankslate">
            <h3 class="blankslate-heading">No countries found</h3>
        </div>
    {:else}
        <ul>
            {#each filteredCountries as country}
                <li
                    class="Box-row d-flex flex-row flex-items-center position-relative"
                >
                    <a
                        href={`/${country.code}/contribs`}
                        class="Box-row-link mr-auto"
                    >
                        {country.flag}
                        {country.name}
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    a::before {
        content: "";
        display: block;
        position: absolute;
        inset: 0;
    }
</style>
