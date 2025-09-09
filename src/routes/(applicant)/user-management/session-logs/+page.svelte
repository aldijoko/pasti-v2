<script>
  import { page } from '$app/stores';

  // Filters (mirroring style from user-management)
  let q = '';
  let status = '';
  let from = '';
  let to = '';

  const rows = [
    { time: '2025-09-01 08:12', username: 'superadmin', ip: '10.1.2.3', agent: 'Chrome on macOS', status: 'Success' },
    { time: '2025-09-01 07:58', username: 'admin', ip: '10.1.2.55', agent: 'Edge on Windows', status: 'Success' },
    { time: '2025-08-31 21:14', username: 'userA', ip: '10.1.3.8', agent: 'Mobile Safari', status: 'Failed' }
  ];

  function resetFilters() {
    q = '';
    status = '';
    from = '';
    to = '';
  }

  function inDateRange(isoLike, fromStr, toStr) {
    // isoLike is 'YYYY-MM-DD HH:mm' here; create comparable Dates
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
  <title>Session Logs - PASTI</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Session Logs</h1>
    <p class="mt-1 text-sm text-gray-500">Riwayat sesi login pengguna dan statusnya.</p>
  </div>

  <section class="bg-white shadow rounded-lg p-4 sm:p-6">
    <h2 class="text-sm font-semibold text-gray-900">Filters</h2>
    <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label for="sl-keyword" class="block text-sm font-medium text-gray-700">Keyword</label>
        <input id="sl-keyword" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Cari username / IP / device" bind:value={q} />
      </div>
      <div>
        <label for="sl-status" class="block text-sm font-medium text-gray-700">Status</label>
        <select id="sl-status" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={status}>
          <option value="">Semua status</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      <div>
        <label for="sl-from" class="block text-sm font-medium text-gray-700">Dari tanggal</label>
        <input id="sl-from" type="date" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={from} />
      </div>
      <div>
        <label for="sl-to" class="block text-sm font-medium text-gray-700">Sampai tanggal</label>
        <input id="sl-to" type="date" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={to} />
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
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          {#each rows.filter(r =>
            (!q || `${r.username} ${r.ip} ${r.agent}`.toLowerCase().includes(q.toLowerCase())) &&
            (!status || r.status === status) &&
            inDateRange(r.time, from, to)
          ) as r}
            <tr>
              <td class="px-4 py-2 text-sm text-gray-900">{r.time}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.username}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.ip}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.agent}</td>
              <td class="px-4 py-2 text-sm">
                {#if r.status === 'Success'}
                  <span class="rounded bg-green-100 px-2 py-0.5 text-green-800">Success</span>
                {:else}
                  <span class="rounded bg-red-100 px-2 py-0.5 text-red-800">Failed</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>

