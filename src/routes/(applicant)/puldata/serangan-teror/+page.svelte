<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const TABS = [
    { key: 'kejadian', label: 'Serangan Teror by Kejadian', perm: 'serangan.kejadian' },
    { key: 'orang', label: 'Serangan Teror by Orang', perm: 'serangan.orang' },
    { key: 'identifikasi', label: 'Identifikasi Target Teror', perm: 'serangan.identifikasi' }
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
  <title>Puldata - Serangan Teror</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Serangan Teror</h1>
    <p class="mt-1 text-sm text-gray-500">Analisis kejadian, pelaku, dan identifikasi target.</p>
  </div>

  <div class="border-b border-gray-200 bg-white rounded-t-lg">
    <nav class="-mb-px flex flex-wrap gap-x-6 gap-y-2 px-4 sm:px-6" aria-label="Tabs">
      {#if allowedTabs.length}
        {#each allowedTabs as tab}
          <button
            type="button"
            on:click={() => setTab(tab.key)}
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm {currentKey === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
            aria-current={currentKey === tab.key ? 'page' : undefined}
          >
            {tab.label}
          </button>
        {/each}
      {:else}
        <div class="py-4 text-sm text-gray-500">Anda tidak memiliki akses.</div>
      {/if}
    </nav>
  </div>

  {#if !allowedTabs.length}
    <div class="bg-white rounded-b-lg shadow p-6">
      <p class="text-gray-600">Hubungi administrator untuk mendapatkan akses.</p>
    </div>
  {:else}
    <div class="bg-white rounded-b-lg shadow p-4 sm:p-6 space-y-6">
      {#if currentKey === 'kejadian'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Serangan Teror by Kejadian</h2>
          <p class="text-sm text-gray-600">Ringkasan kejadian beserta lokasi dan modus.</p>
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Modus</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr>
                  <td class="px-4 py-2 text-sm text-gray-900">2025-09-01</td>
                  <td class="px-4 py-2 text-sm text-gray-700">Jakarta</td>
                  <td class="px-4 py-2 text-sm text-gray-700">Bom rakitan</td>
                  <td class="px-4 py-2 text-sm"><span class="rounded bg-yellow-100 px-2 py-0.5 text-yellow-800">Dalam proses</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      {/if}

      {#if currentKey === 'orang'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Serangan Teror by Orang</h2>
          <p class="text-sm text-gray-600">Daftar pelaku/tersangka dan jaringannya.</p>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-xs text-gray-500">Nama</div>
              <div class="mt-1 text-base font-semibold text-gray-900">Anon</div>
              <div class="mt-2 text-xs text-gray-500">Jaringan: —</div>
            </div>
          </div>
        </section>
      {/if}

      {#if currentKey === 'identifikasi'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Identifikasi Target Teror</h2>
          <p class="text-sm text-gray-600">Kandidat target berdasarkan pola ancaman.</p>
          <ul class="list-disc pl-6 text-sm text-gray-700 space-y-2">
            <li>Target sektor publik dengan kepadatan tinggi</li>
            <li>Infrastruktur kritikal (transportasi, energi)</li>
          </ul>
        </section>
      {/if}
    </div>
  {/if}
</div>

