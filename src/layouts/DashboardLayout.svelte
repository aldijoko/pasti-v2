<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Sidebar from '../lib/components/Sidebar.svelte';
  
  let { children, menuItems = [] } = $props();
  
  let sidebarOpen = $state(false);
  let sidebarCollapsed = $state(false);
  let currentUser = {
    name: 'Admin User',
    role: 'Administrator',
    avatar: '/images/def_user.png'
  };

  // Dark mode state using Svelte 5 runes
  let theme = $state('light');
  onMount(() => {
    // Load theme from localStorage
    const saved = localStorage.getItem('theme');
    theme = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Load sidebar state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      sidebarCollapsed = JSON.parse(savedState);
    }
  });
  
  $effect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  });
  
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
  }

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  function closeSidebar() {
    sidebarOpen = false;
  }

  function toggleSidebarCollapse() {
    sidebarCollapsed = !sidebarCollapsed;
    // Save sidebar state to localStorage
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }
  
  let showProfileModal = $state(false);
  let showPrivacyModal = $state(false);

  function openProfileModal() {
    showProfileModal = true;
  }

  function openPrivacyModal() {
    showPrivacyModal = true;
  }

  function closeProfileModal() {
    showProfileModal = false;
  }

  function closePrivacyModal() {
    showPrivacyModal = false;
  }

  let dropdownOpen = $state(false);
</script>

<svelte:head>
  <title>PASTI - Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Sidebar -->
  <div class="fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-lg flex flex-col h-full transform transition-all duration-300 ease-in-out {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 {sidebarCollapsed ? 'w-16' : 'w-64'} {sidebarOpen ? 'w-64' : ''}">
    <div class="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 {sidebarCollapsed ? 'px-4' : 'px-6'}">
      <div class="flex items-center min-w-0">
        <img src="/logo/logo-pasti-portal.png" alt="Pasti Logo" class="h-8 w-auto flex-shrink-0" />
        {#if !sidebarCollapsed}
          <!-- <span class="ml-3 text-xl font-bold text-gray-900 truncate">PASTI</span> -->
        {/if}
      </div>
      <div class="flex items-center space-x-2 flex-shrink-0">
        <button 
          class="hidden lg:block p-1 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700" 
          on:click={toggleSidebarCollapse}
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={sidebarCollapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'} />
          </svg>
        </button>
        <button class="lg:hidden" on:click={closeSidebar} aria-label="Close sidebar">
          <svg class="w-6 h-6 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Navigation Menu -->
    <Sidebar {menuItems} {sidebarCollapsed} />

    <!-- User Profile -->
    <div class=" p-4 border-t border-gray-200 dark:border-gray-700 cursor-pointer" on:click={() => goto('/profile')}>
      <div class="flex items-center {sidebarCollapsed ? 'justify-center' : ''} min-w-0">
        <img src={currentUser.avatar} alt="Avatar" class="h-6 w-6 rounded-full flex-shrink-0" />
        {#if !sidebarCollapsed}
          <div class="ml-3 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{currentUser.name}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser.role}</p>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="transition-all duration-300 ease-in-out {sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'} {sidebarOpen ? 'pl-64' : 'pl-0'} min-w-0">
    <!-- Top Navigation -->
    <div class="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <button
          class="lg:hidden p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          on:click={toggleSidebar}
          aria-label="Open sidebar"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex items-center ml-auto space-x-2">
          <!-- Theme toggle -->
          <button type="button" on:click={toggleTheme} class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Toggle theme">
            {#if theme === 'dark'}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.221 2.221a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zM17 9a1 1 0 100 2h1a1 1 0 100-2h-1zM4.657 4.221a1 1 0 000 1.415l.707.707A1 1 0 106.78 4.928l-.707-.707a1 1 0 00-1.415 0zM3 9H2a1 1 0 100 2h1a1 1 0 100-2zm1.343 6.779a1 1 0 011.415 0l.707.707A1 1 0 014.05 18.9l-.707-.707a1 1 0 010-1.415zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm7.071-2.929a1 1 0 010 1.415l-.707.707A1 1 0 1114.95 13.95l.707-.707a1 1 0 011.414 0z"/></svg>
            {/if}
          </button>

          <div class="relative" role="menu" tabindex="0" aria-label="Profile dropdown container" on:keydown={(e) => { if (e.key === 'Escape') dropdownOpen = false; }}>
            <button type="button" class="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-haspopup="menu" aria-expanded={dropdownOpen} on:click={() => dropdownOpen = !dropdownOpen}>
              <img src={currentUser.avatar} alt="Open profile menu" class="h-8 w-8 rounded-full" />
              <svg class="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            {#if dropdownOpen}
              <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50" role="menu" aria-label="Profile menu">
                <button type="button" class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem" on:click={() => { dropdownOpen = false; openProfileModal(); }}>My Profile</button>
                <button type="button" class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem" on:click={() => { dropdownOpen = false; openPrivacyModal(); }}>Privacy Policy</button>
                <a href="/logout" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700" role="menuitem">Logout</a>
              </div>
              <div class="fixed inset-0 z-40" on:click={() => dropdownOpen = false} aria-hidden="true"></div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- Page Content -->
    <main class="p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-gray-100">
      <slot />
    </main>
  </div>

  <!-- Mobile overlay -->
  {#if sidebarOpen}
    <div 
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
      on:click={closeSidebar}
      role="button"
      tabindex="0"
      aria-label="Close sidebar overlay"
      on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { closeSidebar(); } }}
    ></div>
  {/if}

  {#if showProfileModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black bg-opacity-50" on:click={closeProfileModal} aria-hidden="true"></div>
      <div id="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" tabindex="-1" class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w/full max-w-md mx-4 p-6">
        <div class="flex items-start justify-between">
          <h2 id="profile-title" class="text-lg font-semibold text-gray-900 dark:text-gray-100">My Profile</h2>
          <button type="button" class="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close profile modal" on:click={closeProfileModal}>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="mt-4">
          <div class="flex items-center space-x-4">
            <img src={currentUser.avatar} alt="Avatar" class="h-16 w-16 rounded-full" />
            <div>
              <p class="text-base font-medium text-gray-900 dark:text-gray-100">{currentUser.name}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{currentUser.role}</p>
            </div>
          </div>
        </div>
        <div class="mt-6 text-right">
          <button type="button" class="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black" on:click={closeProfileModal}>Close</button>
        </div>
      </div>
    </div>
  {/if}

  {#if showPrivacyModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black bg-opacity-50" on:click={closePrivacyModal} aria-hidden="true"></div>
      <div id="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-title" tabindex="-1" class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w/full max-w-2xl mx-4 p-6">
        <div class="flex items-start justify-between">
          <h2 id="privacy-title" class="text-lg font-semibold text-gray-900 dark:text-gray-100">Privacy Policy</h2>
          <button type="button" class="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close privacy policy modal" on:click={closePrivacyModal}>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-6">
          <p>Aplikasi ini mengumpulkan dan memproses data yang diperlukan untuk autentikasi dan pelaporan.</p>
          <p>Kami menjaga kerahasiaan data sesuai kebijakan internal BNPT. Data akses pengguna dapat dicatat untuk kepentingan audit. Data tidak dibagikan kepada pihak ketiga kecuali diwajibkan oleh peraturan.</p>
          <p>Untuk pertanyaan terkait privasi, hubungi administrator sistem.</p>
        </div>
        <div class="mt-6 text-right">
          <button type="button" class="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black" on:click={closePrivacyModal}>Close</button>
        </div>
      </div>
    </div>
  {/if}
</div>
