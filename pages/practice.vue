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

    <WaveDivider fromColor="#F5F1EC" toColor="#FFFFFF" :variant="1" :height="70" />

    <!-- Patient Journey -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="text-center mb-14">
          <span class="section-label">Your Journey</span>
          <h2 class="section-title">Four phases to better health</h2>
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

    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="3" :height="60" />

    <!-- Focus Areas -->
    <FocusGrid />

    <WaveDivider fromColor="#F5F1EC" toColor="#FFFFFF" :variant="2" :height="70" />

    <!-- Diagnostics & Treatment -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">Diagnostic Methods</h3>
            <div class="space-y-3">
              <div v-for="item in diagnostics" :key="item" class="flex items-start gap-3 p-3 rounded-lg hover:bg-cream transition-colors">
                <i class="fa-solid fa-flask text-sage text-sm flex-shrink-0 mt-0.5"></i>
                <span class="text-sm text-body">{{ item }}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">Treatment Components</h3>
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

    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="4" :height="60" />

    <!-- FM vs Longevity -->
    <section class="section-padding">
      <div class="container-narrow">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-2xl border border-stone/30 p-8 md:p-10">
            <div class="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center mb-5">
              <i class="fa-solid fa-magnifying-glass text-sage"></i>
            </div>
            <h3 class="text-xl font-serif font-semibold text-charcoal mb-3">Functional Medicine</h3>
            <p class="text-sm text-body/70 leading-relaxed">The diagnostic and treatment methodology addressing root causes. It examines how interconnected body systems contribute to disease and uses that understanding to create targeted interventions.</p>
          </div>

          <div class="bg-white rounded-2xl border border-stone/30 p-8 md:p-10">
            <div class="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
              <i class="fa-solid fa-sun text-gold"></i>
            </div>
            <h3 class="text-xl font-serif font-semibold text-charcoal mb-3">Longevity Medicine</h3>
            <p class="text-sm text-body/70 leading-relaxed">The overarching objective of maximizing healthy lifespan through preventive strategies. It combines functional medicine diagnostics with proactive interventions to delay aging and maintain vitality.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Insurance Note -->
    <section class="pb-12">
      <div class="container-narrow">
        <div class="max-w-2xl mx-auto bg-cream-dark/60 rounded-2xl p-6 md:p-8 border border-stone/20">
          <h3 class="text-sm font-semibold text-charcoal mb-2">Insurance & Payment</h3>
          <p class="text-sm text-body/70 leading-relaxed">Services are typically not covered by statutory health insurance. Some private insurance plans may offer partial coverage depending on your policy terms. Most patients are self-paying. Detailed invoices are provided for potential reimbursement claims.</p>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#EEF1EA" :variant="1" :height="70" />

    <FinalCTA />
  </div>
</template>

<script setup>
const { t } = useI18n()

useHead({
  title: 'Praxis & Leistungen — MaiHealth | Dr. med. Mai Wald',
  meta: [
    { name: 'description', content: 'Funktionelle Diagnostik, Laborwert-Analyse & laufende Gesundheitsbetreuung. Individuelle Therapiepläne für Reizdarm, Darmgesundheit und ganzheitliche Medizin.' },
    { property: 'og:title', content: 'Praxis & Leistungen — MaiHealth' },
    { property: 'og:description', content: 'Funktionelle Diagnostik, Laborwert-Analyse & laufende Gesundheitsbetreuung bei Dr. med. Mai Wald.' },
  ],
})

const services = computed(() => [
  {
    key: 'diagnostics',
    title: t('services.cards.diagnostics.title'),
    description: t('services.cards.diagnostics.description'),
    details: [
      'Extended blood biomarker panel',
      'Hormonal balance assessment',
      'Nutritional status testing',
      'Personalized therapy plan',
      'Targeted supplementation protocols',
    ],
  },
  {
    key: 'analysis',
    title: t('services.cards.analysis.title'),
    description: t('services.cards.analysis.description'),
    details: [
      'Review of current and previous results',
      'One-on-one consultation',
      'Individualized health plan development',
      'Available in-person or via telemedicine',
    ],
  },
  {
    key: 'coaching',
    title: t('services.cards.coaching.title'),
    description: t('services.cards.coaching.description'),
    details: [
      'Monthly progress consultations',
      'Ongoing plan adjustments',
      'Nutrition and lifestyle coaching',
      'Nationwide telemedicine available',
    ],
  },
])

const phases = [
  { title: 'Initial Consultation', description: 'Comprehensive patient history — in-person or telemedical.', icon: 'fa-solid fa-comments' },
  { title: 'Individualized Diagnostics', description: 'Testing tailored to your specific health situation.', icon: 'fa-solid fa-microscope' },
  { title: 'Therapy & Prevention Plan', description: 'Structured, evidence-based plan development.', icon: 'fa-solid fa-clipboard-list' },
  { title: 'Ongoing Monitoring', description: 'Progress tracking with plan adjustments.', icon: 'fa-solid fa-chart-line' },
]

const diagnostics = [
  'Advanced blood biomarker analysis',
  'Hormonal balance assessment',
  'Cardiovascular-metabolic evaluation',
  'Nutritional status testing',
  'Genetic examinations',
  'Inflammatory marker screening',
  'Detailed patient history collection',
]

const treatments = [
  'Nutritional counseling',
  'Sleep optimization strategies',
  'Exercise programming',
  'Stress regulation techniques',
  'Targeted supplementation',
  'Pharmaceutical interventions when necessary',
]
</script>
