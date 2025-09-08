<script>
  import { page } from '$app/stores';

  export let item = {};
  export let sidebarCollapsed = false;

  // Generate route URL
  function getRoute(it) {
    if (!it?.controller) return '#';
    if (!it?.method || it.method === 'index') return `/${it.controller}`;
    return `/${it.controller}/${it.method}`;
  }

  // Reactive: current route & active state
  $: route = getRoute(item);
  $: isActive =
    $page?.url
      ? ($page.url.pathname === route ||
        $page.url.pathname.startsWith(route + '/'))
      : false;

  console.log(item, 'sidebaritem')
</script>

{#if item && item.title}
<li class="w-full" role="none">
  <a
    href={route}
    role="menuitem"
    class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
      {sidebarCollapsed ? 'justify-center' : ''} 
      {isActive 
        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
      }"
    title={sidebarCollapsed ? (item.title || '') : ''}
  >
    <span class="text-lg flex-shrink-0 {sidebarCollapsed ? '' : 'mr-3'}">
      {#if item.icon}
        {item.icon}
      {:else}
        {item.title?.[0]}
      {/if}
    </span>
    {#if !sidebarCollapsed}
      <span class="truncate">{item.title}</span>
    {/if}
  </a>

  {#if Array.isArray(item.children) && item.children.length}
    <ul class="ml-4 mt-1 space-y-1" role="menu">
      {#each item.children as child (child.id)}
        <svelte:self item={child} {sidebarCollapsed} />
      {/each}
    </ul>
  {/if}

</li>
{/if}
