<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  // Define tabs and required permissions
  const TABS = [
    { key: 'daftar', label: 'Daftar Laporan', perm: 'lapinfo.daftar' },
    { key: 'rekap-konten', label: 'Rekap Konten', perm: 'lapinfo.rekapkonten' },
    { key: 'rekap-medsos', label: 'Rekap Medsos', perm: 'lapinfo.rekapmedsos' },
    { key: 'rekap-nomorsurat', label: 'Rekap Nomor Surat', perm: 'lapinfo.rekapnomorsurat' },
    { key: 'khusus', label: 'Laporan Khusus', perm: 'lapinfo.khusus' },
    { key: 'takedown', label: 'Laporan Takedown', perm: 'lapinfo.takedown' },
    { key: 'takedownold', label: 'Laporan Takedown OLD', perm: 'lapinfo.takedownold' },
  ];

  // Read user and query params
  $: user = $page.data.user;
  $: userPerms = user?.permissions || [];
  $: allowedTabs = (user?.role === 'superadmin') ? TABS : TABS.filter(t => userPerms.includes(t.perm));
  $: currentKey = $page.url.searchParams.get('tab') || (allowedTabs[0]?.key || null);

  function setTab(key) {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('tab', key);
    goto(`?${params.toString()}`, { keepfocus: true, noScroll: true, replaceState: true });
  }
</script>

<svelte:head>
  <title>Laporan Temuan - Puldata</title>
  <meta name="description" content="Laporan temuan cyber patrol" />
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Laporan Temuan</h1>
    <p class="mt-1 text-sm text-gray-500">Kelola laporan hasil cyber patrol dan rekapitulasi.</p>
  </div>

  <!-- Tabs -->
  <div class="border-b border-gray-200 bg-white rounded-t-lg">
    <nav class="-mb-px flex flex-wrap gap-x-6 gap-y-2 px-4 sm:px-6" aria-label="Tabs">
      {#if allowedTabs.length}
        {#each allowedTabs as tab}
          <button
            type="button"
            on:click={() => setTab(tab.key)}
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              {currentKey === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
            aria-current={currentKey === tab.key ? 'page' : undefined}
          >
            {tab.label}
          </button>
        {/each}
      {:else}
        <div class="py-4 text-sm text-gray-500">Anda tidak memiliki akses ke menu ini.</div>
      {/if}
    </nav>
  </div>

  <!-- Panels -->
  {#if !allowedTabs.length}
    <div class="bg-white rounded-b-lg shadow p-6">
      <p class="text-gray-600">Hubungi administrator untuk mendapatkan akses yang diperlukan.</p>
    </div>
  {:else}
    <div class="bg-white rounded-b-lg shadow p-4 sm:p-6">
      {#if currentKey === 'daftar'}
        <section class="space-y-4">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Daftar Laporan</h2>
              <p class="text-sm text-gray-500">Ringkasan laporan temuan terbaru.</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <input type="text" placeholder="Cari..." class="w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              <button type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Tambah Laporan</button>
            </div>
          </div>
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sumber</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr><td class="px-4 py-2 text-sm text-gray-900">2025-09-01</td><td class="px-4 py-2 text-sm text-gray-600">Twitter</td><td class="px-4 py-2 text-sm text-gray-600">Propaganda</td><td class="px-4 py-2 text-sm"><span class="rounded bg-yellow-100 px-2 py-0.5 text-yellow-800">Review</span></td></tr>
                <tr><td class="px-4 py-2 text-sm text-gray-900">2025-08-29</td><td class="px-4 py-2 text-sm text-gray-600">Facebook</td><td class="px-4 py-2 text-sm text-gray-600">Rekrutmen</td><td class="px-4 py-2 text-sm"><span class="rounded bg-green-100 px-2 py-0.5 text-green-800">Selesai</span></td></tr>
              </tbody>
            </table>
          </div>
        </section>
      {/if}

      {#if currentKey === 'rekap-konten'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Rekap Konten</h2>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-xs text-gray-500">Total Konten</div>
              <div class="mt-1 text-2xl font-bold text-gray-900">1,234</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-xs text-gray-500">Propaganda</div>
              <div class="mt-1 text-2xl font-bold text-gray-900">345</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-xs text-gray-500">Rekrutmen</div>
              <div class="mt-1 text-2xl font-bold text-gray-900">212</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-xs text-gray-500">Ancaman</div>
              <div class="mt-1 text-2xl font-bold text-gray-900">68</div>
            </div>
          </div>
        </section>
      {/if}

      {#if currentKey === 'rekap-medsos'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Rekap Medsos</h2>
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Temuan</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Takedown</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr><td class="px-4 py-2 text-sm text-gray-900">Twitter</td><td class="px-4 py-2 text-sm text-gray-600">503</td><td class="px-4 py-2 text-sm text-gray-600">120</td></tr>
                <tr><td class="px-4 py-2 text-sm text-gray-900">Facebook</td><td class="px-4 py-2 text-sm text-gray-600">420</td><td class="px-4 py-2 text-sm text-gray-600">95</td></tr>
                <tr><td class="px-4 py-2 text-sm text-gray-900">YouTube</td><td class="px-4 py-2 text-sm text-gray-600">136</td><td class="px-4 py-2 text-sm text-gray-600">44</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      {/if}

      {#if currentKey === 'rekap-nomorsurat'}
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

      {#if currentKey === 'khusus'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Laporan Khusus</h2>
          <div class="bg-gray-50 border border-gray-200 rounded-md p-4">
            <p class="text-sm text-gray-700">Tempat untuk laporan khusus/insidentil. Silakan gunakan filter untuk mempersempit pencarian.</p>
          </div>
        </section>
      {/if}

      {#if currentKey === 'takedown'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Laporan Takedown</h2>
          <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800">
            Fitur ini menampilkan daftar permintaan takedown dan statusnya.
          </div>
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr><td class="px-4 py-2 text-sm text-gray-900">2025-08-30</td><td class="px-4 py-2 text-sm text-gray-600">YouTube</td><td class="px-4 py-2 text-sm"><span class="rounded bg-blue-100 px-2 py-0.5 text-blue-800">Proses</span></td></tr>
                <tr><td class="px-4 py-2 text-sm text-gray-900">2025-08-25</td><td class="px-4 py-2 text-sm text-gray-600">TikTok</td><td class="px-4 py-2 text-sm"><span class="rounded bg-green-100 px-2 py-0.5 text-green-800">Selesai</span></td></tr>
              </tbody>
            </table>
          </div>
        </section>
      {/if}

      {#if currentKey === 'takedownold'}
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Laporan Takedown OLD</h2>
          <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800">
            Fitur ini menampilkan daftar permintaan takedown versi lama.
          </div>
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr><td class="px-4 py-2 text-sm text-gray-900">2025-08-30</td><td class="px-4 py-2 text-sm text-gray-600">YouTube</td><td class="px-4 py-2 text-sm"><span class="rounded bg-blue-100 px-2 py-0.5 text-blue-800">Proses</span></td></tr>
                <tr><td class="px-4 py-2 text-sm text-gray-900">2025-08-25</td><td class="px-4 py-2 text-sm text-gray-600">TikTok</td><td class="px-4 py-2 text-sm"><span class="rounded bg-green-100 px-2 py-0.5 text-green-800">Selesai</span></td></tr>
              </tbody>
            </table>
          </div>
        </section>
      {/if}


      
    </div>
  {/if}
</div>

<style>
  /* Keep styles minimal; Tailwind handles layout/responsiveness */
</style>
