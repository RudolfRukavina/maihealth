<template>
  <section class="section-padding bg-sage-mist">
    <div class="container-narrow">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
        <div class="lg:sticky lg:top-32">
          <span class="section-label">{{ $t('benefits.label') }}</span>
          <h2 class="section-title mb-3">{{ $t('benefits.title') }}</h2>
          <p class="section-subtitle mt-0 mb-6 lg:mb-8">{{ $t('benefits.subtitle') }}</p>
          <NuxtLink to="/practice" class="btn-secondary hidden lg:inline-flex">
            {{ $t('hero.cta_learn') }}
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </NuxtLink>
        </div>

        <div class="space-y-2">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white/60 hover:bg-white transition-colors duration-150 group border border-transparent hover:border-stone/15"
          >
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-sage/15 transition-colors duration-150">
              <i class="fa-solid fa-check text-[10px] sm:text-xs text-sage"></i>
            </div>
            <p class="text-sm text-body leading-relaxed pt-0.5 sm:pt-1">{{ item }}</p>
          </div>
        </div>

        <NuxtLink to="/practice" class="btn-secondary lg:hidden inline-flex">
          {{ $t('hero.cta_learn') }}
          <i class="fa-solid fa-arrow-right text-xs"></i>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm } = useI18n()
const items = computed(() => tm('benefits.items'))
</script>
