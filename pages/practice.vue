<template>
  <div>
    <!-- Hero -->
    <section class="pt-32 md:pt-40 pb-16 md:pb-20">
      <div class="container-narrow">
        <div class="max-w-3xl">
          <span class="section-label">{{ $t('services.label') }}</span>
          <h1 class="text-4xl md:text-display-sm font-serif font-semibold text-charcoal mb-5">
            {{ $t('services.title') }}
          </h1>
          <p class="text-base md:text-lg text-body/80 leading-relaxed">
            {{ $t('services.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Service Pathways -->
    <section class="pb-20 md:pb-28">
      <div class="container-narrow">
        <div class="space-y-6">
          <div
            v-for="(service, index) in services"
            :key="service.key"
            class="bg-white rounded-2xl border border-stone/30 p-8 md:p-12 transition-all duration-300 hover:shadow-lg hover:shadow-charcoal/[0.03]"
          >
            <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sage/10 text-sage font-serif font-bold text-lg mb-4">
                  {{ index + 1 }}
                </span>
                <h2 class="text-xl md:text-2xl font-serif font-semibold text-charcoal">
                  {{ service.title }}
                </h2>
              </div>
              <div>
                <p class="text-body/75 leading-relaxed mb-6">{{ service.description }}</p>
                <ul class="space-y-2">
                  <li v-for="detail in service.details" :key="detail" class="flex items-start gap-3 text-sm text-body/70">
                    <i class="fa-solid fa-check text-sage text-xs mt-1 flex-shrink-0"></i>
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#FFFFFF" :variant="1" />

    <!-- Patient Journey -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="text-center mb-14">
          <span class="section-label">{{ $t('focus.label') }}</span>
          <h2 class="section-title">{{ $t('practice.phases_title') }}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="(phase, index) in phases" :key="phase.title" class="text-center relative">
            <div class="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mx-auto mb-5 border border-stone/30">
              <i :class="phase.icon" class="text-lg text-gold"></i>
            </div>
            <h3 class="text-base font-serif font-semibold text-charcoal mb-2">{{ phase.title }}</h3>
            <p class="text-xs text-body/60 leading-relaxed">{{ phase.description }}</p>
            <div v-if="index < 3" class="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[1px] bg-stone/40" />
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="3" />

    <!-- Focus Areas -->
    <FocusGrid />

    <WaveDivider fromColor="#F5F1EC" toColor="#FFFFFF" :variant="2" />

    <!-- Diagnostics & Treatment -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">{{ $t('practice.diagnostics_label') }}</h3>
            <div class="space-y-3">
              <div v-for="item in diagnostics" :key="item" class="flex items-start gap-3 p-3 rounded-lg hover:bg-cream transition-colors">
                <i class="fa-solid fa-flask text-sage text-sm flex-shrink-0 mt-0.5"></i>
                <span class="text-sm text-body">{{ item }}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">{{ $t('practice.treatments_label') }}</h3>
            <div class="space-y-3">
              <div v-for="item in treatments" :key="item" class="flex items-start gap-3 p-3 rounded-lg hover:bg-cream transition-colors">
                <i class="fa-solid fa-heart text-mauve text-sm flex-shrink-0 mt-0.5"></i>
                <span class="text-sm text-body">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="4" />

    <!-- Insurance Note -->
    <section class="py-12">
      <div class="container-narrow">
        <div class="max-w-2xl mx-auto bg-cream-dark/60 rounded-2xl p-6 md:p-8 border border-stone/20">
          <h3 class="text-sm font-semibold text-charcoal mb-2">{{ $t('practice.insurance_title') }}</h3>
          <p class="text-sm text-body/70 leading-relaxed">{{ $t('practice.insurance_text') }}</p>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#EEF1EA" :variant="1" />

    <FinalCTA />
  </div>
</template>

<script setup>
const { t, tm, rt } = useI18n()

useHead({
  title: computed(() => t('meta.practice.title')),
  meta: [
    { name: 'description', content: computed(() => t('meta.practice.description')) },
    { property: 'og:title', content: computed(() => t('meta.practice.og_title')) },
    { property: 'og:description', content: computed(() => t('meta.practice.og_description')) },
  ],
})

const resolveArray = (key) => tm(key).map(i => rt(i))
const resolveObjectArray = (key, fields) => tm(key).map(obj => {
  const resolved = {}
  for (const f of fields) resolved[f] = rt(obj[f])
  return resolved
})

const services = computed(() => [
  {
    key: 'diagnostics',
    title: t('services.cards.diagnostics.title'),
    description: t('services.cards.diagnostics.description'),
    details: resolveArray('services.cards.diagnostics.details'),
  },
  {
    key: 'analysis',
    title: t('services.cards.analysis.title'),
    description: t('services.cards.analysis.description'),
    details: resolveArray('services.cards.analysis.details'),
  },
  {
    key: 'coaching',
    title: t('services.cards.coaching.title'),
    description: t('services.cards.coaching.description'),
    details: resolveArray('services.cards.coaching.details'),
  },
])

const phases = computed(() => resolveObjectArray('practice.phases', ['title', 'description', 'icon']))
const diagnostics = computed(() => resolveArray('practice.diagnostics'))
const treatments = computed(() => resolveArray('practice.treatments'))
</script>
