<template>
  <section class="section-padding bg-sage-mist">
    <div class="container-narrow">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
        <!-- Image -->
        <div class="order-2 lg:order-1">
          <div class="relative max-w-sm mx-auto lg:max-w-none">
            <div class="aspect-[4/5] rounded-3xl overflow-hidden">
              <picture>
                <source media="(max-width: 639px)" srcset="/mai2-sm.webp" type="image/webp" />
                <source media="(max-width: 1023px)" srcset="/mai2-md.webp" type="image/webp" />
                <source srcset="/mai2.webp" type="image/webp" />
                <img src="/mai2.png" alt="Mai Jimenez" class="w-full h-full object-cover" loading="lazy" />
              </picture>
            </div>
            <div class="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-sage/8 -z-10" />
            <div class="absolute -top-3 -left-3 w-14 h-14 rounded-full bg-mauve/10 -z-10" />
          </div>
        </div>

        <!-- Text -->
        <div class="order-1 lg:order-2">
          <span class="section-label">{{ $t('about.label') }}</span>
          <h2 class="text-3xl sm:text-3xl md:text-4xl font-serif font-semibold text-charcoal mb-2">
            {{ $t('about.title') }}
          </h2>
          <p class="text-sm sm:text-base text-gold font-medium mb-5 sm:mb-7 flex items-center gap-2">
            <i class="fa-solid fa-stethoscope text-sm"></i>
            {{ $t('about.subtitle') }}
          </p>

          <p class="text-base sm:text-base text-body/80 leading-relaxed mb-6 sm:mb-8">
            {{ $t('about.bio') }}
          </p>

          <blockquote class="border-l-2 border-sage/30 pl-4 sm:pl-5 mb-7 sm:mb-9 py-1">
            <p class="text-sm sm:text-base font-serif italic text-charcoal/75 leading-relaxed">
              "{{ $t('about.philosophy') }}"
            </p>
          </blockquote>

          <NuxtLink to="/about" class="btn-secondary">
            {{ $t('about.cta') }}
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
