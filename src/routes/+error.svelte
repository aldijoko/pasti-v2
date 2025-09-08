<script>
  import { page } from '$app/stores';

  export let status = 500;
  export let error;
  export let data; // from hooks.handleError
  const message = (data?.message && String(data.message).trim()) || error?.message || 'Terjadi kesalahan tak terduga.';

  const is401 = status === 401;
  const is403 = status === 403;
  const is404 = status === 404;
  const is500 = status >= 500 && status < 600;

  const titleText = is401
    ? '401 — Tidak Terautentikasi'
    : is403
      ? '403 — Tidak Memiliki Akses'
      : is404
        ? '404 — Halaman Tidak Ditemukan'
        : is500
          ? 'Kesalahan Server'
          : `${status} — Terjadi Kesalahan`;

  const helpText = is401
    ? 'Anda tidak terautentikasi. Silakan login untuk melanjutkan.'
    : is403
      ? 'Halaman tidak bisa diakses. Anda tidak memiliki akses ke halaman ini.'
      : is404
        ? 'Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.'
        : is500
          ? 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'
          : 'Terjadi kesalahan. Silakan coba lagi.';

  function reloadPage() {
    if (typeof window !== 'undefined') window.location.reload();
  }

  function goBack() {
    if (typeof history !== 'undefined') history.back();
  }
</script>

<svelte:head>
  <title>{status} - Error</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div class="max-w-lg w-full bg-white rounded-lg shadow p-6">
    <div class="flex items-center space-x-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full {is404 ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={is404 ? 'M12 9v.01M12 15h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M12 9v4m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z'} />
        </svg>
      </div>
      <h1 class="text-lg font-semibold text-gray-900">{titleText}</h1>
    </div>

    <p class="mt-4 text-sm text-gray-700">{message}</p>
    <p class="mt-1 text-xs text-gray-500">{helpText}</p>

    <!-- Request context -->
    <div class="mt-4 rounded-md border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <div><span class="text-gray-500">Path:</span> {$page.url.pathname}</div>
          {#if $page.url.search}
            <div><span class="text-gray-500">Query:</span> {$page.url.search}</div>
          {/if}
          {#if $page.route?.id}
            <div><span class="text-gray-500">Route:</span> {$page.route.id}</div>
          {/if}
        </div>
        <div class="text-gray-500">{new Date().toLocaleString()}</div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end space-x-3">
      {#if is401}
        <a href="/login" class="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700" aria-label="Login">Login</a>
        <button type="button" class="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200" on:click={goBack} aria-label="Go back">Back</button>
      {:else if is403}
        <button type="button" class="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200" on:click={goBack} aria-label="Go back">Back</button>
        <a href="/" class="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700" aria-label="Go to homepage">Go Home</a>
      {:else if is404}
        <a href="/" class="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700" aria-label="Go to homepage">Go Home</a>
      {:else}
        <button type="button" class="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200" on:click={reloadPage} aria-label="Reload page">Reload</button>
        <a href="/" class="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700" aria-label="Go to homepage">Go Home</a>
      {/if}
    </div>
  </div>
</div>
