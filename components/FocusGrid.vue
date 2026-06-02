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
          class="group relative p-5 sm:p-7 md:p-8 rounded-2xl bg-white border border-stone/20 transition-all duration-500 hover:border-sage/25 hover:shadow-lg hover:shadow-sage/[0.05] hover:-translate-y-0.5"
        >
          <div class="icon-box mb-4 sm:mb-5 w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl" :class="area.bgClass">
            <i :class="area.icon" class="text-sm sm:text-base" :style="{ color: area.iconColor }"></i>
          </div>

          <h3 class="text-sm sm:text-lg font-serif font-semibold text-charcoal mb-1.5 sm:mb-2.5 group-hover:text-sage transition-colors duration-300 leading-snug">
            {{ area.title }}
          </h3>

          <p class="text-xs sm:text-sm text-body/65 leading-relaxed hidden sm:block">
            {{ area.description }}
          </p>

          <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent rounded-b-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" :style="{ backgroundImage: `linear-gradient(to right, transparent, ${area.iconColor}40, transparent)` }" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n()

const areas = computed(() => [
  {
    key: 'cardiovascular',
    icon: 'fa-solid fa-heart-pulse',
    bgClass: 'bg-mauve-light',
    iconColor: '#C0A7B8',
    title: t('focus.areas.cardiovascular.title'),
    description: t('focus.areas.cardiovascular.description'),
  },
  {
    key: 'womens',
    icon: 'fa-solid fa-venus',
    bgClass: 'bg-mauve-light',
    iconColor: '#C0A7B8',
    title: t('focus.areas.womens.title'),
    description: t('focus.areas.womens.description'),
  },
  {
    key: 'gut',
    icon: 'fa-solid fa-bacteria',
    bgClass: 'bg-sage/10',
    iconColor: '#5C6E4A',
    title: t('focus.areas.gut.title'),
    description: t('focus.areas.gut.description'),
  },
  {
    key: 'autoimmune',
    icon: 'fa-solid fa-shield-virus',
    bgClass: 'bg-sage/10',
    iconColor: '#5C6E4A',
    title: t('focus.areas.autoimmune.title'),
    description: t('focus.areas.autoimmune.description'),
  },
  {
    key: 'performance',
    icon: 'fa-solid fa-bolt',
    bgClass: 'bg-cream-dark/60',
    iconColor: '#8B9A6B',
    title: t('focus.areas.performance.title'),
    description: t('focus.areas.performance.description'),
  },
  {
    key: 'nutrition',
    icon: 'fa-solid fa-leaf',
    bgClass: 'bg-sage/10',
    iconColor: '#5C6E4A',
    title: t('focus.areas.nutrition.title'),
    description: t('focus.areas.nutrition.description'),
  },
])
</script>
