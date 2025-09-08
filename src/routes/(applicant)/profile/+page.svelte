<script>
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  
  export let form;
  
  let showOldPassword = false;
  let showPassword1 = false;
  let showPassword2 = false;
  let selectedFile = null;
  let imagePreview = null;
  
  function toggleOldPassword() {
    showOldPassword = !showOldPassword;
  }
  
  function togglePassword1() {
    showPassword1 = !showPassword1;
  }
  
  function togglePassword2() {
    showPassword2 = !showPassword2;
  }
  
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        alert('File yang dipilih bukan gambar yang valid. Harap pilih file gambar (JPG, PNG, GIF, WEBP, SVG).');
        event.target.value = '';
        return;
      }
      selectedFile = file;
      imagePreview = URL.createObjectURL(file);
    }
  }
  
  function validatePasswordFields(event) {
    const oldPassword = document.getElementById('oldPassword')?.value?.trim() || '';
    const password = document.getElementById('password')?.value?.trim() || '';
    const password2 = document.getElementById('password2')?.value?.trim() || '';
    
    const isAnyFilled = oldPassword || password || password2;
    
    if (isAnyFilled) {
      if (!oldPassword || !password || !password2) {
        alert('Semua kolom password harus diisi jika salah satunya diisi.');
        event.preventDefault();
        return false;
      }
      
      if (password !== password2) {
        alert('Password dan konfirmasi password tidak cocok.');
        event.preventDefault();
        return false;
      }
      
      if (password.length < 8) {
        alert('Password harus minimal 8 karakter.');
        event.preventDefault();
        return false;
      }
    }
    
    return true;
  }

  console.log(form)
</script>

<svelte:head>
  <title>My Profile - PASTI</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">My Profile</h1>
    <p class="mt-1 text-sm text-gray-500">Kelola informasi profil dan keamanan akun Anda.</p>
  </div>

  <div class="bg-white shadow rounded-lg">
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">Profile Information</h2>
    </div>
    
    <div class="p-6">
      <form method="POST" use:enhance class="space-y-6" onsubmit={validatePasswordFields}>
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Left Column - Image Upload -->
          <div class="lg:col-span-1">
            <div class="space-y-4">
              <div>
                <label for="fotoFile" class="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                <input 
                  id="fotoFile"
                  type="file" 
                  name="picture" 
                  accept="image/*"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>
              
              <div class="text-center">
                {#if imagePreview}
                  <img src={imagePreview} alt="Preview" class="w-32 h-32 rounded-full mx-auto object-cover border-2 border-gray-200" />
                {:else}
                  <img src={$page.data.user?.avatar || '/images/def_user.png'} alt="Current Avatar" class="w-32 h-32 rounded-full mx-auto object-cover border-2 border-gray-200" />
                {/if}
              </div>
            </div>
          </div>
          
          <!-- Right Column - Form Fields -->
          <div class="lg:col-span-3 space-y-6">
            <!-- Person Name -->
            <div>
              <label for="personName" class="block text-sm font-medium text-gray-700 mb-2">Person Name</label>
              <input 
                id="personName" 
                type="text" 
                name="name" 
                value={$page.data.user?.name || 'Admin User Statis'} 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <!-- Username -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input 
                id="username" 
                type="text" 
                name="username" 
                value={$page.data.user?.username || 'admin'} 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <!-- System Role -->
            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 mb-2">System Role</label>
              <input 
                id="role" 
                type="text" 
                value="Administrator" 
                disabled
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
            
            <!-- Session Limit -->
            <div>
              <label for="sess" class="block text-sm font-medium text-gray-700 mb-2">Session Limit</label>
              <input 
                id="sess" 
                type="text" 
                value="1 Concurrent Login" 
                disabled
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
            
            <!-- Password Change Section -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              <p class="text-sm text-red-600 mb-4">*Must be at least 8 characters and contain 1 capital & 1 special character</p>
              
              <div class="space-y-4">
                <!-- Old Password -->
                <div>
                  <label for="oldPassword" class="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
                  <div class="relative">
                    <input 
                      id="oldPassword" 
                      type={showOldPassword ? 'text' : 'password'} 
                      name="oldPassword" 
                      placeholder="Password Lama"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button 
                      type="button" 
                      class="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
                      aria-label="Toggle old password visibility"
                      onclick={toggleOldPassword}
                    >
                      {#if showOldPassword}
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      {:else}
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      {/if}
                    </button>
                  </div>
                </div>
                
                <!-- New Password -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div class="relative">
                      <input 
                        id="password" 
                        type={showPassword1 ? 'text' : 'password'} 
                        name="password" 
                        placeholder="Password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button 
                        type="button" 
                        class="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
                        aria-label="Toggle new password visibility"
                        onclick={togglePassword1}
                      >
                        {#if showPassword1}
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        {:else}
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        {/if}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label for="password2" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div class="relative">
                      <input 
                        id="password2" 
                        type={showPassword2 ? 'text' : 'password'} 
                        name="password2" 
                        placeholder="Re-type Password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button 
                        type="button" 
                        class="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
                        aria-label="Toggle confirm password visibility"
                        onclick={togglePassword2}
                      >
                        {#if showPassword2}
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        {:else}
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        {/if}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Submit Button -->
              <div class="flex justify-end pt-6 border-t">
                {#if form?.error}
                  <div class="flex-1 text-red-600 text-sm">{form.error}</div>
                {/if}
                {#if form?.success}
                  <div class="flex-1 text-green-600 text-sm">{form.message}</div>
                {/if}
                <button 
                  type="submit" 
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
