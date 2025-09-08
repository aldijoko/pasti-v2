<script>
  import UserForm from '../../UserForm.svelte';
  export let data;
  let errorMsg = '';
  let editing = false;

  const user = data?.user;
  const roles = data?.roles || [];
  const permissionTree = data?.permissionTree || {};

  // Map user permissions to titles for compact display
  function permissionTitlesFromTree(keys) {
    if (!keys || !permissionTree) return [];
    const titles = [];
    for (const [, group] of Object.entries(permissionTree)) {
      for (const item of group.items || []) {
        if (keys.includes(item.key)) titles.push(item.title || item.key);
      }
    }
    return titles;
  }

  $: userPermissionTitles = permissionTitlesFromTree(user?.permissions || []);

  /** @param {CustomEvent<{username:string,password:string,role:string,permissions:string[]}>} e */
  function handleUpdate(e) {
    const payload = e.detail;
    const form = new FormData();
    form.set('username', payload.username);
    form.set('password', payload.password || '');
    form.set('role', payload.role);
    form.set('permissions', (payload.permissions || []).join(','));

    fetch('?/update', { method: 'POST', body: form })
      .then((r) => r.json())
      .then((res) => {
        if (!res?.ok) errorMsg = res?.error || 'Failed to update user';
        else {
          errorMsg = '';
          editing = false;
          location.reload();
        }
      });
  }
</script>

<div class="space-y-6">
  <!-- Header / Breadcrumb -->
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
        <a href="/user-management" class="hover:text-gray-700">User Management</a>
        <span class="mx-2">/</span>
        <span class="text-gray-700">{user?.username}</span>
      </nav>
      <h1 class="mt-1 text-2xl font-bold text-gray-900">User Detail</h1>
      <p class="mt-1 text-sm text-gray-500">Kelola detail, role, dan akses menu.</p>
    </div>
    <div class="flex items-center gap-2">
      <button type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50" on:click={() => history.back()}>
        Kembali
      </button>
      <button type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500" on:click={() => editing = true}>
        Edit
      </button>
    </div>
  </div>

  <!-- Summary Card -->
  <section class="bg-white shadow rounded-lg p-4 sm:p-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
      <img src={user?.avatar || '/images/def_user.png'} alt="Avatar" class="h-16 w-16 rounded-full object-cover border border-gray-200" />
      <div class="flex-1 min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div class="min-w-0">
            <p class="text-lg font-semibold text-gray-900 truncate">{user?.name || user?.username}</p>
            <p class="text-sm text-gray-500 truncate">@{user?.username}</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-indigo-300 text-indigo-700 bg-indigo-50">{user?.role || '—'}</span>
            {#if user?.is_active === 'Y'}
              <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-300 text-green-700 bg-green-50">Aktif</span>
            {:else}
              <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-red-300 text-red-700 bg-red-50">Tidak Aktif</span>
            {/if}
          </div>
        </div>
        <p class="mt-2 text-xs text-gray-500">Terakhir login: {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : '—'}</p>
      </div>
    </div>

    <!-- Permission chips (compact preview) -->
    <div class="mt-4">
      <h3 class="text-sm font-medium text-gray-900">Akses Cepat</h3>
      {#if userPermissionTitles.length}
        <div class="mt-2 flex flex-wrap gap-2">
          {#each userPermissionTitles.slice(0, 8) as title}
            <span class="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-300">{title}</span>
          {/each}
          {#if userPermissionTitles.length > 8}
            <span class="inline-flex items-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">+{userPermissionTitles.length - 8} lainnya</span>
          {/if}
        </div>
      {:else}
        <p class="mt-2 text-sm text-gray-500">Tidak ada akses khusus.</p>
      {/if}
    </div>
  </section>

  <!-- Detailed Info -->
  <section class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    <!-- Left: Profile & Meta -->
    <div class="lg:col-span-1 space-y-6">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 class="text-sm font-semibold text-gray-900">Informasi Akun</h2>
        <dl class="mt-4 grid grid-cols-1 gap-3 text-sm">
          <div>
            <dt class="text-gray-500">Nama</dt>
            <dd class="font-medium text-gray-900">{user?.name || '—'}</dd>
          </div>
          <div>
            <dt class="text-gray-500">Username</dt>
            <dd class="font-medium text-gray-900">{user?.username}</dd>
          </div>
          <div>
            <dt class="text-gray-500">Role</dt>
            <dd class="font-medium text-gray-900">{user?.role}</dd>
          </div>
          <div>
            <dt class="text-gray-500">Status</dt>
            <dd>
              {#if user?.is_active === 'Y'}
                <span class="inline-block rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">Aktif</span>
              {:else}
                <span class="inline-block rounded bg-red-100 px-2 py-0.5 text-xs text-red-800">Tidak Aktif</span>
              {/if}
            </dd>
          </div>
          <div>
            <dt class="text-gray-500">Terakhir Login</dt>
            <dd class="font-medium text-gray-900">{user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : '—'}</dd>
          </div>
        </dl>
        <div class="mt-4">
          <button type="button" class="w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50" on:click={() => editing = true}>Edit User</button>
        </div>
      </div>
    </div>

    <!-- Right: Permissions by Group -->
    <div class="lg:col-span-2">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold text-gray-900">Permissions berdasarkan Menu</h2>
          <a href="#permissions" class="text-xs text-indigo-600 hover:underline" on:click={(e) => { e.preventDefault(); editing = true; }}>Ubah Permissions</a>
        </div>
        <div class="mt-4 space-y-4">
          {#each Object.entries(permissionTree) as [groupName, group]}
            {#if group.items.some(i => (user?.permissions || []).includes(i.key))}
              <div>
                <div class="text-xs font-semibold text-gray-700">{groupName}</div>
                <div class="mt-2 flex flex-wrap gap-2">
                  {#each group.items.filter(i => (user?.permissions || []).includes(i.key)) as it}
                    <span class="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-300">{it.title}</span>
                  {/each}
                </div>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Slide-over Edit Panel -->
  {#if editing}
    <div class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/40" on:click={() => (editing = false)}></div>
      <aside class="absolute right-0 top-0 h-full w-full sm:w-[36rem] bg-white shadow-xl flex flex-col">
        <div class="flex items-center justify-between px-4 py-3 border-b">
          <h3 class="text-base font-semibold text-gray-900">Edit User</h3>
          <button type="button" class="text-sm text-gray-600 hover:text-gray-900" on:click={() => (editing = false)}>Tutup</button>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <UserForm id="permissions" initial={user} {roles} {permissionTree} submitLabel="Update" on:submit={handleUpdate} />
          {#if errorMsg}
            <p class="mt-2 text-sm text-red-600">{errorMsg}</p>
          {/if}
        </div>
      </aside>
    </div>
  {/if}
</div>

