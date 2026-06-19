<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-150',
      mobileOpen ? 'bg-cream' : scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent',
    ]"
  >
    <div class="container-narrow">
      <div class="flex items-center justify-between h-16 sm:h-20 md:h-[88px]">

        <NuxtLink to="/" class="flex items-center gap-2.5 group relative z-50" @click="mobileOpen = false">
          <img src="/maihealth.svg" alt="" aria-hidden="true" class="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-150 group-hover:scale-105" />
          <img src="/maihealthfull.svg" alt="MaiHealth" class="h-20 sm:h-24 md:h-28 -ms-5 w-auto" />
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-7">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-[13px] font-medium text-body hover:text-charcoal transition-colors duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-sage after:transition-all after:duration-150 hover:after:w-full"
          >
            {{ item.label }}
          </NuxtLink>

          <div class="relative" ref="langDropdown">
            <button
              @click="langOpen = !langOpen"
              class="flex items-center gap-1.5 text-[13px] font-medium text-body hover:text-charcoal transition-colors duration-150"
            >
              <i class="fa-solid fa-globe text-xs text-muted"></i>
              {{ locale.toUpperCase() }}
              <i class="fa-solid fa-chevron-down text-[9px] text-muted transition-transform duration-150" :class="{ 'rotate-180': langOpen }"></i>
            </button>
            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div v-if="langOpen" class="absolute right-0 top-full mt-3 bg-white rounded-xl shadow-xl shadow-charcoal/6 border border-stone/30 py-1.5 min-w-[150px]">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="switchLang(lang.code)"
                  :class="[
                    'w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 flex items-center gap-3',
                    locale === lang.code ? 'text-charcoal font-medium bg-sage-mist' : 'text-body hover:bg-cream',
                  ]"
                >
                  <span class="w-5 text-center text-xs font-mono text-muted">{{ lang.code.toUpperCase() }}</span>
                  {{ lang.name }}
                </button>
              </div>
            </Transition>
          </div>

          <NuxtLink v-if="isAdmin" to="/portal/admin" class="btn-primary text-xs px-6 py-2.5">
            <i class="fa-solid fa-sliders"></i>
            {{ $t('nav.admin') }}
          </NuxtLink>
          <NuxtLink v-else to="/book" class="btn-primary text-xs px-6 py-2.5">
            <i class="fa-regular fa-calendar-check"></i>
            {{ $t('nav.book') }}
          </NuxtLink>

          <!-- Guest: login link -->
          <NuxtLink
            v-if="!isLoggedIn"
            to="/login"
            class="flex items-center gap-1.5 text-[13px] font-medium text-body hover:text-charcoal transition-colors duration-150"
          >
            <i class="fa-solid fa-right-to-bracket text-xs"></i>
            {{ $t('nav.login') }}
          </NuxtLink>

          <!-- Logged in: user avatar menu -->
          <ClientOnly>
          <div v-if="isLoggedIn" class="relative" ref="userDropdown">
            <button
              @click="userOpen = !userOpen"
              class="flex items-center gap-2 group"
              :aria-expanded="userOpen"
              aria-label="Account menu"
            >
              <span class="relative">
                <img
                  v-if="user?.photoURL"
                  :src="user.photoURL"
                  alt=""
                  referrerpolicy="no-referrer"
                  class="w-9 h-9 rounded-full object-cover ring-2 ring-stone/20 group-hover:ring-sage/40 transition-all duration-150"
                />
                <span
                  v-else
                  class="w-9 h-9 rounded-full bg-sage/15 text-sage flex items-center justify-center text-sm font-semibold ring-2 ring-stone/20 group-hover:ring-sage/40 transition-all duration-150"
                >
                  {{ userInitials }}
                </span>
                <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-sage border-2 border-cream"></span>
              </span>
              <i class="fa-solid fa-chevron-down text-[9px] text-muted transition-transform duration-150" :class="{ 'rotate-180': userOpen }"></i>
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div v-if="userOpen" class="absolute right-0 top-full mt-3 bg-white rounded-xl shadow-xl shadow-charcoal/6 border border-stone/30 py-1.5 min-w-[230px]">
                <div class="px-4 py-3 border-b border-stone/15">
                  <p class="text-sm font-semibold text-charcoal truncate">{{ user?.displayName || $t('nav.account') }}</p>
                  <p class="text-xs text-muted truncate">{{ user?.email }}</p>
                  <span v-if="isAdmin" class="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-sage/10 text-sage">
                    {{ $t('nav.admin') }}
                  </span>
                </div>
                <NuxtLink
                  v-if="isAdmin"
                  to="/portal/admin"
                  @click="userOpen = false"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-body hover:bg-cream transition-colors duration-150"
                >
                  <i class="fa-solid fa-sliders text-xs text-muted w-4 text-center"></i>
                  {{ $t('nav.admin') }}
                </NuxtLink>
                <NuxtLink
                  v-if="!isAdmin"
                  to="/book"
                  @click="userOpen = false"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-body hover:bg-cream transition-colors duration-150"
                >
                  <i class="fa-regular fa-calendar-check text-xs text-muted w-4 text-center"></i>
                  {{ $t('nav.book') }}
                </NuxtLink>
                <div class="border-t border-stone/15 mt-1.5 pt-1.5">
                  <button
                    @click="handleLogout"
                    class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-body hover:bg-cream hover:text-red-500 transition-colors duration-150"
                  >
                    <i class="fa-solid fa-right-from-bracket text-xs w-4 text-center"></i>
                    {{ $t('auth.logout') }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>
          </ClientOnly>
        </nav>

        <!-- Mobile hamburger -->
        <button
          @click="toggleMobile"
          class="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
          :aria-expanded="mobileOpen"
        >
          <div class="flex flex-col gap-[5px]">
            <span :class="['w-5 h-[1.5px] bg-charcoal transition-all duration-150 origin-center', mobileOpen ? 'rotate-45 translate-y-[6.5px]' : '']" />
            <span :class="['w-5 h-[1.5px] bg-charcoal transition-all duration-150', mobileOpen ? 'opacity-0 scale-0' : '']" />
            <span :class="['w-5 h-[1.5px] bg-charcoal transition-all duration-150 origin-center', mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : '']" />
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu — full screen overlay -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-250 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="mobileOpen" class="lg:hidden fixed inset-0 top-16 sm:top-20 z-40 bg-cream overflow-y-auto">
        <div class="container-narrow flex flex-col min-h-full py-8 pb-12">
          <nav class="flex flex-col gap-1 flex-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              @click="closeMobile"
              class="text-2xl sm:text-3xl font-serif font-medium text-charcoal py-3 sm:py-4 flex items-center gap-4 border-b border-stone/15 last:border-b-0 transition-colors active:text-sage"
            >
              <i :class="item.icon" class="text-sm text-gold w-6 text-center"></i>
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div class="mt-8 pt-6 border-t border-stone/20 space-y-6">
            <!-- Logged-in user card -->
            <div v-if="isLoggedIn" class="flex items-center gap-3">
              <img
                v-if="user?.photoURL"
                :src="user.photoURL"
                alt=""
                referrerpolicy="no-referrer"
                class="w-12 h-12 rounded-full object-cover ring-2 ring-stone/20"
              />
              <span
                v-else
                class="w-12 h-12 rounded-full bg-sage/15 text-sage flex items-center justify-center text-base font-semibold ring-2 ring-stone/20"
              >
                {{ userInitials }}
              </span>
              <div class="min-w-0">
                <p class="text-base font-semibold text-charcoal truncate">{{ user?.displayName || $t('nav.account') }}</p>
                <p class="text-sm text-muted truncate">{{ user?.email }}</p>
              </div>
            </div>

            <div class="flex gap-2.5 flex-wrap">
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="switchLang(lang.code); closeMobile()"
                :class="[
                  'px-5 py-2.5 text-xs font-semibold rounded-full border transition-all duration-150',
                  locale === lang.code
                    ? 'bg-sage text-cream border-sage'
                    : 'border-stone text-body hover:border-sage hover:text-sage',
                ]"
              >
                {{ lang.name }}
              </button>
            </div>

            <NuxtLink v-if="isAdmin" to="/portal/admin" @click="closeMobile" class="btn-primary w-full text-center justify-center py-4 text-base">
              <i class="fa-solid fa-sliders"></i>
              {{ $t('nav.admin') }}
            </NuxtLink>
            <NuxtLink v-else to="/book" @click="closeMobile" class="btn-primary w-full text-center justify-center py-4 text-base">
              <i class="fa-regular fa-calendar-check"></i>
              {{ $t('nav.book') }}
            </NuxtLink>

            <NuxtLink v-if="!isLoggedIn" to="/login" @click="closeMobile" class="btn-secondary w-full text-center justify-center py-4 text-base">
              <i class="fa-solid fa-right-to-bracket"></i>
              {{ $t('nav.login') }}
            </NuxtLink>
            <button
              v-else
              @click="handleLogout"
              class="w-full text-center justify-center py-4 text-base flex items-center gap-2 font-medium text-muted hover:text-red-500 transition-colors duration-150"
            >
              <i class="fa-solid fa-right-from-bracket"></i>
              {{ $t('auth.logout') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const { t, locale, setLocale } = useI18n()
const { isLoggedIn, isAdmin, user, signOut } = useAuth()
const scrolled = ref(false)
const mobileOpen = ref(false)
const langOpen = ref(false)
const langDropdown = ref(null)
const userOpen = ref(false)
const userDropdown = ref(null)

const userInitials = computed(() => {
  const name = user.value?.displayName || user.value?.email || ''
  return name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('') || 'U'
})

const handleLogout = async () => {
  userOpen.value = false
  closeMobile()
  await signOut()
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
]

const navItems = computed(() => [
  { to: '/', label: t('nav.home'), icon: 'fa-solid fa-house' },
  { to: '/about', label: t('nav.about'), icon: 'fa-solid fa-user-doctor' },
  { to: '/contact', label: t('nav.contact'), icon: 'fa-solid fa-envelope' },
])

const switchLang = (code) => {
  setLocale(code)
  langOpen.value = false
}

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
  document.body.style.overflow = mobileOpen.value ? 'hidden' : ''
}

const closeMobile = () => {
  mobileOpen.value = false
  document.body.style.overflow = ''
}

const route = useRoute()
watch(() => route.path, () => { closeMobile(); userOpen.value = false })

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 40 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  const onClick = (e) => {
    if (langDropdown.value && !langDropdown.value.contains(e.target)) {
      langOpen.value = false
    }
    if (userDropdown.value && !userDropdown.value.contains(e.target)) {
      userOpen.value = false
    }
  }
  document.addEventListener('click', onClick)

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('click', onClick)
    document.body.style.overflow = ''
  })
})
</script>
