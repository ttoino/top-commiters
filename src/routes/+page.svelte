<script lang="ts">
    import type { PageData } from "./$types";
    import octicons from "@primer/octicons";

    export let data: PageData;

    export const dataString = JSON.stringify(data, null, 4);
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<main class="container-lg">
    <div class="Box m-4">
        <ol>
            {#each data.users as user, i}
                <li class="Box-row d-flex flex-row flex-items-center">
                    <span class="Label mr-3">{i + 1}</span>
                    <img
                        src={user.avatarUrl}
                        alt=""
                        class="avatar mr-3"
                        width="32"
                        height="32"
                        loading="lazy"
                    />
                    <a href={user.url} class="Box-row-link mr-auto">
                        {user.name}
                    </a>
                    <span class="Counter">
                        {@html octicons["git-commit"].toSVG()}
                        {user.commits}
                    </span>
                </li>
            {/each}
        </ol>
    </div>
</main>

<pre>{dataString}</pre>
