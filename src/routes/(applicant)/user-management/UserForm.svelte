<script>
  import { createEventDispatcher } from 'svelte';
  /** @type {{ username: string, password?: string, role: string, permissions: string[] }} */
  export let initial = { username: '', password: '', role: '', permissions: [] };
  /** @type {string[]} */
  export let roles = [];
  /** @type {Record<string, {controller:string, items: {key:string,title:string}[]}>} */
  export let permissionTree = {};
  /** @type {string} */
  export let submitLabel = 'Save';

  const dispatch = createEventDispatcher();

  let username = initial.username || '';
  let password = initial.password || '';
  let role = initial.role || '';
  /** @type {Set<string>} */
  let selected = new Set(initial.permissions || []);

  /** @type {string[]} */
  $: formPermissions = Array.from(selected);

  // Focus helpers
  let filterText = '';
  let showSelectedOnly = false;
  /** @type {Record<string, boolean>} */
  let open = {};
  $: open = Object.fromEntries(Object.keys(permissionTree).map((k) => [k, open[k] ?? false]));

  /** @param {string[]} keys @param {boolean} checked */
  function toggleAllInGroup(keys, checked) {
    keys.forEach((k) => {
      if (checked) selected.add(k); else selected.delete(k);
    });
  }

  /** @param {SubmitEvent} e */
  function onSubmit(e) {
    e.preventDefault();
    dispatch('submit', {
      username,
      password,
      role,
      permissions: Array.from(selected)
    });
  }
</script>

<form class="space-y-6" on:submit={onSubmit}>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div>
      <label class="block text-sm font-medium text-gray-700" for="uf-username">Username</label>
      <input id="uf-username" class="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={username} placeholder="Username" required />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700" for="uf-password">Password</label>
      <input id="uf-password" type="password" class="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={password} placeholder="Password" />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700" for="uf-role">Role</label>
      <select id="uf-role" class="mt-1 block w-full px-3 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" bind:value={role} required>
        <option value="" disabled>Select role</option>
        {#each roles as r}
          <option value={r}>{r}</option>
        {/each}
      </select>
    </div>
  </div>

  <div>
    <h3 class="text-sm font-semibold text-gray-900">Menu Access</h3>
    <div class="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input class="w-full px-3 py-2 sm:w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Cari permission..." bind:value={filterText} />
      <label class="inline-flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" bind:checked={showSelectedOnly} />
        <span>Tampilkan yang dipilih saja</span>
      </label>
    </div>
    <div class="mt-5 space-y-4">
      {#each Object.entries(permissionTree) as [menuName, group]}
        {#if (group.items || []).length > 0}
          {#if (showSelectedOnly ? group.items.some(i => selected.has(i.key)) : true)}
            <div class="rounded-lg border border-gray-200">
              <button type="button" class="w-full flex items-center justify-between px-3 py-2 bg-gray-50" on:click={() => open[menuName] = !open[menuName]} aria-expanded={open[menuName]}>
                <div class="text-sm font-medium text-gray-800">{menuName}</div>
                <div class="text-xs text-gray-500">{open[menuName] ? 'Sembunyikan' : 'Lihat'}</div>
              </button>
              {#if open[menuName]}
                <div class="px-3 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {#each group.items.filter(i => {
                    const matchFilter = !filterText || (i.title || '').toLowerCase().includes(filterText.toLowerCase());
                    const matchSelected = !showSelectedOnly || selected.has(i.key);
                    return matchFilter && matchSelected;
                  }) as item}
                    <label class="inline-flex items-center gap-2 text-sm text-gray-800">
                      <input type="checkbox" checked={selected.has(item.key)} on:change={(e) => { const t = /** @type {HTMLInputElement} */ (e.currentTarget); t.checked ? selected.add(item.key) : selected.delete(item.key); }} />
                      <span>{item.title}</span>
                    </label>
                  {/each}
                  {#if group.items.filter(i => { const matchFilter = !filterText || (i.title || '').toLowerCase().includes(filterText.toLowerCase()); const matchSelected = !showSelectedOnly || selected.has(i.key); return matchFilter && matchSelected; }).length === 0}
                    <div class="text-sm text-gray-500">Tidak ada item</div>
                  {/if}
                </div>
                <div class="px-3 py-2 border-t flex items-center justify-end gap-2">
                  <button type="button" class="text-xs text-indigo-600 hover:underline" on:click={() => toggleAllInGroup(group.items.map(i => i.key), true)}>Pilih semua</button>
                  <button type="button" class="text-xs text-gray-600 hover:underline" on:click={() => toggleAllInGroup(group.items.map(i => i.key), false)}>Bersihkan</button>
                </div>
              {/if}
            </div>
          {/if}
        {/if}
      {/each}
    </div>
  </div>

  <input type="hidden" name="permissions" value={formPermissions.join(',')}>

  <div class="flex items-center gap-3">
    <button type="submit" class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{submitLabel}</button>
    <slot name="extra" />
  </div>
</form>


