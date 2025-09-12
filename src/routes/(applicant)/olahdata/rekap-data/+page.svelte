<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const TABS = [
    { key: 'konten', label: 'Rekap Konten', perm: 'olahdata.rekap.konten' },
    { key: 'medsos', label: 'Rekap Medsos', perm: 'olahdata.rekap.medsos' },
    { key: 'nomor-surat', label: 'Rekap Nomor Surat', perm: 'olahdata.rekap.nomorsurat' }
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
  <title>Olahdata - Rekap Data</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Rekap Data</h1>
    <p class="mt-1 text-sm text-gray-500">Ringkasan data konten, medsos, dan nomor surat.</p>
  </div>

  <div class="bg-white shadow rounded-lg">
    <nav class="-mb-px flex space-x-8 px-6 border-b border-gray-200" aria-label="Tabs">
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
    <div class="bg-white rounded-lg shadow p-4 sm:p-6">
      {#if currentKey === 'konten'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Rekap Konten</h2>
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr><td class="px-4 py-2 text-sm text-gray-900">2025-08-31</td><td class="px-4 py-2 text-sm text-gray-600">Propaganda</td><td class="px-4 py-2 text-sm text-gray-600">123</td></tr>
                <tr><td class="px-4 py-2 text-sm text-gray-900">2025-08-31</td><td class="px-4 py-2 text-sm text-gray-600">Rekrutmen</td><td class="px-4 py-2 text-sm text-gray-600">45</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      {/if}

      {#if currentKey === 'medsos'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Rekap Medsos</h2>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="bg-gray-50 rounded-lg p-4"><div class="text-xs text-gray-500">Twitter</div><div class="mt-1 text-2xl font-bold text-gray-900">120</div></div>
            <div class="bg-gray-50 rounded-lg p-4"><div class="text-xs text-gray-500">Facebook</div><div class="mt-1 text-2xl font-bold text-gray-900">80</div></div>
            <div class="bg-gray-50 rounded-lg p-4"><div class="text-xs text-gray-500">YouTube</div><div class="mt-1 text-2xl font-bold text-gray-900">56</div></div>
          </div>
        </section>
      {/if}

      {#if currentKey === 'nomor-surat'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Rekap Nomor Surat</h2>
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nomor Surat</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Jumlah Takedown</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr><td class="px-4 py-2 text-sm text-gray-900">123/ABC/2025</td><td class="px-4 py-2 text-sm text-gray-600">2025-08-15</td><td class="px-4 py-2 text-sm text-gray-600">50</td></tr>
                <tr><td class="px-4 py-2 text-sm text-gray-900">456/DEF/2025</td><td class="px-4 py-2 text-sm text-gray-600">2025-08-20</td><td class="px-4 py-2 text-sm text-gray-600">30</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      {/if}
    </div>
  {/if}
</div>
