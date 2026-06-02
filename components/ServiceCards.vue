<template>
  <section class="section-padding bg-white">
    <div class="container-narrow">
      <div class="text-center mb-10 md:mb-16">
        <span class="section-label">{{ $t('services.label') }}</span>
        <h2 class="section-title">{{ $t('services.title') }}</h2>
        <p class="section-subtitle mx-auto">{{ $t('services.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        <div
          v-for="(card, index) in cards"
          :key="card.key"
          class="group relative bg-cream rounded-2xl p-6 sm:p-8 md:p-9 transition-all duration-500 border border-stone/20 hover:border-sage/25 hover:shadow-xl hover:shadow-sage/[0.06] hover:-translate-y-1"
        >
          <span class="text-[11px] font-sans font-semibold tracking-widest text-stone block mb-4">
            0{{ index + 1 }}
          </span>

          <div class="icon-box mb-4" :class="card.bgClass">
            <i :class="card.icon" :style="{ color: card.iconColor }"></i>
          </div>

          <h3 class="text-lg sm:text-xl font-serif font-semibold text-charcoal mb-2.5 group-hover:text-sage transition-colors duration-300">
            {{ card.title }}
          </h3>

          <p class="text-sm text-body/70 leading-relaxed mb-6">
            {{ card.description }}
          </p>

          <NuxtLink
            to="/practice"
            class="inline-flex items-center gap-2 text-sm font-medium text-charcoal/80 group-hover:text-sage transition-colors duration-300"
          >
            {{ card.cta }}
            <i class="fa-solid fa-arrow-right text-[10px] transition-transform duration-300 group-hover:translate-x-1"></i>
          </NuxtLink>

          <div class="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-sage/0 via-sage/40 to-sage/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n()

const cards = computed(() => [
  {
    key: 'diagnostics',
    icon: 'fa-solid fa-microscope',
    bgClass: 'bg-sage/10',
    iconColor: '#5C6E4A',
    title: t('services.cards.diagnostics.title'),
    description: t('services.cards.diagnostics.description'),
    cta: t('services.cards.diagnostics.cta'),
  },
  {
    key: 'analysis',
    icon: 'fa-solid fa-chart-line',
    bgClass: 'bg-mauve/15',
    iconColor: '#C0A7B8',
    title: t('services.cards.analysis.title'),
    description: t('services.cards.analysis.description'),
    cta: t('services.cards.analysis.cta'),
  },
  {
    key: 'coaching',
    icon: 'fa-solid fa-hand-holding-heart',
    bgClass: 'bg-sage/10',
    iconColor: '#5C6E4A',
    title: t('services.cards.coaching.title'),
    description: t('services.cards.coaching.description'),
    cta: t('services.cards.coaching.cta'),
  },
])
</script>
