<template>
  <div class="min-h-screen bg-cream flex items-center justify-center px-5">
    <div class="max-w-md w-full">
      <div class="text-center mb-10">
        <NuxtLink to="/" class="inline-flex items-center gap-2.5 mb-8">
          <img src="/maihealth.svg" alt="MaiHealth" class="w-10 h-10" />
          <img src="/maihealthfull.svg" alt="MaiHealth" class="h-24 -ms-5 w-auto" />
        </NuxtLink>
        <h1 class="text-3xl font-serif font-semibold text-charcoal mb-3">
          {{ $t('auth.login_title') }}
        </h1>
        <p class="text-base text-body/70 leading-relaxed">
          {{ $t('auth.login_subtitle') }}
        </p>
      </div>

      <div class="bg-white rounded-2xl border border-stone/30 p-8 shadow-sm">
        <button
          @click="handleLogin"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-stone/40 rounded-xl text-sm font-medium text-charcoal hover:bg-cream/50 hover:border-stone/60 transition-all duration-150 active:scale-[0.98]"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {{ $t('auth.google_login') }}
        </button>

        <p class="text-xs text-muted text-center mt-4">
          {{ $t('auth.login_note') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const { signInWithGoogle, isLoggedIn, isAdmin, loading } = useAuth()

const destination = () => (isAdmin.value ? '/portal/admin' : '/')

// If already signed in, leave the login page.
watch([isLoggedIn, loading], ([loggedIn, isLoading]) => {
  if (loggedIn && !isLoading) navigateTo(destination())
}, { immediate: true })

const handleLogin = async () => {
  try {
    await signInWithGoogle()
    await navigateTo(destination())
  } catch (err) {
    console.error('Login failed:', err)
  }
}
</script>
