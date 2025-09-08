<script>
  import { page } from '$app/stores';
  import { menuMapping } from '$lib/utils/menuMapping.js';

  const puldataMenu = menuMapping["Puldata"].submenus.map((sub) => ({
    id: sub.name.toLowerCase().replace(/\s+/g, '-'),
    name: sub.name
  }));

  $: currentSlug = $page.params.slug;
</script>

<div class="border-b border-gray-200">
  <nav class="-mb-px flex space-x-8 px-6" aria-label="Tabs">
    {#each puldataMenu as tab}
      <a
        href={`/puldata/${tab.id}`}
        class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm 
          {currentSlug === tab.id
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
      >
        {tab.name}
      </a>
    {/each}
  </nav>
</div>
