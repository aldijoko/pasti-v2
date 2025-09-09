<script>
  import UserForm from '../UserForm.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  export let data;

  let errorMsg = '';
  let openCreate = false;
  $: users = data?.users || [];
  $: roles = data?.roles || [];
  $: permissionTree = data?.permissionTree || {};

  /** @param {CustomEvent<{username:string,password:string,role:string,permissions:string[]}>} e */
  function handleCreateSubmit(e) {
    const payload = e.detail;
    const form = new FormData();
    form.set('username', payload.username);
    form.set('password', payload.password || '');
    form.set('role', payload.role);
    form.set('permissions', (payload.permissions || []).join(','));

    fetch('?/create', { method: 'POST', body: form })
      .then((r) => r.json())
      .then((res) => {
        if (!res?.ok) errorMsg = res?.error || 'Failed to create user';
        else {
          errorMsg = '';
          openCreate = false;
          location.reload();
        }
      });
  }

  // Filtering
  let search = '';
  let selectedRole = '';
  let searchInput = '';
  let searchTimeout;

  // Debounce search input
  $: {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      search = searchInput.trim();
    }, 750);
  }

  // Pagination
  let currentPage = 1;
  const pageSize = 3;

  // Sync from URL
  $: page.subscribe(($page) => {
    const pageParam = parseInt($page.url.searchParams.get('page'));
    currentPage = isNaN(pageParam) ? 1 : pageParam;
  });

  function changePage(pageNum) {
    currentPage = pageNum;
    const params = new URLSearchParams(location.search);
    params.set('page', pageNum);
    goto(`?${params.toString()}`, { keepfocus: true, noScroll: true });
  }

  $: filteredUsers = users.filter((u) => {
    const matchSearch = !search || u.username.toLowerCase().includes(search.toLowerCase());
    const matchRole = !selectedRole || u.role === selectedRole;
    return matchSearch && matchRole;
  });

  $: totalPages = Math.ceil(filteredUsers.length / pageSize);
  $: paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  $: if (search || selectedRole) changePage(1);
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Users</h1>
      <p class="mt-1 text-sm text-gray-500">Kelola pengguna, role, dan akses menu</p>
    </div>
    <button type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500" on:click={() => openCreate = true}>Tambah User</button>
  </div>

  {#if openCreate}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div class="absolute inset-0 bg-black/40" aria-hidden="true" on:click={() => openCreate = false}></div>
      <div role="dialog" aria-modal="true" class="relative z-10 w-full h-full sm:h-auto sm:w-full sm:max-w-3xl sm:rounded-lg bg-white shadow-lg flex flex-col">
        <div class="flex items-center justify-between px-4 py-3 border-b">
          <h2 class="text-base font-semibold text-gray-900">Tambah User</h2>
          <button type="button" class="text-sm text-gray-600 hover:text-gray-900" on:click={() => openCreate = false}>Tutup</button>
        </div>
        <div class="px-4 py-3 overflow-y-auto flex-1 sm:max-h-[80vh]">
          <UserForm {roles} {permissionTree} submitLabel="Create" on:submit={handleCreateSubmit} />
          {#if errorMsg}
            <p class="mt-2 text-sm text-red-600">{errorMsg}</p>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
    <input type="text" placeholder="Search username..." class="w-full px-3 py-2 sm:w-60 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring-2" bind:value={searchInput} />
    <select class="w-full px-3 py-3 sm:w-52 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring-2" bind:value={selectedRole}>
      <option value="">All roles</option>
      {#each roles as r}
        <option value={r}>{r}</option>
      {/each}
    </select>
  </div>

  <div class="overflow-hidden rounded-lg border border-gray-200">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        {#each paginatedUsers as u}
          <tr>
            <td class="px-4 py-2 text-sm text-gray-900">{u.username}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{u.role}</td>
            <td class="px-4 py-2 text-sm text-gray-600">
              <div class="flex flex-wrap gap-1">
                {#each (u.permissions || []).slice(0, 5) as perm}
                  <span class="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-300">{perm}</span>
                {/each}
                {#if (u.permissions || []).length > 5}
                  <span class="inline-flex items-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">+{(u.permissions.length - 5)}</span>
                {/if}
              </div>
            </td>
            <td class="px-4 py-2 text-sm text-gray-600">{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '—'}</td>
            <td>
              {#if u.is_active === 'Y'}
                <span class="inline-block rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">Aktif</span>
              {:else}
                <span class="inline-block rounded bg-red-100 px-2 py-0.5 text-xs text-red-800">Tidak Aktif</span>
              {/if}
            </td>
            <td class="px-4 py-2 text-right space-x-3">
              <a class="text-indigo-600 hover:underline text-sm" href="/user-management/users/{u.username}">Detail</a>
              <button
                type="button"
                class="text-red-600 hover:underline text-sm"
                on:click={() => {
                  if (confirm(`Hapus user "${u.username}"?`)) {
                    const fd = new FormData();
                    fd.set('username', u.username);
                    fetch('?/delete', { method: 'POST', body: fd })
                      .then(r => r.json())
                      .then(res => {
                        if (!res?.ok) alert(res?.error || 'Gagal menghapus user');
                        else location.reload();
                      });
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if totalPages > 1}
    <div class="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p class="text-sm text-gray-500">Showing page {currentPage} of {totalPages}</p>
      <div class="flex flex-wrap items-center gap-1">
        <button type="button" class="px-2 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50" on:click={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        {#each Array(totalPages).fill(0).map((_, i) => i + 1) as page}
          <button type="button" class="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100 {page === currentPage ? 'bg-indigo-600 text-white border-indigo-600' : 'text-gray-700'}" on:click={() => changePage(page)}>{page}</button>
        {/each}
        <button type="button" class="px-2 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50" on:click={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  {/if}
</div>
