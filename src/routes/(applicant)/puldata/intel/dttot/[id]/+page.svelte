<script>
  export let data;
  $: rec = data.rec;
</script>

<svelte:head>
  <title>Detail DTTOT - {rec?.nama}</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Detail DTTOT</h1>
    <p class="mt-1 text-sm text-gray-500">Informasi lengkap untuk entri terpilih.</p>
  </div>

  <div class="bg-white rounded-lg shadow p-4 sm:p-6">
    <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div><dt class="text-sm text-gray-500">No</dt><dd class="text-base font-semibold text-gray-900">{rec.id}</dd></div>
      <div><dt class="text-sm text-gray-500">Update By</dt><dd class="text-base font-semibold text-gray-900">{rec.updateBy}</dd></div>
      <div><dt class="text-sm text-gray-500">Nama</dt><dd class="text-base font-semibold text-gray-900">{rec.nama}</dd></div>
      <div><dt class="text-sm text-gray-500">Nama Alias</dt><dd class="text-base font-semibold text-gray-900">{rec.alias}</dd></div>
      <div><dt class="text-sm text-gray-500">Tanggal Lahir</dt><dd class="text-base font-semibold text-gray-900">{rec.ttl}</dd></div>
      <div><dt class="text-sm text-gray-500">Alamat</dt><dd class="text-base font-semibold text-gray-900">{rec.alamat}</dd></div>
      <div><dt class="text-sm text-gray-500">Kewarganegaraan</dt><dd class="text-base font-semibold text-gray-900">{rec.warga}</dd></div>
    </dl>
    <div class="mt-6">
      <a href="/puldata/intel/dttot?tab=daftar" class="text-indigo-600 hover:underline text-sm">Kembali ke daftar</a>
    </div>
  </div>
</div>

