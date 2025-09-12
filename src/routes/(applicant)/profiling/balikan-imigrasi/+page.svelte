<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  const TABS = [
    { id: 'ftf', name: 'Balikan FTF' },
    { id: 'napi', name: 'Balikan Napi' },
    { id: 'eksnapiter', name: 'Balikan Eksnapiter' },
    { id: 'dttot', name: 'Balikan DTTOT' },
    { id: 'tersangka', name: 'Balikan Tersangka' }
  ];
  let activeTab = 'ftf';
  $: page.subscribe(($page) => {
    const t = $page.url.searchParams.get('tab');
    if (t) activeTab = t;
  });
  function setTab(id) {
    activeTab = id;
    const params = new URLSearchParams($page.url.searchParams);
    params.set('tab', id);
    goto(`?${params.toString()}`, { keepfocus: true, noScroll: true, replaceState: true });
  }
</script>

<svelte:head>
  <title>Profiling - Balikan Imigrasi</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Balikan Imigrasi</h1>
    <p class="mt-1 text-sm text-gray-500">Data balikan FTF, Napi, Eksnapiter, DTTOT, dan Tersangka.</p>
  </div>

  <div class="bg-white shadow rounded-lg">
    <nav class="-mb-px flex space-x-8 px-6 border-b border-gray-200" aria-label="Tabs">
      {#each TABS as tab}
        <button type="button" on:click={() => setTab(tab.id)} class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm {activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}">{tab.name}</button>
      {/each}
    </nav>
    <div class="p-6">
      {#if activeTab === 'ftf'}
        <div class="space-y-3">
          <h2 class="text-lg font-semibold text-gray-900">Balikan FTF</h2>
          <p class="text-sm text-gray-500">Daftar pemulangan Foreign Terrorist Fighters.</p>
          <div class="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50"><tr><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Negara Asal</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Balik</th></tr></thead>
              <tbody class="divide-y divide-gray-200 bg-white"><tr><td class="px-4 py-2 text-sm text-gray-900">—</td><td class="px-4 py-2 text-sm text-gray-700">—</td><td class="px-4 py-2 text-sm text-gray-700">—</td></tr></tbody>
            </table>
          </div>
        </div>
      {:else if activeTab === 'napi'}
        <div class="space-y-3">
          <h2 class="text-lg font-semibold text-gray-900">Balikan Napi</h2>
          <p class="text-sm text-gray-500">Daftar pemulangan narapidana.</p>
          <div class="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50"><tr><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">No. Reg</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th></tr></thead>
              <tbody class="divide-y divide-gray-200 bg-white"><tr><td class="px-4 py-2 text-sm text-gray-900">—</td><td class="px-4 py-2 text-sm text-gray-700">—</td><td class="px-4 py-2 text-sm text-gray-700">—</td></tr></tbody>
            </table>
          </div>
        </div>
      {:else if activeTab === 'eksnapiter'}
        <div class="space-y-3">
          <h2 class="text-lg font-semibold text-gray-900">Balikan Eksnapiter</h2>
          <p class="text-sm text-gray-500">Daftar pemulangan eks narapidana teror.</p>
          <div class="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50"><tr><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th></tr></thead>
              <tbody class="divide-y divide-gray-200 bg-white"><tr><td class="px-4 py-2 text-sm text-gray-900">—</td><td class="px-4 py-2 text-sm text-gray-700">—</td><td class="px-4 py-2 text-sm text-gray-700">—</td></tr></tbody>
            </table>
          </div>
        </div>
      {:else if activeTab === 'dttot'}
        <div class="space-y-3">
          <h2 class="text-lg font-semibold text-gray-900">Balikan DTTOT</h2>
          <p class="text-sm text-gray-500">Daftar pemulangan DTTOT.</p>
          <div class="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50"><tr><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Organisasi</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th></tr></thead>
              <tbody class="divide-y divide-gray-200 bg-white"><tr><td class="px-4 py-2 text-sm text-gray-900">—</td><td class="px-4 py-2 text-sm text-gray-700">—</td><td class="px-4 py-2 text-sm text-gray-700">—</td></tr></tbody>
            </table>
          </div>
        </div>
      {:else if activeTab === 'tersangka'}
        <div class="space-y-3">
          <h2 class="text-lg font-semibold text-gray-900">Balikan Tersangka</h2>
          <p class="text-sm text-gray-500">Daftar pemulangan tersangka teror.</p>
          <div class="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50"><tr><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kasus</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th></tr></thead>
              <tbody class="divide-y divide-gray-200 bg-white"><tr><td class="px-4 py-2 text-sm text-gray-900">—</td><td class="px-4 py-2 text-sm text-gray-700">—</td><td class="px-4 py-2 text-sm text-gray-700">—</td></tr></tbody>
            </table>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

