<script >
  import DashboardLayout from '../../layouts/DashboardLayout.svelte';
  
  let activeTab = 'search';
  let searchQuery = '';
  let searchResults = [];
  let isLoading = false;

  const tabs = [
    { id: 'search', name: 'Search IMEI', icon: '🔍', description: 'Pencarian berdasarkan IMEI' },
    { id: 'balance', name: 'Balance Check', icon: '💰', description: 'Cek saldo dan status' },
    { id: 'history', name: 'History', icon: '📋', description: 'Riwayat pencarian IMEI' }
  ];

  const mockData = {
    search: [
      { id: 1, imei: '123456789012345', brand: 'Samsung', model: 'Galaxy S21', status: 'Active', owner: 'John Doe', lastSeen: '2024-01-15' },
      { id: 2, imei: '987654321098765', brand: 'iPhone', model: 'iPhone 13', status: 'Blocked', owner: 'Jane Smith', lastSeen: '2024-01-10' }
    ],
    balance: [
      { id: 1, service: 'IMEI Search', balance: 1000, used: 150, remaining: 850, lastUpdate: '2024-01-15' },
      { id: 2, service: 'Device Info', balance: 500, used: 75, remaining: 425, lastUpdate: '2024-01-15' }
    ]
  };

  function handleSearch() {
    if (!searchQuery.trim()) return;
    
    isLoading = true;
    // Simulate API call
    setTimeout(() => {
      isLoading = false;
      searchResults = mockData.search || [];
    }, 1000);
  }

  function clearSearch() {
    searchQuery = '';
    searchResults = [];
  }

  function checkBalance() {
    // Simulate balance check
    alert('Balance check functionality will be implemented here');
  }
</script>

<svelte:head>
  <title>IMEI - PASTI</title>
</svelte:head>

  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">IMEI - International Mobile Equipment Identity</h1>
      <p class="mt-1 text-sm text-gray-500">
        Sistem pencarian dan verifikasi IMEI perangkat mobile.
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
        {#if activeTab === 'search'}
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Pencarian IMEI</h3>
                <p class="text-sm text-gray-500">Cari informasi perangkat berdasarkan nomor IMEI</p>
              </div>
              <button
                on:click={checkBalance}
                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Check Balance
              </button>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="sm:col-span-2">
                <label for="search" class="block text-sm font-medium text-gray-700">Nomor IMEI</label>
                <input
                  type="text"
                  id="search"
                  bind:value={searchQuery}
                  placeholder="Masukkan 15 digit IMEI"
                  maxlength="15"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p class="mt-1 text-xs text-gray-500">Contoh: 123456789012345</p>
              </div>
              <div class="flex items-end space-x-3">
                <button
                  on:click={handleSearch}
                  disabled={isLoading || !searchQuery.trim() || searchQuery.length !== 15}
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
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IMEI</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {#each searchResults as result}
                      <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.imei}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.brand}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.model}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {result.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            {result.status}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.owner}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.lastSeen}</td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            {/if}
          </div>

        {:else if activeTab === 'balance'}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Balance Information</h3>
            <p class="text-sm text-gray-500">Informasi saldo dan penggunaan layanan IMEI</p>
            
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {#each mockData.balance as service}
                <div class="bg-white shadow rounded-lg p-6">
                  <div class="flex items-center justify-between">
                    <h4 class="text-lg font-medium text-gray-900">{service.service}</h4>
                    <span class="text-sm text-gray-500">ID: {service.id}</span>
                  </div>
                  <div class="mt-4 space-y-3">
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-500">Total Balance:</span>
                      <span class="text-sm font-medium text-gray-900">{service.balance}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-500">Used:</span>
                      <span class="text-sm font-medium text-red-600">{service.used}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-500">Remaining:</span>
                      <span class="text-sm font-medium text-green-600">{service.remaining}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-500">Last Update:</span>
                      <span class="text-sm text-gray-500">{service.lastUpdate}</span>
                    </div>
                  </div>
                  <div class="mt-4">
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-600 h-2 rounded-full" style="width: {(service.used / service.balance) * 100}%"></div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

        {:else if activeTab === 'history'}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Search History</h3>
            <p class="text-sm text-gray-500">Riwayat pencarian IMEI</p>
            
            <div class="bg-white shadow rounded-lg p-6 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 00-2 2v2h2V5z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Belum ada riwayat</h3>
              <p class="mt-1 text-sm text-gray-500">Riwayat pencarian IMEI akan muncul di sini setelah Anda melakukan pencarian.</p>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Searches</dt>
                <dd class="text-lg font-medium text-gray-900">12,456</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Active Devices</dt>
                <dd class="text-lg font-medium text-gray-900">8,234</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Blocked Devices</dt>
                <dd class="text-lg font-medium text-gray-900">456</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Last Update</dt>
                <dd class="text-lg font-medium text-gray-900">1 jam lalu</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

