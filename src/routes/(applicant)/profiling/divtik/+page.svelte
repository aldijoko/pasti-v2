<script >
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  let activeTab = 'nopol-eri';
  let searchQuery = '';
  let searchResults = [];
  let isLoading = false;

  const tabs = [
    { id: 'nopol-eri', name: 'Nopol By Eri', icon: '🚗', description: 'Pencarian nomor polisi via ERI' },
    { id: 'sim-license', name: 'SIM [By License]', icon: '🪪', description: 'Cari SIM berdasarkan nomor' },
    { id: 'sim-name', name: 'SIM [By Name]', icon: '🧑‍💼', description: 'Cari SIM berdasarkan nama' },
    { id: 'license', name: 'License', icon: '📄', description: 'Informasi kategori lisensi berkendara' },
    { id: 'history', name: 'History', icon: '📋', description: 'Riwayat pencarian dan transaksi' }
  ];

  const mockData = {
    'nopol-eri': [
      { id: 1, nopol: 'B 1234 ABC', jenis: 'Mobil', merk: 'Toyota', model: 'Avanza', tahun: '2020', status: 'Aktif' },
      { id: 2, nopol: 'B 5678 DEF', jenis: 'Motor', merk: 'Honda', model: 'Vario', tahun: '2019', status: 'Aktif' }
    ],
    'sim-license': [
      { id: 1, nomor: '1234567890', nama: 'John Doe', jenis: 'A', berlaku: '2025-12-31', status: 'Aktif' },
      { id: 2, nomor: '0987654321', nama: 'Jane Smith', jenis: 'B1', berlaku: '2026-06-30', status: 'Aktif' }
    ],
    'sim-name': [
      { id: 1, nomor: '2233445566', nama: 'Budi Santoso', jenis: 'C', berlaku: '2026-01-10', status: 'Aktif' },
      { id: 2, nomor: '6677889900', nama: 'Siti Aminah', jenis: 'A', berlaku: '2027-03-15', status: 'Aktif' }
    ],
    license: [
      { id: 1, kategori: 'SIM A', deskripsi: 'Kendaraan roda 4 pribadi', masa: '5 tahun' },
      { id: 2, kategori: 'SIM C', deskripsi: 'Sepeda motor', masa: '5 tahun' }
    ]
  };

  // Sync active tab with ?tab
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

  function handleSearch() {
    if (!searchQuery.trim()) return;
    
    isLoading = true;
    // Simulate API call
    setTimeout(() => {
      isLoading = false;
      searchResults = (mockData)[activeTab] || [];
    }, 1000);
  }

  function clearSearch() {
    searchQuery = '';
    searchResults = [];
  }

  function exportData() {
    alert('Export data functionality will be implemented here');
  }
</script>

<svelte:head>
  <title>DIVTIK - PASTI</title>
