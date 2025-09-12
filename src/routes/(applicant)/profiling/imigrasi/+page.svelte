<script >
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  let activeTab = 'paspor';
  let searchQuery = '';
  let searchResults = [];
  let isLoading = false;

  const tabs = [
    { id: 'paspor', name: 'Paspor', icon: '🛂', description: 'Informasi paspor' },
    { id: 'wna', name: 'WNA', icon: '🌍', description: 'Data Warga Negara Asing' },
    { id: 'perlintasan', name: 'Perlintasan', icon: '🚶', description: 'Data perlintasan perbatasan' }
  ];

  const mockData = {
    paspor: [
      { id: 1, passportNo: 'A1234567', name: 'John Doe', nationality: 'Indonesia', type: 'Regular', expiry: '2025-12-31', status: 'Valid' },
      { id: 2, passportNo: 'B9876543', name: 'Jane Smith', nationality: 'Indonesia', type: 'Diplomatic', expiry: '2026-06-30', status: 'Valid' }
    ],
    wna: [
      { id: 1, name: 'Michael Chan', nationality: 'Singapore', passport: 'E1122334', visa: 'Business', expiry: '2026-05-10' },
      { id: 2, name: 'Sara Kim', nationality: 'Korea', passport: 'K5566778', visa: 'Tourist', expiry: '2025-09-22' }
    ],
    perlintasan: [
      { id: 1, name: 'John Doe', passport: 'A1234567', border: 'Soekarno-Hatta', date: '2024-01-15', direction: 'Outbound', purpose: 'Business' },
      { id: 2, name: 'Jane Smith', passport: 'B9876543', border: 'Ngurah Rai', date: '2024-01-14', direction: 'Inbound', purpose: 'Tourism' }
    ],
    intal: [
      { id: 1, name: 'John Doe', passport: 'A1234567', risk: 'Low', alert: 'None', lastUpdate: '2024-01-15', status: 'Clear' },
      { id: 2, name: 'Jane Smith', passport: 'B9876543', risk: 'Medium', alert: 'Watch List', lastUpdate: '2024-01-14', status: 'Under Review' }
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
  <title>Imigrasi - PASTI</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page Header -->
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Imigrasi - Direktorat Jenderal Imigrasi</h1>
    <p class="mt-1 text-sm text-gray-500">
      Sistem informasi keimigrasian dan perbatasan.
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
      {#if activeTab === 'paspor'}
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Informasi Paspor</h3>
              <p class="text-sm text-gray-500">Cari informasi paspor</p>
            </div>
            <button
              on:click={exportData}
              class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Export Data
            </button>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="sm:col-span-2">
              <label for="search" class="block text-sm font-medium text-gray-700">Nomor Paspor</label>
              <input
                type="text"
                id="search"
                bind:value={searchQuery}
                placeholder="Masukkan nomor paspor"
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
                    <th class="th">No. Paspor</th>
                    <th class="th">Nama</th>
                    <th class="th">Kewarganegaraan</th>
                    <th class="th">Tipe</th>
                    <th class="th">Berlaku</th>
                    <th class="th">Status</th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  {#each searchResults as result}
                    <tr class="hover:bg-gray-50">
                      <td class="td text-gray-900">{result.passportNo}</td>
                      <td class="td text-gray-900">{result.name}</td>
                      <td class="td">{result.nationality}</td>
                      <td class="td">{result.type}</td>
                      <td class="td">{result.expiry}</td>
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

      {:else if activeTab === 'wna'}
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Data WNA</h3>
              <p class="text-sm text-gray-500">Daftar Warga Negara Asing</p>
            </div>
          </div>
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="table">
              <thead class="table-head">
                <tr>
                  <th class="th">Nama</th>
                  <th class="th">Kewarganegaraan</th>
                  <th class="th">No. Paspor</th>
                  <th class="th">Visa</th>
                  <th class="th">Masa Berlaku</th>
                </tr>
              </thead>
              <tbody class="tbody">
                {#each mockData.wna as r}
                  <tr>
                    <td class="td text-gray-900">{r.name}</td>
                    <td class="td">{r.nationality}</td>
                    <td class="td">{r.passport}</td>
                    <td class="td">{r.visa}</td>
                    <td class="td">{r.expiry}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>

      {:else if activeTab === 'perlintasan'}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Data Perlintasan Perbatasan</h3>
          <p class="text-sm text-gray-500">Informasi perlintasan di perbatasan negara</p>
          
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="table">
              <thead class="table-head">
                <tr>
                  <th class="th">Nama</th>
                  <th class="th">Passport</th>
                  <th class="th">Perbatasan</th>
                  <th class="th">Tanggal</th>
                  <th class="th">Arah</th>
                  <th class="th">Tujuan</th>
                </tr>
              </thead>
              <tbody class="tbody">
                {#each mockData.perlintasan as result}
                  <tr class="hover:bg-gray-50">
                    <td class="td text-gray-900">{result.name}</td>
                    <td class="td">{result.passport}</td>
                    <td class="td">{result.border}</td>
                    <td class="td">{result.date}</td>
                    <td class="td">
                      <span class="badge {result.direction === 'Outbound' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                        {result.direction}
                      </span>
                    </td>
                    <td class="td">{result.purpose}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">Total Passport</dt>
              <dd class="text-lg font-medium text-gray-900">234,567</dd>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">Perlintasan Hari Ini</dt>
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
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">High Risk</dt>
              <dd class="text-lg font-medium text-gray-900">89</dd>
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
              <dd class="text-lg font-medium text-gray-900">30 menit lalu</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      <!-- {:else if activeTab === 'wna'}
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Data WNA</h3>
              <p class="text-sm text-gray-500">Daftar Warga Negara Asing</p>
            </div>
          </div>
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kewarganegaraan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Paspor</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Masa Berlaku</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each mockData.wna as r}
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.nationality}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.passport}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.visa}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.expiry}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      {/if} -->
