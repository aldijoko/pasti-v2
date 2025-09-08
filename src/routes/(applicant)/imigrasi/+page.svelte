<script >
  
  let activeTab = 'passport';
  let searchQuery = '';
  let searchResults = [];
  let isLoading = false;

  const tabs = [
    { id: 'passport', name: 'Passport', icon: '🛂', description: 'Informasi paspor dan visa' },
    { id: 'perlintasan', name: 'Perlintasan', icon: '🚶', description: 'Data perlintasan perbatasan' },
    { id: 'intal', name: 'INTAL', icon: '📋', description: 'Sistem informasi intelijen' },
    { id: 'balikan', name: 'Balikan', icon: '↩️', description: 'Data pemulangan TKI' },
    { id: 'history', name: 'History', icon: '📊', description: 'Riwayat pencarian' }
  ];

  const mockData = {
    passport: [
      { id: 1, passportNo: 'A1234567', name: 'John Doe', nationality: 'Indonesia', type: 'Regular', expiry: '2025-12-31', status: 'Valid' },
      { id: 2, passportNo: 'B9876543', name: 'Jane Smith', nationality: 'Indonesia', type: 'Diplomatic', expiry: '2026-06-30', status: 'Valid' }
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
            on:click={() => activeTab = tab.id}
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
      {#if activeTab === 'passport'}
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Informasi Passport</h3>
              <p class="text-sm text-gray-500">Cari informasi paspor dan visa</p>
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
              <label for="search" class="block text-sm font-medium text-gray-700">Nomor Passport</label>
              <input
                type="text"
                id="search"
                bind:value={searchQuery}
                placeholder="Masukkan nomor passport"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div class="flex items-end space-x-3">
              <button
                on:click={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
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
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Passport</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kewarganegaraan</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berlaku</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {#each searchResults as result}
                    <tr class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.passportNo}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.name}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.nationality}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.type}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.expiry}</td>
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

      {:else if activeTab === 'perlintasan'}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Data Perlintasan Perbatasan</h3>
          <p class="text-sm text-gray-500">Informasi perlintasan di perbatasan negara</p>
          
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passport</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perbatasan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arah</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tujuan</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each mockData.perlintasan as result}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.passport}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.border}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.date}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {result.direction === 'Outbound' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                        {result.direction}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.purpose}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>

      {:else if activeTab === 'intal'}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Sistem INTAL</h3>
          <p class="text-sm text-gray-500">Sistem informasi intelijen keimigrasian</p>
          
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passport</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each mockData.intal as result}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.passport}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {result.risk === 'Low' ? 'bg-green-100 text-green-800' : result.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                        {result.risk}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.alert}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.lastUpdate}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {result.status === 'Clear' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        {result.status}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>

      {:else if activeTab === 'balikan'}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Data Pemulangan TKI</h3>
          <p class="text-sm text-gray-500">Informasi pemulangan tenaga kerja Indonesia</p>
          
          <div class="bg-white shadow rounded-lg p-6 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Data Balikan</h3>
            <p class="mt-1 text-sm text-gray-500">Fitur data pemulangan TKI sedang dalam pengembangan.</p>
          </div>
        </div>

      {:else if activeTab === 'history'}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Riwayat Pencarian</h3>
          <p class="text-sm text-gray-500">Riwayat pencarian data imigrasi</p>
          
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

