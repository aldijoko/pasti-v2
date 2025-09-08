<script>
  import SidebarItem from './SidebarItem.svelte';
	import SidebarItemStatic from './SidebarItemStatic.svelte';

  let { menuItems = [], sidebarCollapsed = false } = $props();
  let visibleItems = $derived((menuItems || []).filter((m) => (m?.path && m.path !== '#') || (m?.children && m.children.length)));
</script>

<nav class="flex-1 mt-6 px-3 overflow-y-auto">
  <ul class="space-y-1" role="menu">
    {#each visibleItems as item (item.id)}
      <!-- <SidebarItem {item} {sidebarCollapsed} /> -->
      <SidebarItemStatic {item} {sidebarCollapsed} />
    {/each}
  </ul>
</nav>
