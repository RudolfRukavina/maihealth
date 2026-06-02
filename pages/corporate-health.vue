<template>
  <div>
    <!-- Hero -->
    <section class="pt-32 md:pt-40 pb-16 md:pb-20">
      <div class="container-narrow">
        <div class="max-w-3xl">
          <span class="section-label">{{ $t('corporate.label') }}</span>
          <h1 class="text-4xl md:text-display-sm font-serif font-semibold text-charcoal mb-5">
            {{ $t('corporate.title') }}
          </h1>
          <p class="text-base md:text-lg text-body/80 leading-relaxed">
            {{ $t('corporate.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="pb-20 md:pb-28">
      <div class="container-narrow">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="service in services"
            :key="service.key"
            class="bg-white rounded-2xl border border-stone/30 p-8 md:p-10 transition-all duration-300 hover:shadow-lg hover:shadow-charcoal/[0.03] hover:-translate-y-0.5"
          >
            <div class="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center mb-5">
              <i :class="service.icon" class="text-sage"></i>
            </div>
            <h3 class="text-lg font-serif font-semibold text-charcoal mb-3">{{ service.title }}</h3>
            <p class="text-sm text-body/70 leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#FFFFFF" :variant="3" />

    <!-- Value Propositions -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span class="section-label">Benefits</span>
            <h2 class="section-title mb-4">Why invest in workplace health?</h2>
            <p class="text-body/70 leading-relaxed">Evidence-based programs that deliver measurable returns through improved employee wellbeing, reduced absenteeism, and stronger leadership resilience.</p>
          </div>

          <div class="space-y-4">
            <div
              v-for="(value, index) in values"
              :key="index"
              class="flex items-start gap-4 p-4 rounded-xl bg-cream/50"
            >
              <div class="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="fa-solid fa-check text-gold text-xs"></i>
              </div>
              <p class="text-sm text-body leading-relaxed">{{ value }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="2" />

    <!-- Process -->
    <section class="section-padding">
      <div class="container-narrow">
        <div class="text-center mb-14">
          <span class="section-label">Process</span>
          <h2 class="section-title">How we work with your organization</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div v-for="(step, index) in process" :key="step.title" class="text-center relative">
            <div class="w-12 h-12 rounded-full bg-white border border-stone/30 flex items-center justify-center mx-auto mb-4">
              <i :class="step.icon" class="text-sm text-gold"></i>
            </div>
            <h3 class="text-sm font-semibold text-charcoal mb-1.5">{{ step.title }}</h3>
            <p class="text-xs text-body/55 leading-relaxed">{{ step.description }}</p>
            <div v-if="index < process.length - 1" class="hidden md:block absolute top-6 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-[1px] bg-stone/40" />
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#2D3A24" :variant="4" />

    <!-- CTA -->
    <section class="section-padding bg-charcoal">
      <div class="container-narrow">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-serif font-semibold text-cream mb-4">Ready to invest in your team's health?</h2>
          <p class="text-base text-cream/50 leading-relaxed mb-8">Every program is tailored to your organization's size, goals, and culture. Let's start with a conversation.</p>
          <NuxtLink to="/contact" class="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-cream text-charcoal font-sans text-sm font-medium rounded-full hover:bg-cream/90 transition-all">
            {{ $t('corporate.cta') }}
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, tm } = useI18n()

useHead({
  title: 'Corporate Health — MaiHealth | Dr. med. Mai Wald',
  meta: [
    { name: 'description', content: 'Betriebliche Gesundheitsprogramme von Dr. med. Mai Wald. Mitarbeiter-Coaching, Executive Health, präventive Screenings & langfristiges Gesundheitsmanagement.' },
    { property: 'og:title', content: 'Corporate Health — MaiHealth' },
    { property: 'og:description', content: 'Betriebliche Gesundheitsprogramme: Mitarbeiter-Coaching, Executive Health & präventive Screenings.' },
  ],
})

const services = computed(() => [
  { key: 'coaching', icon: 'fa-solid fa-users', title: t('corporate.services.coaching.title'), description: t('corporate.services.coaching.description') },
  { key: 'executive', icon: 'fa-solid fa-star', title: t('corporate.services.executive.title'), description: t('corporate.services.executive.description') },
  { key: 'screening', icon: 'fa-solid fa-shield-halved', title: t('corporate.services.screening.title'), description: t('corporate.services.screening.description') },
  { key: 'longterm', icon: 'fa-solid fa-hand-holding-heart', title: t('corporate.services.longterm.title'), description: t('corporate.services.longterm.description') },
])

const values = computed(() => tm('corporate.values'))

const process = [
  { title: 'Risk Assessment', description: 'Early detection of risk factors', icon: 'fa-solid fa-magnifying-glass-chart' },
  { title: 'Medical Evaluation', description: 'Parameter prioritization', icon: 'fa-solid fa-stethoscope' },
  { title: 'Action Plan', description: 'Immediate recommendations', icon: 'fa-solid fa-clipboard-list' },
  { title: 'Coaching', description: 'Sustained behavioral change', icon: 'fa-solid fa-comments' },
  { title: 'Follow-up', description: 'Screening and reassessment', icon: 'fa-solid fa-chart-line' },
]
</script>
