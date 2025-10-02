<script lang="ts">
    import { resolve } from "$app/paths";
    import countries from "$lib/countries.json";
    import { MetaTags } from "svelte-meta-tags";

    let value = $state("");

    let filteredCountries = $derived(
        Object.values(countries).filter((country) =>
            [country.name, country.flag, country.code, ...country.alias]
                .map((s) => s.toLowerCase().includes(value.toLowerCase()))
                .includes(true),
        ),
    );
</script>

<MetaTags
    description="Top commiters lists the top users on github by country"
    openGraph={{
        description: "Top commiters lists the top users on github by country",
        images: [
            {
                alt: "Top commiters",
                height: 128,
                url: "/favicon.svg",
                width: 128,
            },
        ],
        title: "Top commiters",
        type: "website",
        url: "https://commits.toino.pt",
    }}
    title="Top commiters"
/>

<input
    id="filter-country"
    name="filter-country"
    class="form-control input-block mb-4 p-3"
    placeholder="🔍 Search countries..."
    type="search"
    bind:value
/>

<div class="Box">
    {#if filteredCountries.length === 0}
        <div class="blankslate">
            <h3 class="blankslate-heading">No countries found</h3>
        </div>
    {:else}
        <ul>
            {#each filteredCountries as country (country.code)}
                <li
                    class="Box-row d-flex flex-row flex-items-center position-relative"
                >
                    <a
                        class="Box-row-link mr-auto"
                        href={resolve(
                            "/[country=country]/[rankingType=rankingType]",
                            {
                                country: country.code,
                                rankingType: "contribs",
                            },
                        )}
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
