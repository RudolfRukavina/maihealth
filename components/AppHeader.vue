<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      mobileOpen ? 'bg-cream' : scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent',
    ]"
  >
    <div class="container-narrow">
      <div class="flex items-center justify-between h-16 sm:h-20 md:h-[88px]">

        <NuxtLink to="/" class="flex items-center gap-2.5 group relative z-50" @click="mobileOpen = false">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-sage flex items-center justify-center text-cream text-xs sm:text-sm font-serif font-bold tracking-tight transition-transform duration-300 group-hover:scale-105">
            MJ
          </div>
          <div>
            <span class="text-base sm:text-lg md:text-xl font-serif font-semibold text-charcoal leading-none block">
              Dr. Mai Jimenez
            </span>
            <span class="text-[9px] sm:text-[10px] font-sans font-medium tracking-[0.12em] uppercase text-gold leading-none mt-0.5 block">
              Functional Medicine
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-7">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-[13px] font-medium text-body hover:text-charcoal transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-sage after:transition-all after:duration-300 hover:after:w-full"
          >
            {{ item.label }}
          </NuxtLink>

          <div class="relative" ref="langDropdown">
            <button
              @click="langOpen = !langOpen"
              class="flex items-center gap-1.5 text-[13px] font-medium text-body hover:text-charcoal transition-colors duration-200"
            >
              <i class="fa-solid fa-globe text-xs text-muted"></i>
              {{ locale.toUpperCase() }}
              <i class="fa-solid fa-chevron-down text-[9px] text-muted transition-transform duration-200" :class="{ 'rotate-180': langOpen }"></i>
            </button>
            <Transition
              enter-active-class="transition duration-200 ease-out"
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

          <NuxtLink to="/contact" class="btn-primary text-xs px-6 py-2.5">
            <i class="fa-regular fa-calendar-check"></i>
            {{ $t('nav.book') }}
          </NuxtLink>
        </nav>

        <!-- Mobile hamburger -->
        <button
          @click="toggleMobile"
          class="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div class="flex flex-col gap-[5px]">
            <span :class="['w-5 h-[1.5px] bg-charcoal transition-all duration-300 origin-center', mobileOpen ? 'rotate-45 translate-y-[6.5px]' : '']" />
            <span :class="['w-5 h-[1.5px] bg-charcoal transition-all duration-300', mobileOpen ? 'opacity-0 scale-0' : '']" />
            <span :class="['w-5 h-[1.5px] bg-charcoal transition-all duration-300 origin-center', mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : '']" />
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu — full screen overlay -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
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
            <div class="flex gap-2.5 flex-wrap">
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="switchLang(lang.code); closeMobile()"
                :class="[
                  'px-5 py-2.5 text-xs font-semibold rounded-full border transition-all duration-200',
                  locale === lang.code
                    ? 'bg-sage text-cream border-sage'
                    : 'border-stone text-body hover:border-sage hover:text-sage',
                ]"
              >
                {{ lang.name }}
              </button>
            </div>

            <NuxtLink to="/contact" @click="closeMobile" class="btn-primary w-full text-center justify-center py-4 text-base">
              <i class="fa-regular fa-calendar-check"></i>
              {{ $t('nav.book') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const { t, locale, setLocale } = useI18n()
const scrolled = ref(false)
const mobileOpen = ref(false)
const langOpen = ref(false)
const langDropdown = ref(null)

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'hr', name: 'Hrvatski' },
  { code: 'it', name: 'Italiano' },
]

const navItems = computed(() => [
  { to: '/', label: t('nav.home'), icon: 'fa-solid fa-house' },
  { to: '/practice', label: t('nav.practice'), icon: 'fa-solid fa-stethoscope' },
  { to: '/corporate-health', label: t('nav.corporate'), icon: 'fa-solid fa-building' },
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
watch(() => route.path, () => closeMobile())

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 40 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  const onClick = (e) => {
    if (langDropdown.value && !langDropdown.value.contains(e.target)) {
      langOpen.value = false
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
