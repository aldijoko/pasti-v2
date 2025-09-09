<script>
  import { page } from '$app/stores';

  // Filters, styled similar to user-management inputs
  let moduleFilter = '';
  let userFilter = '';
  let keyword = '';
  let from = '';
  let to = '';

  const data = [
    { time: '2025-09-01 09:10', module: 'Puldata', action: 'View', user: 'superadmin', desc: 'Buka Laporan Temuan' },
    { time: '2025-09-01 08:45', module: 'User Management', action: 'Update', user: 'admin', desc: 'Ubah akses userA' },
    { time: '2025-08-31 20:22', module: 'Olahdata', action: 'Export', user: 'userA', desc: 'Export rekap laporan' }
  ];

  const modules = ['Puldata', 'User Management', 'Olahdata'];

  function resetFilters() {
    moduleFilter = '';
    userFilter = '';
    keyword = '';
    from = '';
    to = '';
  }

  function inDateRange(isoLike, fromStr, toStr) {
    const d = new Date(isoLike.replace(' ', 'T') + ':00Z');
    if (fromStr) {
      const f = new Date(fromStr + 'T00:00:00Z');
      if (d < f) return false;
    }
    if (toStr) {
      const t = new Date(toStr + 'T23:59:59Z');
      if (d > t) return false;
    }
    return true;
  }

  // Note: pagination removed per request; showing full filtered list
</script>

<svelte:head>
  <title>All History - PASTI</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">All History</h1>
    <p class="mt-1 text-sm text-gray-500">Jejak aktivitas pada seluruh modul sistem.</p>
  </div>

  <section class="bg-white shadow rounded-lg p-4 sm:p-6">
    <h2 class="text-sm font-semibold text-gray-900">Filters</h2>
    <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
      <div class="lg:col-span-2">
        <label for="ah-module" class="block text-sm font-medium text-gray-700">Modul</label>
        <select id="ah-module" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={moduleFilter}>
          <option value="">Semua modul</option>
          {#each modules as m}
            <option value={m}>{m}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="ah-user" class="block text-sm font-medium text-gray-700">Username</label>
        <input id="ah-user" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Cari user" bind:value={userFilter} />
      </div>
      <div class="lg:col-span-2">
        <label for="ah-keyword" class="block text-sm font-medium text-gray-700">Kata kunci</label>
        <input id="ah-keyword" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Modul / aksi / deskripsi" bind:value={keyword} />
      </div>
      <div class="grid grid-cols-2 gap-3 lg:col-span-2">
        <div>
          <label for="ah-from" class="block text-sm font-medium text-gray-700">Dari tanggal</label>
          <input id="ah-from" type="date" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={from} />
        </div>
        <div>
          <label for="ah-to" class="block text-sm font-medium text-gray-700">Sampai tanggal</label>
          <input id="ah-to" type="date" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={to} />
        </div>
      </div>
    </div>
    <div class="mt-3 flex items-center justify-end">
      <button type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50" on:click={resetFilters}>Reset</button>
    </div>

    <div class="mt-4 overflow-hidden rounded-lg border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Waktu</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Modul</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Deskripsi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          {#each data.filter(r =>
            (!moduleFilter || r.module === moduleFilter) &&
            (!userFilter || r.user.toLowerCase().includes(userFilter.toLowerCase())) &&
            (!keyword || `${r.module} ${r.action} ${r.desc}`.toLowerCase().includes(keyword.toLowerCase())) &&
            inDateRange(r.time, from, to)
          ) as r}
            <tr>
              <td class="px-4 py-2 text-sm text-gray-900">{r.time}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.module}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.action}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.user}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.desc}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>

