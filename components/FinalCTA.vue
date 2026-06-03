<template>
  <section class="section-padding relative overflow-hidden bg-sage-mist">
    <div class="absolute inset-0 hidden md:block">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sage/[0.04] blur-[100px]" />
    </div>

    <div class="container-narrow relative z-10">
      <div class="max-w-2xl mx-auto text-center">
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-5 sm:mb-7">
          <i class="fa-solid fa-heart-pulse text-lg sm:text-xl text-sage"></i>
        </div>

        <h2 class="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-charcoal text-balance mb-4 sm:mb-5">
          {{ $t('final_cta.title') }}
        </h2>
        <p class="text-base sm:text-base md:text-lg text-body/70 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
          {{ $t('final_cta.subtitle') }}
        </p>
        <div class="flex flex-col items-center gap-3">
          <NuxtLink to="/book" class="btn-primary text-sm sm:text-base px-8 py-3.5 sm:px-10 sm:py-4">
            {{ $t('final_cta.cta') }}
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
