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
            <div class="aspect-[3/4] rounded-3xl overflow-hidden bg-cream-dark">
              <div class="w-full h-full flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-20 h-20 text-stone mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <p class="text-sm text-muted">Professional photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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

    <FinalCTA />
  </div>
</template>

<script setup>
useHead({ title: 'About — Dr. Mai Jimenez' })

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
