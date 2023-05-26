<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="blankslate">
    <h2 class="blankslate-heading">
        {$page.status}
    </h2>
    <p>
        {$page.error?.message}
    </p>
</div>