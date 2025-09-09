<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  export let data;

  // Data + table state
  $: rows = data?.rows || [];
  let search = '';
  let openCreate = false;
  let errorMsg = '';

  $: filtered = rows.filter(r => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      String(r.id).includes(q) ||
      r.updateBy?.toLowerCase().includes(q) ||
      r.nama?.toLowerCase().includes(q) ||
      r.alias?.toLowerCase().includes(q) ||
      r.ttl?.toLowerCase().includes(q) ||
      r.alamat?.toLowerCase().includes(q) ||
      r.warga?.toLowerCase().includes(q)
    );
  });

  let currentPage = 1;
  const pageSize = 5;
  $: page.subscribe(($page) => {
    const pageParam = parseInt($page.url.searchParams.get('page'));
    currentPage = isNaN(pageParam) ? 1 : pageParam;
  });
  $: totalPages = Math.ceil(filtered.length / pageSize) || 1;
  $: currentPage = Math.min(Math.max(1, currentPage), totalPages);
  $: paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function changePage(p) {
    currentPage = p;
    const params = new URLSearchParams(location.search);
    params.set('page', String(p));
    goto(`?${params.toString()}`, { keepfocus: true, noScroll: true, replaceState: true });
  }

  async function handleCreateSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch('?/create', { method: 'POST', body: form }).then(r => r.json());
    if (!res?.ok) errorMsg = res?.error || 'Gagal menambah data'; else { errorMsg=''; openCreate=false; location.reload(); }
  }

  function deleteRow(id, name) {
    if (!confirm(`Hapus data DTTOT "${name}"?`)) return;
    const fd = new FormData();
    fd.set('id', String(id));
    fetch('?/delete', { method: 'POST', body: fd })
      .then(r => r.json())
      .then(res => { if (!res?.ok) alert(res?.error || 'Gagal menghapus'); else location.reload(); });
  }

  function downloadCsv() {
    const header = ['No','Update By','Nama','Nama Alias','Tanggal Lahir','Alamat','Kewarganegaraan'];
    const lines = [header.join(',')].concat(filtered.map(r => [r.id, r.updateBy, r.nama, r.alias, r.ttl, r.alamat, r.warga].map(v => `"${String(v||'').replaceAll('"','""')}"`).join(',')));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dttot.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>Intel - DTTOT</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Intel - DTTOT</h1>
    <p class="mt-1 text-sm text-gray-500">Daftar Terduga Teroris dan Organisasi Teroris.</p>
  </div>

  <div class="bg-white rounded-lg shadow p-4 sm:p-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Daftar DTTOT</h2>
        <p class="text-sm text-gray-500">Manajemen data DTTOT</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500" on:click={() => openCreate = true}>Tambah Data</button>
        <button type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50" on:click={downloadCsv}>Download CSV</button>
        <input type="text" placeholder="Cari..." class="w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={search} />
      </div>
    </div>

    <div class="overflow-hidden rounded-lg border border-gray-200 mt-4">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">No</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Update By</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama Alias</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Lahir</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Alamat</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kewarganegaraan</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          {#each paginated as r}
            <tr>
              <td class="px-4 py-2 text-sm text-gray-900">{r.id}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.updateBy}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.nama}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.alias}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.ttl}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.alamat}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{r.warga}</td>
              <td class="px-4 py-2 text-sm text-right space-x-2">
                <a class="text-indigo-600 hover:underline text-xs" href={`/puldata/intel/dttot/${r.id}`}>Detail</a>
                <button type="button" class="text-red-600 hover:underline text-xs" on:click={() => deleteRow(r.id, r.nama)}>Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    {#if totalPages > 1}
      <div class="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p class="text-sm text-gray-500">Showing Page {currentPage} of {totalPages}</p>
        <div class="flex flex-wrap items-center gap-1">
          <button type="button" class="px-2 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50" on:click={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          {#each Array(totalPages).fill(0).map((_, i) => i + 1) as p}
            <button type="button" class="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100 {p === currentPage ? 'bg-indigo-600 text-white border-indigo-600' : 'text-gray-700'}" on:click={() => changePage(p)}>{p}</button>
          {/each}
          <button type="button" class="px-2 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50" on:click={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    {/if}
  </div>

</div>
