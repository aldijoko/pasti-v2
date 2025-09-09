<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const TABS = [
    { key: 'exist', label: 'Penangkapan', perm: 'intel.penangkapan.exist' },
    { key: 'new', label: 'Penangkapan Baru', perm: 'intel.penangkapan.new' },
    // { key: 'history', label: 'History', perm: 'intel.penangkapan.history' }
  ];

  $: user = $page.data.user;
  $: perms = user?.permissions || [];
  $: allowedTabs = (user?.role === 'superadmin') ? TABS : TABS.filter(t => perms.includes(t.perm));
  $: currentKey = $page.url.searchParams.get('tab') || (allowedTabs[0]?.key || null);

  function setTab(key) {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('tab', key);
    goto(`?${params.toString()}`, { keepfocus: true, noScroll: true, replaceState: true });
  }
</script>

<svelte:head>
  <title>Intel - Penangkapan</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Intel - Penangkapan</h1>
    <p class="mt-1 text-sm text-gray-500">Data penangkapan terkait.</p>
  </div>

  <div class="border-b border-gray-200 bg-white rounded-t-lg">
    <nav class="-mb-px flex flex-wrap gap-x-6 gap-y-2 px-4 sm:px-6" aria-label="Tabs">
      {#if allowedTabs.length}
        {#each allowedTabs as tab}
          <button type="button" on:click={() => setTab(tab.key)} class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm {currentKey === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" aria-current={currentKey === tab.key ? 'page' : undefined}>{tab.label}</button>
        {/each}
      {:else}
        <div class="py-4 text-sm text-gray-500">Anda tidak memiliki akses.</div>
      {/if}
    </nav>
  </div>

  {#if !allowedTabs.length}
    <div class="bg-white rounded-b-lg shadow p-6"><p class="text-gray-600">Hubungi administrator untuk mendapatkan akses.</p></div>
  {:else}
    <div class="bg-white rounded-b-lg shadow p-4 sm:p-6">
      {#if currentKey === 'exist'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Penangkapan</h2>
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50"><tr><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th></tr></thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr><td class="px-4 py-2 text-sm text-gray-900">2025-08-20</td><td class="px-4 py-2 text-sm text-gray-700">D. Akbar</td><td class="px-4 py-2 text-sm text-gray-700">Jakarta</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      {/if}

      {#if currentKey === 'new'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Penangkapan Baru</h2>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="bg-gray-50 rounded-lg p-4"><div class="text-xs text-gray-500">Total</div><div class="mt-1 text-2xl font-bold text-gray-900">72</div></div>
            <div class="bg-gray-50 rounded-lg p-4"><div class="text-xs text-gray-500">Bulan Ini</div><div class="mt-1 text-2xl font-bold text-gray-900">6</div></div>
            <div class="bg-gray-50 rounded-lg p-4"><div class="text-xs text-gray-500">Tahun Ini</div><div class="mt-1 text-2xl font-bold text-gray-900">39</div></div>
          </div>
        </section>
      {/if}
    </div>
  {/if}
</div>

