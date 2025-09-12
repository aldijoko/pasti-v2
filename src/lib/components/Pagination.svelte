<script>
  import { page as pageStore } from '$app/stores';
  import { goto } from '$app/navigation';

  export let page = 1;        // current page (1-based)
  export let pageSize = 10;   // items per page
  export let total = 0;       // total items
  export let useLinks = true; // when true, render anchors; else use goto

  $: totalPages = Math.max(1, Math.ceil((total || 0) / (pageSize || 1)));
  $: safePage = Math.min(Math.max(1, Number(page) || 1), totalPages);

  function buildHref(target) {
    const url = new URL($pageStore.url.href);
    url.searchParams.set('page', String(target));
    url.searchParams.set('size', String(pageSize));
    return url.pathname + '?' + url.searchParams.toString();
  }

  function go(target) {
    const href = buildHref(target);
    goto(href, { keepfocus: true, noScroll: true, replaceState: true });
  }

  // Use Svelte store auto-subscription on alias
  $: $pageStore;
</script>

{#if totalPages > 1}
  <div class="flex flex-col sm:flex-row items-center justify-between gap-2">
    <p class="text-sm text-gray-500">Showing page {safePage} of {totalPages}</p>
    <div class="pagination">
      {#if useLinks}
        <a class="page-btn-icon disabled:opacity-50" aria-disabled={safePage === 1} href={safePage === 1 ? undefined : buildHref(safePage - 1)}>Prev</a>
        {#each Array(totalPages).fill(0).map((_, i) => i + 1) as p}
          <a class={`page-btn ${p === safePage ? 'page-btn-active' : ''}`} href={buildHref(p)}>{p}</a>
        {/each}
        <a class="page-btn-icon disabled:opacity-50" aria-disabled={safePage === totalPages} href={safePage === totalPages ? undefined : buildHref(safePage + 1)}>Next</a>
      {:else}
        <button class="page-btn-icon" on:click={() => go(safePage - 1)} disabled={safePage === 1}>Prev</button>
        {#each Array(totalPages).fill(0).map((_, i) => i + 1) as p}
          <button class={`page-btn ${p === safePage ? 'page-btn-active' : ''}`} on:click={() => go(p)}>{p}</button>
        {/each}
        <button class="page-btn-icon" on:click={() => go(safePage + 1)} disabled={safePage === totalPages}>Next</button>
      {/if}
    </div>
  </div>
{/if}
