<template>
  <section class="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-cream via-cream to-cream-dark/30" />
    <div class="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-sage/[0.04] blur-[100px]" />
    <div class="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-mauve/[0.06] blur-[80px]" />

    <div class="container-narrow relative z-10 pt-24 pb-12 sm:pt-28 sm:pb-16 md:py-0">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">

        <div class="max-w-xl text-center lg:text-left mx-auto lg:mx-0 order-2 lg:order-1">
          <h1 ref="titleEl" class="text-[1.75rem] leading-[1.15] sm:text-4xl md:text-display-sm xl:text-display font-serif font-bold text-charcoal text-balance mb-5 opacity-0">
            {{ $t('hero.title') }}
          </h1>

          <p ref="subtitleEl" class="text-sm sm:text-base md:text-lg text-body/80 leading-relaxed mb-8 opacity-0">
            {{ $t('hero.subtitle') }}
          </p>

          <div ref="buttonsEl" class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-center lg:justify-start opacity-0">
            <NuxtLink to="/contact" class="btn-primary px-7 py-3 sm:px-9 sm:py-4 justify-center">
              <i class="fa-regular fa-calendar-check text-sm"></i>
              {{ $t('hero.cta_book') }}
            </NuxtLink>
            <NuxtLink to="/practice" class="btn-secondary px-7 py-3 sm:px-9 sm:py-4 justify-center">
              {{ $t('hero.cta_learn') }}
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </NuxtLink>
          </div>

          <div ref="badgesEl" class="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-stone/30 opacity-0">
            <div class="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted">
              <i class="fa-solid fa-shield-halved text-sage text-xs"></i>
              <span>Evidence-based</span>
            </div>
            <div class="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted">
              <i class="fa-solid fa-video text-sage text-xs"></i>
              <span>Telemedicine</span>
            </div>
            <div class="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted">
              <i class="fa-solid fa-earth-europe text-sage text-xs"></i>
              <span>4 Languages</span>
            </div>
          </div>
        </div>

        <!-- Photo -->
        <div ref="blobEl" class="flex justify-center items-center order-1 lg:order-2 opacity-0">
          <div class="relative">
            <div class="absolute -inset-4 hero-blob bg-gradient-to-br from-sage/8 via-mauve/5 to-sage/8 hidden lg:block" />

            <div class="relative hero-blob w-[240px] h-[280px] sm:w-[280px] sm:h-[330px] lg:w-[420px] lg:h-[500px] xl:w-[460px] xl:h-[540px] overflow-hidden shadow-xl lg:shadow-2xl shadow-charcoal/8">
              <img src="/mai2.png" alt="Dr. Mai Jimenez" class="w-full h-full object-cover" />
            </div>

            <!-- Floating badge — desktop only -->
            <div class="hidden lg:flex absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl shadow-charcoal/6 px-5 py-3.5 items-center gap-3 border border-stone/15">
              <div class="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                <i class="fa-solid fa-heart-pulse text-sage"></i>
              </div>
              <div>
                <p class="text-xs font-semibold text-charcoal">Functional Medicine</p>
                <p class="text-[10px] text-muted">& Longevity Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const titleEl = ref(null)
const subtitleEl = ref(null)
const buttonsEl = ref(null)
const badgesEl = ref(null)
const blobEl = ref(null)

onMounted(async () => {
  const { gsap } = await import('gsap')
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.fromTo(blobEl.value, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, 0.1)
    .fromTo(titleEl.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.4)
    .fromTo(subtitleEl.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
    .fromTo(buttonsEl.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
    .fromTo(badgesEl.value, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
})
</script>
