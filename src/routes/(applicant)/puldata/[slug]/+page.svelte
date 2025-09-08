<script>
  import PuldataTabs from '../PuldataTabs.svelte';
  export let data;
</script>

<h1 class="text-2xl font-bold mb-4">Puldata</h1>
<PuldataTabs />

<div class="p-6 bg-white rounded shadow mt-4">
  <h2 class="text-lg font-semibold mb-2">{data.tab.name}</h2>

  {#if data.tab.method === 'cyber-patrol'}
    <p>🔎 Konten pencarian Napi/Tahanan (method: {data.tab.method})</p>

  {:else if data.tab.method === 'BDI'}
    <p>📄 Konten Napi/Tahanan Baru</p>

  {:else if data.tab.method === 'ajaxSearchFTF'}
    <p>🌍 Konten Foreign Terrorist Fighters</p>

  {:else if data.tab.method === 'listDttotAjax'}
    <p>⚠️ Daftar DTTOT</p>

  {:else}
    <p class="text-gray-500">Konten untuk {data.tab.name} masih dalam pengembangan.</p>
  {/if}
</div>