</svelte:head>

  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">DIVTIK - Direktorat Lalu Lintas</h1>
      <p class="mt-1 text-sm text-gray-500">
        Sistem informasi lalu lintas dan kendaraan bermotor.
      </p>
    </div>

    <!-- Tab Navigation -->
    <div class="bg-white shadow rounded-lg">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {#each tabs as tab}
            <button
              on:click={() => setTab(tab.id)}
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm {activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
            >
              <span class="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          {/each}
        </nav>
      </div>

      <div class="p-6">
        <!-- Tab Content -->
        {#if activeTab === 'nopol-eri'}
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Pencarian Nomor Polisi</h3>
                <p class="text-sm text-gray-500">Cari informasi kendaraan berdasarkan nomor polisi</p>
              </div>
              <button
                on:click={exportData}
                class="btn btn-success"
              >
                Export Data
              </button>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="sm:col-span-2">
                <label for="search" class="block text-sm font-medium text-gray-700">Nomor Polisi</label>
                <input
                  type="text"
                  id="search"
                  bind:value={searchQuery}
                  placeholder="Contoh: B 1234 ABC"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div class="flex items-end space-x-3">
                <button
                  on:click={handleSearch}
                  disabled={isLoading || !searchQuery.trim()}
                  class="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {#if isLoading}
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  {/if}
                  Cari
                </button>
                <button
                  on:click={clearSearch}
                  class="btn btn-outline"
                >
                  Clear
                </button>
              </div>
            </div>

            {#if searchResults.length > 0}
              <div class="bg-white shadow rounded-lg overflow-hidden">
                <table class="table">
                  <thead class="table-head">
                    <tr>
                      <th class="th">Nopol</th>
                      <th class="th">Jenis</th>
                      <th class="th">Merk/Model</th>
                      <th class="th">Tahun</th>
                      <th class="th">Status</th>
                    </tr>
                  </thead>
                  <tbody class="tbody">
                    {#each searchResults as result}
                      <tr class="hover:bg-gray-50">
                        <td class="td text-gray-900">{result.nopol}</td>
                        <td class="td">{result.jenis}</td>
                        <td class="td">{result.merk} {result.model}</td>
                        <td class="td">{result.tahun}</td>
                        <td class="td">
                          <span class="badge badge-green">
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            {/if}
          </div>

        {:else if activeTab === 'sim-license'}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">SIM [By License]</h3>
            <p class="text-sm text-gray-500">Cari SIM berdasarkan nomor lisensi</p>
            
            <div class="bg-white shadow rounded-lg overflow-hidden">
              <table class="table">
                <thead class="table-head">
                  <tr>
                    <th class="th">No. SIM</th>
                    <th class="th">Nama</th>
                    <th class="th">Jenis</th>
                    <th class="th">Berlaku</th>
                    <th class="th">Status</th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  {#each mockData['sim-license'] as result}
                    <tr class="hover:bg-gray-50">
                      <td class="td text-gray-900">{result.nomor}</td>
                      <td class="td">{result.nama}</td>
                      <td class="td">{result.jenis}</td>
                      <td class="td">{result.berlaku}</td>
                      <td class="td">{result.status}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>

        {:else if activeTab === 'sim-name'}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">SIM [By Name]</h3>
            <p class="text-sm text-gray-500">Cari SIM berdasarkan nama</p>
            
            <div class="bg-white shadow rounded-lg overflow-hidden">
              <table class="table">
                <thead class="table-head">
                  <tr>
                    <th class="th">Nomor SIM</th>
                    <th class="th">Nama</th>
                    <th class="th">Jenis</th>
                    <th class="th">Berlaku</th>
                    <th class="th">Status</th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  {#each mockData['sim-name'] as result}
                    <tr class="hover:bg-gray-50">
                      <td class="td text-gray-900">{result.nomor}</td>
                      <td class="td text-gray-900">{result.nama}</td>
                      <td class="td">{result.jenis}</td>
                      <td class="td">{result.berlaku}</td>
                      <td class="td">
                        <span class="badge badge-green">
                          {result.status}
                        </span>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>

        {:else if activeTab === 'license'}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">License</h3>
            <p class="text-sm text-gray-500">Informasi kategori lisensi berkendara</p>

            <div class="bg-white shadow rounded-lg overflow-hidden">
              <table class="table">
                <thead class="table-head">
                  <tr>
                    <th class="th">Kategori</th>
                    <th class="th">Deskripsi</th>
                    <th class="th">Masa Berlaku</th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  {#each mockData.license as l}
                    <tr>
                      <td class="td text-gray-900">{l.kategori}</td>
                      <td class="td">{l.deskripsi}</td>
                      <td class="td">{l.masa}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>

        {:else if activeTab === 'history'}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Riwayat Pencarian</h3>
            <p class="text-sm text-gray-500">Riwayat pencarian dan transaksi DIVTIK</p>
            
            <div class="bg-white shadow rounded-lg p-6 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 00-2 2v2h2V5z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Belum ada riwayat</h3>
              <p class="mt-1 text-sm text-gray-500">Riwayat pencarian akan muncul di sini setelah Anda melakukan pencarian.</p>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-4">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Kendaraan</dt>
                <dd class="text-lg font-medium text-gray-900">45,234</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Pelanggaran ETLE</dt>
                <dd class="text-lg font-medium text-gray-900">1,234</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">SIM Aktif</dt>
                <dd class="text-lg font-medium text-gray-900">89,456</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Update Terakhir</dt>
                <dd class="text-lg font-medium text-gray-900">2 jam lalu</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
