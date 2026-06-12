<template>
  <section class="section-padding">
    <div class="container-narrow">
      <div class="text-center mb-10 md:mb-16">
        <span class="section-label">{{ $t('focus.label') }}</span>
        <h2 class="section-title">{{ $t('focus.title') }}</h2>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
        <div
          v-for="area in areas"
          :key="area.key"
          class="group relative p-5 sm:p-7 md:p-8 rounded-2xl bg-white border border-stone/20 transition-all duration-200 hover:border-sage/25 hover:shadow-lg hover:shadow-sage/[0.05] hover:-translate-y-0.5 overflow-hidden"
        >
          <div class="icon-box mb-4 sm:mb-5 w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl" :class="area.bgClass">
            <i :class="area.icon" class="text-sm sm:text-base" :style="{ color: area.iconColor }"></i>
          </div>

          <h3 class="text-base sm:text-lg font-serif font-semibold text-charcoal mb-1.5 sm:mb-2.5 group-hover:text-sage transition-colors duration-150 leading-snug break-words">
            {{ area.title }}
          </h3>

          <p class="text-sm text-body/65 leading-relaxed hidden sm:block">
            {{ area.description }}
          </p>

          <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent rounded-b-2xl transition-opacity duration-200 opacity-0 group-hover:opacity-100" :style="{ backgroundImage: `linear-gradient(to right, transparent, ${area.iconColor}40, transparent)` }" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n()

const areas = computed(() => [
  {
    key: 'ibs',
    icon: 'fa-solid fa-heart-pulse',
    bgClass: 'bg-mauve-light',
    iconColor: '#C0A7B8',
    title: t('focus.areas.ibs.title'),
    description: t('focus.areas.ibs.description'),
  },
  {
    key: 'sibo',
    icon: 'fa-solid fa-bacteria',
    bgClass: 'bg-sage/10',
    iconColor: '#5C6E4A',
    title: t('focus.areas.sibo.title'),
    description: t('focus.areas.sibo.description'),
  },
  {
    key: 'microbiome',
    icon: 'fa-solid fa-microscope',
    bgClass: 'bg-sage/10',
    iconColor: '#5C6E4A',
    title: t('focus.areas.microbiome.title'),
    description: t('focus.areas.microbiome.description'),
  },
  {
    key: 'food',
    icon: 'fa-solid fa-wheat-awn',
    bgClass: 'bg-cream-dark/60',
    iconColor: '#8B9A6B',
    title: t('focus.areas.food.title'),
    description: t('focus.areas.food.description'),
  },
  {
    key: 'gutbrain',
    icon: 'fa-solid fa-brain',
    bgClass: 'bg-mauve-light',
    iconColor: '#C0A7B8',
    title: t('focus.areas.gutbrain.title'),
    description: t('focus.areas.gutbrain.description'),
  },
  {
    key: 'leakygut',
    icon: 'fa-solid fa-shield-virus',
    bgClass: 'bg-sage/10',
    iconColor: '#5C6E4A',
    title: t('focus.areas.leakygut.title'),
    description: t('focus.areas.leakygut.description'),
  },
])
</script>
