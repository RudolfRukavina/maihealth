<template>
  <div>
    <!-- Hero -->
    <section class="pt-32 md:pt-40 pb-16 md:pb-20">
      <div class="container-narrow">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <span class="section-label">{{ $t('about.label') }}</span>
            <h1 class="text-4xl md:text-display-sm font-serif font-semibold text-charcoal mb-3">
              {{ $t('about.title') }}
            </h1>
            <p class="text-lg text-gold font-medium mb-8">{{ $t('about.subtitle') }}</p>
            <p class="text-body/80 leading-relaxed text-base mb-8">
              {{ $t('about.bio') }}
            </p>
            <blockquote class="border-l-2 border-gold/40 pl-5">
              <p class="text-lg font-serif italic text-charcoal/80 leading-relaxed">
                "{{ $t('about.philosophy') }}"
              </p>
            </blockquote>
          </div>

          <div class="lg:sticky lg:top-32">
            <div class="relative">
              <div class="aspect-[3/4] rounded-3xl overflow-hidden">
                <img src="/mai2.png" alt="Dr. med. Mai Wald" class="w-full h-full object-cover" />
              </div>
              <div class="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-sage/8 -z-10" />
              <div class="absolute -top-3 -left-3 w-14 h-14 rounded-full bg-mauve/10 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#FFFFFF" :variant="3" :height="70" />

    <!-- Education & Experience -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <!-- Education -->
          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">{{ $t('about.education_label') }}</h3>
            <div class="space-y-5">
              <div v-for="item in education" :key="item.title" class="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-sage/30">
                <h4 class="text-sm font-semibold text-charcoal">{{ item.title }}</h4>
                <p class="text-xs text-body/60 mt-0.5">{{ item.detail }}</p>
              </div>
            </div>
          </div>

          <!-- Experience -->
          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">{{ $t('about.experience_label') }}</h3>
            <div class="space-y-5">
              <div v-for="item in experience" :key="item" class="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-sage/30">
                <p class="text-sm text-body">{{ item }}</p>
              </div>
            </div>
          </div>

          <!-- Specializations -->
          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">{{ $t('about.specializations_label') }}</h3>
            <div class="space-y-5">
              <div v-for="item in specializations" :key="item" class="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-sage/30">
                <p class="text-sm text-body">{{ item }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="4" :height="60" />

    <!-- Memberships -->
    <section class="section-padding">
      <div class="container-narrow">
        <div class="max-w-2xl mx-auto text-center">
          <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-8">Memberships & Affiliations</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <div v-for="item in memberships" :key="item" class="px-5 py-3 rounded-full border border-stone/40 text-sm text-body">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#EEF1EA" :variant="1" :height="70" />

    <FinalCTA />
  </div>
</template>

<script setup>
useHead({
  title: 'Über mich — Dr. med. Mai Wald | MaiHealth',
  meta: [
    { name: 'description', content: 'Dr. med. Mai Wald — Ärztin für Funktionelle Medizin & Reizdarm. Ausbildung, Erfahrung und Spezialisierungen. Evidenzbasiert, individuell, ganzheitlich.' },
    { property: 'og:title', content: 'Über Dr. med. Mai Wald — MaiHealth' },
    { property: 'og:description', content: 'Ärztin für Funktionelle Medizin & Reizdarm. Ausbildung, Erfahrung und Spezialisierungen.' },
  ],
})

const education = [
  { title: 'Medical Degree (Dr. med.)', detail: 'University education in medicine' },
  { title: 'Functional Medicine Certification', detail: 'Institute for Functional Medicine (IFM), USA' },
  { title: 'Additional specialization training', detail: 'Preventive and sports medicine' },
]

const experience = [
  'Prevention and sports medicine',
  'Interventional cardiology',
  'Naturopathic medicine',
  'Clinical nutrition',
]

const specializations = [
  'Sport and performance medicine',
  'Nutritional medicine',
  'Orthomolecular medicine',
  'Naturopathic medicine',
  'Longevity medicine',
]

const memberships = [
  'Healthy Longevity Medicine Society (HLMS)',
  'Medical Chamber',
]
</script>
