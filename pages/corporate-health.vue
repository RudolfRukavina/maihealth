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
              <component :is="service.icon" class="w-5 h-5 text-sage" />
            </div>
            <h3 class="text-lg font-serif font-semibold text-charcoal mb-3">{{ service.title }}</h3>
            <p class="text-sm text-body/70 leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#FFFFFF" :variant="3" :height="70" />

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
                <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-sm text-body leading-relaxed">{{ value }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="2" :height="60" />

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
              <span class="text-sm font-semibold text-gold">{{ index + 1 }}</span>
            </div>
            <h3 class="text-sm font-semibold text-charcoal mb-1.5">{{ step.title }}</h3>
            <p class="text-xs text-body/55 leading-relaxed">{{ step.description }}</p>
            <div v-if="index < process.length - 1" class="hidden md:block absolute top-6 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-[1px] bg-stone/40" />
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#2D3A24" :variant="4" :height="80" />

    <!-- CTA -->
    <section class="section-padding bg-charcoal">
      <div class="container-narrow">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-serif font-semibold text-cream mb-4">Ready to invest in your team's health?</h2>
          <p class="text-base text-cream/50 leading-relaxed mb-8">Every program is tailored to your organization's size, goals, and culture. Let's start with a conversation.</p>
          <NuxtLink to="/contact" class="inline-flex items-center justify-center px-8 py-3.5 bg-cream text-charcoal font-sans text-sm font-medium rounded-full hover:bg-cream/90 transition-all">
            {{ $t('corporate.cta') }}
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, tm } = useI18n()

useHead({ title: 'Corporate Health — Dr. Mai Jimenez' })

const IconUsers = defineComponent({
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>`
})
const IconStar = defineComponent({
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>`
})
const IconShield = defineComponent({
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>`
})
const IconHeart = defineComponent({
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>`
})

const services = computed(() => [
  { key: 'coaching', icon: IconUsers, title: t('corporate.services.coaching.title'), description: t('corporate.services.coaching.description') },
  { key: 'executive', icon: IconStar, title: t('corporate.services.executive.title'), description: t('corporate.services.executive.description') },
  { key: 'screening', icon: IconShield, title: t('corporate.services.screening.title'), description: t('corporate.services.screening.description') },
  { key: 'longterm', icon: IconHeart, title: t('corporate.services.longterm.title'), description: t('corporate.services.longterm.description') },
])

const values = computed(() => tm('corporate.values'))

const process = [
  { title: 'Risk Assessment', description: 'Early detection of risk factors' },
  { title: 'Medical Evaluation', description: 'Parameter prioritization' },
  { title: 'Action Plan', description: 'Immediate recommendations' },
  { title: 'Coaching', description: 'Sustained behavioral change' },
  { title: 'Follow-up', description: 'Screening and reassessment' },
]
</script>
