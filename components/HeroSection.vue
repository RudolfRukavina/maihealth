<template>
  <section class="relative min-h-svh lg:min-h-screen lg:h-auto flex items-center overflow-hidden bg-cream">
    <div class="absolute inset-0 bg-gradient-to-br from-cream via-cream to-cream-dark/30" />
    <div class="absolute top-20 left-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-sage/[0.04] blur-[60px] md:blur-[100px]" />
    <div class="absolute bottom-20 right-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-mauve/[0.06] blur-[50px] md:blur-[80px]" />

    <div class="container-narrow relative z-10 pt-20 pb-6 sm:pt-28 sm:pb-16 md:py-0 h-full lg:h-auto flex flex-col justify-center">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

        <div class="max-w-xl text-left mx-auto lg:mx-0 lg:order-1">
          <h1 class="hero-fade hero-fade-1 text-4xl sm:text-5xl md:text-display-sm xl:text-display font-serif font-bold text-charcoal mb-5">
            {{ $t('hero.title_line1') }}<br>{{ $t('hero.title_line2') }}
          </h1>

          <p class="hero-fade hero-fade-2 text-base md:text-lg text-body/80 leading-relaxed mb-8">
            {{ $t('hero.subtitle') }}
          </p>

          <div class="hero-fade hero-fade-3 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <NuxtLink to="/book" class="btn-primary px-8 py-4 sm:px-9 text-base sm:text-sm justify-center">
              <i class="fa-regular fa-calendar-check text-sm"></i>
              {{ $t('hero.cta_book') }}
            </NuxtLink>
            <a href="#steps" class="btn-secondary px-8 py-4 sm:px-9 text-base sm:text-sm justify-center">
              {{ $t('hero.cta_learn') }}
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>

          <p class="hero-fade hero-fade-3 mt-5 flex items-center justify-center lg:justify-start gap-2 text-sm font-semibold text-sage">
            <i class="fa-solid fa-circle-check text-xs"></i>
            {{ $t('hero.free_first') }}
          </p>

          <div class="hero-fade hero-fade-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 sm:gap-x-6 mt-6 lg:mt-10 pt-5 lg:pt-8 border-t border-stone/30">
            <div class="flex items-center gap-1.5 text-xs text-muted whitespace-nowrap">
              <i class="fa-solid fa-shield-halved text-sage text-xs"></i>
              <span>{{ $t('hero.badges.evidence') }}</span>
            </div>
            <div class="flex items-center gap-1.5 text-xs text-muted whitespace-nowrap">
              <i class="fa-solid fa-video text-sage text-xs"></i>
              <span>{{ $t('hero.badges.telemedicine') }}</span>
            </div>
            <div class="flex items-center gap-1.5 text-xs text-muted whitespace-nowrap">
              <i class="fa-solid fa-heart text-sage text-xs"></i>
              <span>{{ $t('hero.badges.personal') }}</span>
            </div>
          </div>
        </div>

        <!-- Photo — on top on mobile, right column on desktop -->
        <div class="hero-fade hero-fade-0 flex order-first lg:order-2 justify-center items-center">
          <div class="relative">
            <div class="absolute -inset-4 hero-blob bg-gradient-to-br from-sage/8 via-mauve/5 to-sage/8" />
            <div class="relative hero-blob w-[200px] h-[240px] sm:w-[260px] sm:h-[320px] lg:w-[420px] lg:h-[500px] xl:w-[460px] xl:h-[540px] overflow-hidden shadow-2xl shadow-charcoal/8">
              <picture>
                <source media="(max-width: 639px)" srcset="/mai2-sm.webp" type="image/webp" />
                <source media="(max-width: 1023px)" srcset="/mai2-md.webp" type="image/webp" />
                <source srcset="/mai2.webp" type="image/webp" />
                <img src="/mai2.png" alt="Mai Jimenez" class="w-full h-full object-cover" loading="eager" fetchpriority="high" />
              </picture>
            </div>

            <div class="hidden sm:flex absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl shadow-charcoal/6 px-5 py-3.5 items-center gap-3 border border-stone/15">
              <div class="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                <i class="fa-solid fa-heart-pulse text-sage"></i>
              </div>
              <div>
                <p class="text-xs font-semibold text-charcoal">{{ $t('hero.badge_card.title') }}</p>
                <p class="text-[10px] text-muted">{{ $t('hero.badge_card.subtitle') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
