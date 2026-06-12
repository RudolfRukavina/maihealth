<template>
  <section class="section-padding bg-white">
    <div class="container-narrow">
      <div class="text-center mb-10 md:mb-14">
        <span class="section-label">{{ $t('services.label') }}</span>
        <h2 class="section-title">{{ $t('practice.phases_title') }}</h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        <div v-for="(phase, index) in phases" :key="phase.title" class="text-center relative">
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cream flex items-center justify-center mx-auto mb-4 sm:mb-5 border border-stone/30">
            <i :class="phase.icon" class="text-base sm:text-lg text-gold"></i>
          </div>
          <h3 class="text-sm sm:text-base font-serif font-semibold text-charcoal mb-1.5 sm:mb-2">{{ phase.title }}</h3>
          <p class="text-xs sm:text-sm text-body/60 leading-relaxed max-w-[200px] mx-auto">{{ phase.description }}</p>
          <div v-if="index < 3" class="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[1px] bg-stone/40" />
        </div>
      </div>

      <div class="text-center mt-8 sm:mt-10">
        <NuxtLink to="/book" class="btn-primary px-8 py-4 sm:px-9 sm:py-4 text-base sm:text-sm">
          <i class="fa-regular fa-calendar-check text-sm"></i>
          {{ $t('hero.cta_book') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm, rt } = useI18n()
const phases = computed(() => tm('practice.phases').map(obj => ({
  title: rt(obj.title),
  description: rt(obj.description),
  icon: rt(obj.icon),
})))
</script>
