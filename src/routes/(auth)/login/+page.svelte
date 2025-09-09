<script>
  import { enhance } from '$app/forms';
  export let form;
  export let data; // from load(): captchaQuestion

  let showPassword = false;
  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
</script>

<svelte:head>
  <title>PASTI - Login</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-black">
  <div class="w-full max-w-5xl">
    <div class="overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-700/50 bg-white dark:bg-slate-900 shadow-2xl">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <!-- Left: Form -->
        <div class="order-2 md:order-1 p-6 sm:p-8 md:p-10">
          <div class="mb-6 flex items-center gap-3">
            <img src="/logo/logo-pasti-portal.png" alt="PASTI" class="h-10 w-auto object-contain" />
            <div class="h-5 w-px bg-slate-200 dark:bg-slate-700"></div>
            <p class="text-sm text-slate-500">Portal Aplikasi Subdit Teknologi Intelijen</p>
          </div>

          <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">Masuk ke Akun Anda</h1>
          <p class="mt-1 text-sm text-slate-500">Silakan gunakan kredensial yang telah terdaftar.</p>

          <form method="POST" use:enhance class="mt-8 space-y-5">
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z" />
                </svg>
              </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 pl-10 pr-3 py-2.5 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-slate-100"
                autocomplete="username"
              />
            </div>

            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0V10.5M3.75 10.5h16.5v9.75a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V10.5z" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                required
                class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 pl-10 pr-10 py-2.5 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-slate-100"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 px-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                on:click={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {#if showPassword}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.86-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.5a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
                  </svg>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                {/if}
              </button>
            </div>

            <!-- Captcha -->
            <div>
              <label for="captcha" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Verifikasi</label>
              <div class="flex items-center gap-3">
                <div class="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-700 dark:text-slate-200 text-sm">
                  {form?.captchaQuestion ?? data?.captchaQuestion}
                </div>
                <input
                  id="captcha"
                  name="captcha"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  placeholder="Jawaban"
                  required
                  class="w-28 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 px-3 py-2.5 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {#if form?.error}
              <div class="text-sm text-red-600" role="alert">{form.error}</div>
            {/if}

            <button type="submit" class="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-indigo-600 text-white py-2.5 font-medium shadow-sm hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Login
            </button>

            <p class="text-xs text-slate-500">Dengan masuk, Anda menyetujui ketentuan penggunaan dan kebijakan privasi.</p>
          </form>

          <div class="mt-8 text-center text-slate-500 text-xs">&copy; BNPT Subdit Teknologi Intelijen {new Date().getFullYear()}</div>
        </div>

        <!-- Right: Logo / Visual -->
        <div class="order-1 md:order-2 hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-8">
          <div class="relative w-full h-full flex items-center justify-center">
            <div class="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-indigo-200/40 blur-2xl"></div>
            <div class="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-fuchsia-200/40 blur-2xl"></div>
            <img src="/logo/logo_bnpt.png" alt="BNPT" class="relative w-3/4 max-w-sm h-auto drop-shadow-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Keep styles minimal; Tailwind covers layout */
</style>
