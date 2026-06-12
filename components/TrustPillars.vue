<template>
  <section class="py-12 md:py-20 bg-charcoal relative overflow-hidden">
    <div class="absolute inset-0 hidden md:block">
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-sage/[0.06] blur-[120px]" />
      <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-mauve/[0.04] blur-[100px]" />
    </div>

    <div class="container-narrow relative z-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        <div
          v-for="pillar in pillars"
          :key="pillar.key"
          class="text-center group"
        >
          <div class="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-5" :class="pillar.bgClass">
            <i :class="pillar.icon" class="text-base sm:text-xl md:text-2xl" :style="{ color: pillar.iconColor }"></i>
          </div>

          <h3 class="text-xs font-sans font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase text-cream/90 mb-1.5 sm:mb-2.5">
            {{ pillar.title }}
          </h3>

          <p class="text-sm text-cream/50 leading-relaxed max-w-[220px] mx-auto">
            {{ pillar.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n()

const pillars = computed(() => [
  {
    key: 'individual',
    icon: 'fa-solid fa-hand-holding-medical',
    bgClass: 'bg-sage/15',
    iconColor: '#A8B58E',
    title: t('trust.individual.title'),
    description: t('trust.individual.description'),
  },
  {
    key: 'holistic',
    icon: 'fa-solid fa-infinity',
    bgClass: 'bg-mauve/15',
    iconColor: '#C0A7B8',
    title: t('trust.holistic.title'),
    description: t('trust.holistic.description'),
  },
  {
    key: 'knowledge',
    icon: 'fa-solid fa-lightbulb',
    bgClass: 'bg-cream/10',
    iconColor: '#CFC3B5',
    title: t('trust.knowledge.title'),
    description: t('trust.knowledge.description'),
  },
  {
    key: 'heart',
    icon: 'fa-solid fa-heart',
    bgClass: 'bg-sage/15',
    iconColor: '#A8B58E',
    title: t('trust.heart.title'),
    description: t('trust.heart.description'),
  },
])
</script>
