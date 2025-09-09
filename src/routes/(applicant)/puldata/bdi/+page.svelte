<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  export let data;

  let search = '';
  let openCreate = false;
  let errorMsg = '';

  $: rows = data?.rows || [];

  $: filtered = rows.filter(r => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      String(r.id).includes(q) ||
      r.kategori.toLowerCase().includes(q) ||
      r.nama.toLowerCase().includes(q) ||
      r.nik.toLowerCase().includes(q) ||
      r.jk.toLowerCase().includes(q) ||
      r.ttl.toLowerCase().includes(q) ||
      r.warga.toLowerCase().includes(q)
    );
  });

  // Pagination (client-side)
  let currentPage = 1;
  const pageSize = 5;
  $: totalPages = Math.ceil(filtered.length / pageSize) || 1;
  $: currentPage = Math.min(Math.max(1, currentPage), totalPages);
  $: paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Sync current page from URL
  $: page.subscribe(($page) => {
    const pageParam = parseInt($page.url.searchParams.get('page'));
    currentPage = isNaN(pageParam) ? 1 : pageParam;
  });

  function changePage(p) {
    currentPage = p;
    const params = new URLSearchParams(location.search);
    params.set('page', String(p));
    goto(`?${params.toString()}`, { keepfocus: true, noScroll: true, replaceState: true });
  }

  // Create handler
  async function handleCreateSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch('?/create', { method: 'POST', body: form }).then(r => r.json());
    if (!res?.ok) errorMsg = res?.error || 'Gagal menambah data'; else { errorMsg=''; openCreate=false; location.reload(); }
  }

  function deleteRow(id, name) {
    if (!confirm(`Hapus data BDI "${name}"?`)) return;
    const fd = new FormData();
    fd.set('id', String(id));
    fetch('?/delete', { method: 'POST', body: fd })
      .then(r => r.json())
      .then(res => { if (!res?.ok) alert(res?.error || 'Gagal menghapus'); else location.reload(); });
  }
</script>

<svelte:head>
  <title>Puldata - BDI</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">BDI</h1>
    <p class="mt-1 text-sm text-gray-500">Daftar data BDI.</p>
  </div>

  <div class="bg-white rounded-lg shadow p-4 sm:p-6 space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500" on:click={() => openCreate = true}>Tambah Data</button>
      <input
        type="text"
        placeholder="Cari nama / NIK / kategori..."
        class="w-full sm:w-72 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        bind:value={search}
      />
    </div>
    <div class="overflow-auto rounded-lg border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">No</th>
            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">NIK</th>
            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Jenis Kelamin</th>
            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Lahir</th>
            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kewarganegaraan</th>
            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          {#each paginated as r}
            <tr>
              <td class="px-3 py-2 text-sm text-gray-900">{r.id}</td>
              <td class="px-3 py-2 text-sm text-gray-700">{r.kategori}</td>
              <td class="px-3 py-2 text-sm text-gray-700">{r.nama}</td>
              <td class="px-3 py-2 text-sm text-gray-700 font-mono">{r.nik}</td>
              <td class="px-3 py-2 text-sm text-gray-700">{r.jk}</td>
              <td class="px-3 py-2 text-sm text-gray-700">{r.ttl}</td>
              <td class="px-3 py-2 text-sm text-gray-700">{r.warga}</td>
              <td class="px-3 py-2 text-sm text-right">
                <div class="space-x-2">
                  <button type="button" class="text-indigo-600 hover:underline text-xs">Detail</button>
                  <button type="button" class="text-red-600 hover:underline text-xs" on:click={() => deleteRow(r.id, r.nama)}>Delete</button>
                </div>
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

{#if openCreate}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
    <div class="absolute inset-0 bg-black/40" aria-hidden="true" on:click={() => openCreate = false}></div>
    <div role="dialog" aria-modal="true" class="relative z-10 w-full h-full sm:h-auto sm:w-full sm:max-w-2xl sm:rounded-lg bg-white shadow-lg flex flex-col">
      <div class="flex items-center justify-between px-4 py-3 border-b">
        <h2 class="text-base font-semibold text-gray-900">Tambah Data BDI</h2>
        <button type="button" class="text-sm text-gray-600 hover:text-gray-900" on:click={() => openCreate = false}>Tutup</button>
      </div>
      <form class="px-4 py-3 overflow-y-auto flex-1 sm:max-h-[80vh] space-y-4" on:submit|preventDefault={handleCreateSubmit}>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700">Kategori</label>
            <input name="kategori" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nama</label>
            <input name="nama" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">NIK</label>
            <input name="nik" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
            <select name="jk" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
            <input type="date" name="ttl" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Kewarganegaraan</label>
            <input name="warga" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value="WNI" />
          </div>
        </div>
        {#if errorMsg}
          <p class="text-sm text-red-600">{errorMsg}</p>
        {/if}
        <div class="pt-2 flex items-center justify-end gap-2">
          <button type="button" class="px-3 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100" on:click={() => openCreate = false}>Batal</button>
          <button type="submit" class="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Simpan</button>
        </div>
      </form>
    </div>
  </div>
{/if}
