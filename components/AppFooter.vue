<template>
  <footer class="bg-charcoal text-cream/70">
    <div class="container-narrow py-12 sm:py-16 md:py-20">
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">

        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-2.5 mb-4 sm:mb-5">
            <img src="/maihealth.svg" alt="MaiHealth" class="w-9 h-9 sm:w-10 sm:h-10 brightness-0 invert opacity-80" />
            <img src="/maihealthfull.svg" alt="MaiHealth" class="h-20 sm:h-24 md:h-28 -ms-5 w-auto brightness-0 invert opacity-80" />
          </div>
          <p class="text-xs sm:text-sm leading-relaxed text-cream/40 mb-5 sm:mb-6">
            {{ $t('footer.description') }}
          </p>
          <div class="flex gap-3">
            <a href="#" target="_blank" rel="noopener" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center hover:bg-sage hover:border-sage transition-all duration-300" aria-label="Instagram">
              <i class="fa-brands fa-instagram text-xs sm:text-sm"></i>
            </a>
            <a href="#" target="_blank" rel="noopener" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center hover:bg-sage hover:border-sage transition-all duration-300" aria-label="LinkedIn">
              <i class="fa-brands fa-linkedin-in text-xs sm:text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="text-[10px] sm:text-xs font-semibold text-cream/90 tracking-[0.15em] uppercase mb-4 sm:mb-5">{{ $t('footer.navigation') }}</h4>
          <ul class="space-y-2.5 sm:space-y-3">
            <li v-for="item in navItems" :key="item.to">
              <NuxtLink :to="item.to" class="text-xs sm:text-sm hover:text-cream transition-colors duration-200">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-[10px] sm:text-xs font-semibold text-cream/90 tracking-[0.15em] uppercase mb-4 sm:mb-5">{{ $t('footer.services') }}</h4>
          <ul class="space-y-2.5 sm:space-y-3">
            <li v-for="area in focusAreas" :key="area">
              <span class="text-xs sm:text-sm text-cream/50">{{ area }}</span>
            </li>
          </ul>
        </div>

        <!-- Hours + Legal -->
        <div>
          <h4 class="text-[10px] sm:text-xs font-semibold text-cream/90 tracking-[0.15em] uppercase mb-4 sm:mb-5">{{ $t('footer.hours_label') }}</h4>
          <p class="text-xs sm:text-sm mb-1">{{ $t('footer.hours') }}</p>
          <p class="text-[10px] sm:text-xs text-cream/30 mb-6 sm:mb-8">{{ $t('footer.hours_note') }}</p>

          <h4 class="text-[10px] sm:text-xs font-semibold text-cream/90 tracking-[0.15em] uppercase mb-4 sm:mb-5">{{ $t('footer.legal') }}</h4>
          <ul class="space-y-2.5 sm:space-y-3">
            <li><NuxtLink to="/impressum" class="text-xs sm:text-sm hover:text-cream transition-colors duration-200">{{ $t('footer.impressum') }}</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="text-xs sm:text-sm hover:text-cream transition-colors duration-200">{{ $t('footer.privacy') }}</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-cream/8 mt-10 sm:mt-14 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <p class="text-[10px] sm:text-xs text-cream/30">
          &copy; {{ new Date().getFullYear() }} Dr. med. Mai Wald — MaiHealth. {{ $t('footer.rights') }}
        </p>
        <button
          @click="scrollToTop"
          class="text-[10px] sm:text-xs text-cream/30 hover:text-cream/60 transition-colors duration-200 flex items-center gap-1.5 group"
        >
          <i class="fa-solid fa-arrow-up text-[10px] transition-transform duration-300 group-hover:-translate-y-0.5"></i>
          Back to top
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t } = useI18n()

const navItems = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/practice', label: t('nav.practice') },
  { to: '/corporate-health', label: t('nav.corporate') },
  { to: '/about', label: t('nav.about') },
  { to: '/contact', label: t('nav.contact') },
])

const focusAreas = computed(() => [
  t('focus.areas.cardiovascular.title'),
  t('focus.areas.womens.title'),
  t('focus.areas.gut.title'),
  t('focus.areas.autoimmune.title'),
  t('focus.areas.performance.title'),
  t('focus.areas.nutrition.title'),
])

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
