<template>
  <div class="min-h-screen bg-cream">
    <!-- Top nav -->
    <header class="bg-white border-b border-stone/20">
      <div class="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/maihealth.svg" alt="MaiHealth" class="w-8 h-8" />
          <img src="/maihealthfull.svg" alt="MaiHealth" class="h-20 -ms-4 w-auto" />
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink to="/" class="text-sm font-medium text-body hover:text-charcoal transition-colors">
            {{ $t('nav.home') }}
          </NuxtLink>
          <NuxtLink to="/book" class="text-sm font-medium text-body hover:text-charcoal transition-colors">
            {{ $t('nav.book') }}
          </NuxtLink>
          <NuxtLink v-if="isAdmin" to="/portal/admin" class="text-sm font-medium text-sage hover:text-charcoal transition-colors">
            {{ $t('nav.admin') }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-4">
          <div v-if="user" class="flex items-center gap-3">
            <img v-if="user.photoURL" :src="user.photoURL" alt="" class="w-8 h-8 rounded-full" referrerpolicy="no-referrer" />
            <span class="hidden sm:inline text-sm text-body">{{ user.displayName }}</span>
          </div>
          <button @click="signOut" class="text-xs font-medium text-muted hover:text-charcoal transition-colors">
            {{ $t('auth.logout') }}
          </button>
        </div>
      </div>

      <!-- Mobile nav -->
      <div class="md:hidden border-t border-stone/10 flex">
        <NuxtLink to="/" class="flex-1 text-center py-3 text-xs font-medium text-body hover:text-charcoal hover:bg-cream/50 transition-colors">
          {{ $t('nav.home') }}
        </NuxtLink>
        <NuxtLink to="/book" class="flex-1 text-center py-3 text-xs font-medium text-body hover:text-charcoal hover:bg-cream/50 transition-colors">
          {{ $t('nav.book') }}
        </NuxtLink>
        <NuxtLink v-if="isAdmin" to="/portal/admin" class="flex-1 text-center py-3 text-xs font-medium text-sage hover:text-charcoal hover:bg-cream/50 transition-colors">
          {{ $t('nav.admin') }}
        </NuxtLink>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-5 md:px-8 py-8 md:py-12">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { user, isAdmin, signOut } = useAuth()
</script>
