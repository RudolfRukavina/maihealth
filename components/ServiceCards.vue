<template>
  <section class="section-padding bg-white">
    <div class="container-narrow">
      <div class="max-w-2xl mx-auto text-center lg:text-left">
        <span class="section-label">{{ $t('services.label') }}</span>
        <h2 class="section-title mb-4 sm:mb-5">{{ $t('services.title') }}</h2>

        <p class="text-base sm:text-base md:text-lg text-body/80 leading-relaxed mb-4 sm:mb-5">
          {{ $t('services.description') }}
        </p>

        <ul class="text-base sm:text-sm text-body/70 leading-relaxed space-y-2 mb-8 sm:mb-10 text-left">
          <li v-for="(point, i) in points" :key="i" class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-md bg-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i class="fa-solid fa-check text-[10px] text-sage"></i>
            </div>
            <span>{{ point }}</span>
          </li>
        </ul>

        <NuxtLink to="/book" class="btn-primary px-8 py-4 sm:px-9 sm:py-4 text-base sm:text-sm">
          <i class="fa-regular fa-calendar-check text-sm"></i>
          {{ $t('nav.book') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm, rt } = useI18n()
const points = computed(() => tm('services.points').map(p => rt(p)))
</script>
