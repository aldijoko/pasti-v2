<script>
  import { page } from '$app/stores';

  export let item = {};
  export let sidebarCollapsed = false;

  // Gunakan path langsung dari dummyMenu
  $: route = item?.path || '#';

  // Tandai menu aktif
  $: isActive =
    $page?.url
      ? ($page.url.pathname === route ||
        ($page.url.pathname.startsWith(route + '/') && route !== '#'))
      : false;

  // State expand/collapse
  let expanded = false;
  // Only consider children that are actually renderable:
  // - Have a path, or
  // - Have descendants that have a path
  function hasRenderable(node) {
    if (!node) return false;
    if (node.path && node.path !== '#') return true;
    const kids = node.children || [];
    return kids.some((k) => hasRenderable(k));
  }

  function filterRenderable(nodes) {
    return (nodes || []).filter((n) => hasRenderable(n));
  }

  $: visibleChildren = filterRenderable(item?.children || []);
  $: hasChildren = visibleChildren.length > 0;
  $: hasRoute = !!(route && route !== '#');

  function toggleExpand(event) {
    event.preventDefault(); // supaya tidak langsung redirect
    expanded = !expanded;
  }
</script>

{#if item && item.title}
<li class="w-full" role="none">
  <!-- Items with children -->
  {#if hasChildren}
    {#if hasRoute}
      <!-- Click title navigates; caret toggles submenu -->
      <div class="group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
          {sidebarCollapsed ? 'justify-center' : ''}
          {isActive
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
          }">
        <a
          href={route}
          class="flex items-center min-w-0 flex-1 {sidebarCollapsed ? 'justify-center' : ''}"
          title={sidebarCollapsed ? (item.title || '') : ''}
        >
          <span class="text-lg flex-shrink-0 {sidebarCollapsed ? '' : 'mr-3'}">{item.icon ?? item.title?.[0]}</span>
          {#if !sidebarCollapsed}
            <span class="truncate">{item.title}</span>
          {/if}
        </a>
        {#if !sidebarCollapsed}
          <button
            type="button"
            class="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            on:click|preventDefault|stopPropagation={toggleExpand}
            aria-label={expanded ? 'Collapse submenu' : 'Expand submenu'}
          >
            <svg class="w-4 h-4 transform transition-transform duration-200 {expanded ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        {/if}
      </div>
    {:else}
      <!-- No route: pure collapsible button -->
      <button
        type="button"
        on:click={toggleExpand}
        class="group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
          {sidebarCollapsed ? 'justify-center' : ''}
          {isActive
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
          }"
        title={sidebarCollapsed ? (item.title || '') : ''}
      >
        <span class="text-lg flex-shrink-0 {sidebarCollapsed ? '' : 'mr-3'}">{item.icon ?? item.title?.[0]}</span>
        {#if !sidebarCollapsed}
          <span class="truncate flex-1 text-left">{item.title}</span>
          <svg class="w-4 h-4 transform transition-transform duration-200 {expanded ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        {/if}
      </button>
    {/if}

    <!-- Children (expandable) -->
    {#if expanded}
      <ul class="ml-4 mt-1 space-y-1" role="menu">
        {#each visibleChildren as child (child.id)}
          <svelte:self item={child} {sidebarCollapsed} />
        {/each}
      </ul>
    {/if}

  {:else}
    <!-- Kalau tidak ada children, jadi link biasa. Abaikan item tanpa path (sebagai placeholder/tab). -->
    {#if item.path}
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
          {item.icon ?? item.title?.[0]}
        </span>
        {#if !sidebarCollapsed}
          <span class="truncate">{item.title}</span>
        {/if}
      </a>
    {/if}
  {/if}
</li>
{/if}
