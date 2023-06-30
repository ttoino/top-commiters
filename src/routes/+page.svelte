<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import countries from "$lib/countries.json";

    let value = $page.url.searchParams.get("q") ?? "";

    let filteredCountries: typeof countries[keyof typeof countries][] = [];

    $: filteredCountries = 
        Object.values(countries).filter((country) => {
            return [country.name, country.flag, country.code, ...country.alias].map(s => s.toLowerCase().includes(value.toLowerCase())).includes(true);
        });
</script>

<svelte:head>
    <title>Top commiters</title>
</svelte:head>

<input
    type="search" 
    placeholder="Search countries..." 
    name="filter-country" 
    id="filter-country" 
    class="form-control input-block mb-4 p-3" 
    bind:value 
    on:input={function() {
        goto(this.value ? `/?q=${this.value}` : "/", { replaceState: true, keepFocus: true });
    }}>

<div class="Box">
    {#if filteredCountries.length === 0}
        <div class="blankslate">
            <h3 class="blankslate-heading">
                No countries found
            </h3>
        </div>
    {:else}
        <ul>
            {#each filteredCountries as country}
                <li class="Box-row d-flex flex-row flex-items-center position-relative">
                    <a href={`/${country.code}/contribs`} class="Box-row-link mr-auto">
                        {country.flag} {country.name}
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
