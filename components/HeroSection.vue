<template>
  <section class="relative h-dvh lg:min-h-screen lg:h-auto flex items-center overflow-hidden bg-cream">
    <div class="absolute inset-0 bg-gradient-to-br from-cream via-cream to-cream-dark/30" />
    <div class="absolute top-20 left-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-sage/[0.04] blur-[60px] md:blur-[100px]" />
    <div class="absolute bottom-20 right-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-mauve/[0.06] blur-[50px] md:blur-[80px]" />

    <div class="container-narrow relative z-10 pt-20 pb-6 sm:pt-28 sm:pb-16 md:py-0 h-full lg:h-auto flex flex-col justify-center">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

        <div class="max-w-xl text-center lg:text-left mx-auto lg:mx-0 lg:order-1">
          <h1 class="hero-fade hero-fade-1 text-display-hero sm:text-4xl md:text-display-sm xl:text-display font-serif font-bold text-charcoal text-balance mb-5 sm:mb-5">
            {{ $t('hero.title') }}
          </h1>

          <p class="hero-fade hero-fade-2 text-base sm:text-base md:text-lg text-body/80 leading-relaxed mb-8 sm:mb-8">
            {{ $t('hero.subtitle') }}
          </p>

          <div class="hero-fade hero-fade-3 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-center lg:justify-start">
            <NuxtLink to="/contact" class="btn-primary px-8 py-4 sm:px-9 sm:py-4 text-base sm:text-sm justify-center">
              <i class="fa-regular fa-calendar-check text-sm"></i>
              {{ $t('hero.cta_book') }}
            </NuxtLink>
            <NuxtLink to="/practice" class="btn-secondary px-8 py-4 sm:px-9 sm:py-4 text-base sm:text-sm justify-center">
              {{ $t('hero.cta_learn') }}
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </NuxtLink>
          </div>

          <div class="hero-fade hero-fade-4 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 lg:mt-10 pt-5 lg:pt-8 border-t border-stone/30">
            <div class="flex items-center gap-1.5 text-xs sm:text-xs text-muted">
              <i class="fa-solid fa-shield-halved text-sage text-xs"></i>
              <span>Evidence-based</span>
            </div>
            <div class="flex items-center gap-1.5 text-xs sm:text-xs text-muted">
              <i class="fa-solid fa-video text-sage text-xs"></i>
              <span>Telemedicine</span>
            </div>
            <div class="flex items-center gap-1.5 text-xs sm:text-xs text-muted">
              <i class="fa-solid fa-earth-europe text-sage text-xs"></i>
              <span>4 Languages</span>
            </div>
          </div>
        </div>

        <!-- Photo — desktop only, normal flow -->
        <div class="hero-fade hero-fade-0 hidden lg:flex lg:order-2 justify-center items-center">
          <div class="relative">
            <div class="absolute -inset-4 hero-blob bg-gradient-to-br from-sage/8 via-mauve/5 to-sage/8" />
            <div class="relative hero-blob w-[420px] h-[500px] xl:w-[460px] xl:h-[540px] overflow-hidden shadow-2xl shadow-charcoal/8">
              <picture>
                <source srcset="/mai2.webp" type="image/webp" />
                <img src="/mai2.png" alt="Dr. med. Mai Wald" class="w-full h-full object-cover" loading="eager" fetchpriority="high" />
              </picture>
            </div>

            <div class="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl shadow-charcoal/6 px-5 py-3.5 flex items-center gap-3 border border-stone/15">
              <div class="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                <i class="fa-solid fa-heart-pulse text-sage"></i>
              </div>
              <div>
                <p class="text-xs font-semibold text-charcoal">Darmgesundheit</p>
                <p class="text-[10px] text-muted">& Reizdarm-Spezialistin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
