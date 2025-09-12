<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import Pagination from '$lib/components/Pagination.svelte';
  export let data;

  $: user = $page.data.user;
  $: items = data?.items || data?.rows || [];
  $: total = data?.total || (data?.rows ? data.rows.length : 0);
  $: pageNum = data?.page || 1;
  $: size = data?.size || 5;

  let search = '';
  let openCreate = false;
  let errorMsg = '';

  $: page.subscribe(($page) => {
    const q = $page.url.searchParams.get('search') || '';
    const p = parseInt($page.url.searchParams.get('page'));
    const s = parseInt($page.url.searchParams.get('size'));
    search = q;
    if (!Number.isNaN(p)) pageNum = p;
    if (!Number.isNaN(s)) size = s;
  });

  function updateQuery(updates) {
    if (!browser) return;
    const params = new URLSearchParams(location.search);
    if (updates.page != null) params.set('page', String(updates.page));
    if (updates.size != null) params.set('size', String(updates.size));
    if (updates.search != null) params.set('search', String(updates.search));
    goto(`?${params.toString()}`, { keepfocus: true, noScroll: true, replaceState: true });
  }
  function changePage(p) { updateQuery({ page: p }); }

  async function handleCreateSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch('?/create', { method: 'POST', body: form }).then(r => r.json());
    if (!res?.ok) errorMsg = res?.error || 'Gagal menambah data'; else { errorMsg=''; openCreate=false; location.reload(); }
  }

  function deleteRow(id, name) {
    if (!confirm(`Hapus data Terdakwa \"${name}\"?`)) return;
    const fd = new FormData();
    fd.set('id', String(id));
    fetch('?/delete', { method: 'POST', body: fd })
      .then(r => r.json())
      .then(res => { if (!res?.ok) alert(res?.error || 'Gagal menghapus'); else location.reload(); });
  }
</script>

<svelte:head>
  <title>Intel - Data Terdakwa</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Intel - Data Terdakwa</h1>
    <p class="mt-1 text-sm text-gray-500">Data terdakwa terkait kasus teror.</p>
  </div>

  <div class="bg-white rounded-lg shadow p-4 sm:p-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Daftar Terdakwa</h2>
        <p class="text-sm text-gray-500">Manajemen data terdakwa</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button type="button" class="btn btn-primary" on:click={() => openCreate = true}>Tambah Data</button>
        <input type="text" placeholder="Cari..." class="w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={search} on:change={() => updateQuery({ page: 1, search })} />
      </div>
    </div>

    <div class="table-wrap mt-4">
      <table class="table">
        <thead class="table-head">
          <tr>
            <th class="th">No</th>
            <th class="th">Edit By</th>
            <th class="th">Nama</th>
            <th class="th">Nama Alias</th>
            <th class="th">Tanggal Lahir</th>
            <th class="th">Alamat</th>
            <th class="th">Jenis Kelamin</th>
            <th class="th">Tuntutan</th>
            <th class="th">Action</th>
          </tr>
        </thead>
        <tbody class="tbody">
          {#each items as r}
            <tr>
              <td class="td text-gray-900">{r.id}</td>
              <td class="td">{r.editBy}</td>
              <td class="td">{r.nama}</td>
              <td class="td">{r.alias}</td>
              <td class="td">{r.ttl}</td>
              <td class="td">{r.alamat}</td>
              <td class="td">{r.jk}</td>
              <td class="td">{r.tuntutan}</td>
              <td class="td-right space-x-2">
                <button type="button" class="text-red-600 hover:underline text-xs" on:click={() => deleteRow(r.id, r.nama)}>Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="mt-4">
      <Pagination page={pageNum} pageSize={size} total={total} useLinks={true} />
    </div>
  </div>

  {#if openCreate}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div class="absolute inset-0 bg-black/40" aria-hidden="true" on:click={() => openCreate = false}></div>
      <div role="dialog" aria-modal="true" class="relative z-10 w-full h-full sm:h-auto sm:w-full sm:max-w-2xl sm:rounded-lg bg-white shadow-lg flex flex-col">
        <div class="flex items-center justify-between px-4 py-3 border-b">
          <h2 class="text-base font-semibold text-gray-900">Tambah Data Terdakwa</h2>
          <button type="button" class="text-sm text-gray-600 hover:text-gray-900" on:click={() => openCreate = false}>Tutup</button>
        </div>
        <form class="px-4 py-3 overflow-y-auto flex-1 sm:max-h-[80vh] space-y-4" on:submit|preventDefault={handleCreateSubmit}>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama</label>
              <input name="nama" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama Alias</label>
              <input name="alias" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
              <input type="date" name="ttl" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Alamat</label>
              <input name="alamat" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <select name="jk" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">—</option>
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tuntutan</label>
              <input name="tuntutan" class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
          </div>
          {#if errorMsg}
            <p class="text-sm text-red-600">{errorMsg}</p>
          {/if}
          <div class="pt-2 flex items-center justify-end gap-2">
            <button type="button" class="btn btn-outline" on:click={() => openCreate = false}>Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  {/if}

</div>
