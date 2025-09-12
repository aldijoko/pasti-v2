<script>
  import UserForm from '../UserForm.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import Pagination from '$lib/components/Pagination.svelte';
  export let data;

  let errorMsg = '';
  let openCreate = false;
  $: items = data?.items || data?.users || [];
  $: total = data?.total || (data?.users ? data.users.length : 0);
  $: pageNum = data?.page || 1;
  $: size = data?.size || 10;
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

  // Debounce search input then push to URL for server-side filtering
  $: {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      search = searchInput.trim();
    }, 500);
  }

  // Sync filters from URL and push changes to URL
  $: page.subscribe(($page) => {
    const p = parseInt($page.url.searchParams.get('page'));
    const s = parseInt($page.url.searchParams.get('size'));
    const q = $page.url.searchParams.get('search') || '';
    const r = $page.url.searchParams.get('role') || '';
    if (!Number.isNaN(p)) pageNum = p;
    if (!Number.isNaN(s)) size = s;
    searchInput = q;
    search = q;
    selectedRole = r;
  });

  function updateQuery(updates) {
    if (!browser) return;
    const params = new URLSearchParams(location.search);
    if (updates.page != null) params.set('page', String(updates.page));
    if (updates.size != null) params.set('size', String(updates.size));
    if (updates.search != null) params.set('search', String(updates.search));
    if (updates.role != null) params.set('role', String(updates.role));
    goto(`?${params.toString()}`, { keepfocus: true, noScroll: true, replaceState: true });
  }

  function changePage(p) { updateQuery({ page: p }); }
  // Avoid loops: only update URL when values differ
  $: (function maybeSyncQuery() {
    if (!browser) return;
    const url = new URL(location.href);
    const qs = url.searchParams.get('search') || '';
    const qr = url.searchParams.get('role') || '';
    if (qs !== (search || '') || qr !== (selectedRole || '')) {
      updateQuery({ page: 1, search, role: selectedRole });
    }
  })();
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Users</h1>
      <p class="mt-1 text-sm text-gray-500">Kelola pengguna, role, dan akses menu</p>
    </div>
    <button type="button" class="btn btn-primary" on:click={() => openCreate = true}>Tambah User</button>
  </div>

  {#if openCreate}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div class="absolute inset-0 bg-black/40" aria-hidden="true" on:click={() => openCreate = false}></div>
      <div role="dialog" aria-modal="true" class="relative z-10 w-full h-full sm:h-auto sm:w-full sm:max-w-3xl sm:rounded-lg bg-white shadow-lg flex flex-col">
        <div class="flex items-center justify-between px-4 py-3 border-b">
          <h2 class="text-base font-semibold text-gray-900">Tambah User</h2>
          <button type="button" class="btn btn-ghost btn-sm" on:click={() => openCreate = false}>Tutup</button>
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
    <input type="text" placeholder="Search username..." class="w-full px-3 py-2 sm:w-60 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring-2" bind:value={searchInput} on:input={() => { clearTimeout(searchTimeout); searchTimeout = setTimeout(() => { search = searchInput.trim(); }, 500); }} />
    <select class="w-full px-3 py-3 sm:w-52 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring-2" bind:value={selectedRole} on:change={() => updateQuery({ page: 1, role: selectedRole })}>
      <option value="">All roles</option>
      {#each roles as r}
        <option value={r}>{r}</option>
      {/each}
    </select>
  </div>

  <div class="table-wrap">
    <table class="table">
      <thead class="table-head">
        <tr>
          <th class="th">Username</th>
          <th class="th">Role</th>
          <th class="th">Permissions</th>
          <th class="th">Last Login</th>
          <th class="th">Status</th>
          <th class="th">Aksi</th>
        </tr>
      </thead>
      <tbody class="tbody">
        {#each items as u}
          <tr>
            <td class="td text-gray-900">{u.username}</td>
            <td class="td">{u.role}</td>
            <td class="td text-gray-600">
              <div class="flex flex-wrap gap-1">
                {#each (u.permissions || []).slice(0, 5) as perm}
                  <span class="badge badge-gray ring-1 ring-inset ring-gray-300">{perm}</span>
                {/each}
                {#if (u.permissions || []).length > 5}
                  <span class="badge bg-gray-200 text-gray-600">+{(u.permissions.length - 5)}</span>
                {/if}
              </div>
            </td>
            <td class="td text-gray-600">{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '—'}</td>
            <td>
              {#if u.is_active === 'Y'}
                <span class="badge badge-green">Aktif</span>
              {:else}
                <span class="badge badge-red">Tidak Aktif</span>
              {/if}
            </td>
            <td class="td-right space-x-3">
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

  <div class="mt-4">
    <Pagination page={pageNum} pageSize={size} total={total} useLinks={true} />
  </div>
</div>
