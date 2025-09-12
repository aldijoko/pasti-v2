<script >
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  let activeTab = 'v2-nik';
  let searchQuery = '';
  let searchResults = [];
  let isLoading = false;

  const tabs = [
    { id: 'v2-nik', name: '[V2]Pencarian NIK', icon: '🆔', description: 'Pencarian NIK versi 2' },
    { id: 'v2-kombinasi', name: '[V2]Pencarian Kombinasi', icon: '🔎', description: 'Pencarian kombinasi multi parameter' },
    { id: 'fr', name: 'Face Recognation', icon: '👤', description: 'Pencocokan wajah ke data' },
    { id: 'verifikasi-ektp', name: 'Verifikasi EKTP', icon: '✅', description: 'Verifikasi data EKTP' },
    { id: 'v1-nik', name: '[V1]Pencarian NIK', icon: '🆔', description: 'Pencarian NIK versi 1 (legacy)' }
  ];

  const mockData = {
    'v2-nik': [
      { id: 1, nik: '3171234567890123', name: 'John Doe', placeOfBirth: 'Jakarta', dateOfBirth: '1990-05-15', address: 'Jl. Sudirman No. 123', status: 'Active' },
      { id: 2, nik: '3171234567890124', name: 'Jane Smith', placeOfBirth: 'Bandung', dateOfBirth: '1992-08-20', address: 'Jl. Thamrin No. 456', status: 'Active' }
    ]
  };

  // Sync active tab with ?tab param
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
</script>

<svelte:head>
  <title>Kependudukan - PASTI</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page Header -->
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Kependudukan - Direktorat Jenderal Kependudukan</h1>
    <p class="mt-1 text-sm text-gray-500">
      Sistem informasi kependudukan dan pencatatan sipil.
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
      {#if activeTab === 'v2-nik'}
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-medium text-gray-900">[V2] Pencarian NIK</h3>
            <p class="text-sm text-gray-500">Cari data penduduk berdasarkan Nomor Induk Kependudukan (versi 2)</p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="sm:col-span-2">
              <label for="search" class="block text-sm font-medium text-gray-700">Nomor NIK</label>
              <input
                type="text"
                id="search"
                bind:value={searchQuery}
                placeholder="Masukkan 16 digit NIK"
                maxlength="16"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p class="mt-1 text-xs text-gray-500">Contoh: 3171234567890123</p>
            </div>
            <div class="flex items-end space-x-3">
              <button
                on:click={handleSearch}
                disabled={isLoading || !searchQuery.trim() || searchQuery.length !== 16}
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Clear
              </button>
            </div>
          </div>

          {#if searchResults.length > 0}
            <div class="bg-white shadow rounded-lg overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat Lahir</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {#each searchResults as result}
                    <tr class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.nik}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.name}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.placeOfBirth}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.dateOfBirth}</td>
                      <td class="px-6 py-4 text-sm text-gray-500">{result.address}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
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

      {:else if activeTab === 'v2-kombinasi'}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">[V2] Pencarian Kombinasi</h3>
          <p class="text-sm text-gray-500">Cari berdasarkan kombinasi parameter (NIK / Nama / Tgl Lahir)</p>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">NIK (opsional)</label>
              <input class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="16 digit" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama (opsional)</label>
              <input class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Nama lengkap" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tanggal Lahir (opsional)</label>
              <input type="date" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Cari</button>
          </div>
        </div>

      {:else if activeTab === 'fr'}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Face Recognation</h3>
          <p class="text-sm text-gray-500">Unggah foto wajah untuk pencocokan terhadap database</p>
          <div class="bg-white shadow rounded-lg p-6 space-y-3">
            <input type="file" accept="image/*" class="block w-full text-sm text-gray-600" />
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Proses</button>
          </div>
        </div>

      {:else if activeTab === 'verifikasi-ektp'}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Verifikasi EKTP</h3>
          <p class="text-sm text-gray-500">Verifikasi keaslian dan kecocokan data EKTP</p>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">NIK</label>
              <input class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Masukkan NIK" />
            </div>
            <div class="flex items-end">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Verifikasi</button>
            </div>
          </div>
        </div>

      {:else if activeTab === 'v1-nik'}
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-medium text-gray-900">[V1] Pencarian NIK</h3>
            <p class="text-sm text-gray-500">Versi lama pencarian NIK (kompatibilitas)</p>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Nomor NIK</label>
              <input class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="16 digit" maxlength="16" />
            </div>
            <div class="flex items-end space-x-3">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Cari</button>
              <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Clear</button>
            </div>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">Total Penduduk</dt>
              <dd class="text-lg font-medium text-gray-900">267.7M</dd>
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
              <dt class="text-sm font-medium text-gray-500 truncate">NIK Aktif</dt>
              <dd class="text-lg font-medium text-gray-900">265.2M</dd>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">KK Terdaftar</dt>
              <dd class="text-lg font-medium text-gray-900">67.8M</dd>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">Last Update</dt>
              <dd class="text-lg font-medium text-gray-900">1 jam lalu</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
