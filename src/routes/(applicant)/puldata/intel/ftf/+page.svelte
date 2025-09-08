<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const TABS = [
    { key: 'daftar', label: 'Daftar', perm: 'intel.ftf.daftar' },
    { key: 'rekap', label: 'Rekap', perm: 'intel.ftf.rekap' },
    { key: 'history', label: 'History', perm: 'intel.ftf.history' }
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
  <title>Intel - FTF</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Intel - FTF</h1>
    <p class="mt-1 text-sm text-gray-500">Foreign Terrorist Fighters.</p>
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
      {#if currentKey === 'daftar'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Daftar FTF</h2>
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50"><tr><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Negara</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr><td class="px-4 py-2 text-sm text-gray-900">A. Rahman</td><td class="px-4 py-2 text-sm text-gray-700">SY</td><td class="px-4 py-2 text-sm"><span class="rounded bg-yellow-100 px-2 py-0.5 text-yellow-800">Monitor</span></td></tr>
              </tbody>
            </table>
          </div>
        </section>
      {/if}

      {#if currentKey === 'rekap'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Rekap FTF</h2>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="bg-gray-50 rounded-lg p-4"><div class="text-xs text-gray-500">Total</div><div class="mt-1 text-2xl font-bold text-gray-900">45</div></div>
            <div class="bg-gray-50 rounded-lg p-4"><div class="text-xs text-gray-500">Monitor</div><div class="mt-1 text-2xl font-bold text-gray-900">12</div></div>
            <div class="bg-gray-50 rounded-lg p-4"><div class="text-xs text-gray-500">Aman</div><div class="mt-1 text-2xl font-bold text-gray-900">28</div></div>
          </div>
        </section>
      {/if}

      {#if currentKey === 'history'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">History Akses</h2>
          <ul class="list-disc pl-6 text-sm text-gray-700 space-y-2">
            <li>2025-08-30 14:22 - superadmin melihat daftar</li>
          </ul>
        </section>
      {/if}
    </div>
  {/if}

</div>

