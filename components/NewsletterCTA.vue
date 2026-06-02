<template>
  <section class="section-padding bg-charcoal relative overflow-hidden">
    <div class="absolute inset-0 hidden md:block">
      <div class="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-sage/5 blur-[100px]" />
      <div class="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-mauve/5 blur-[80px]" />
    </div>

    <div class="container-narrow relative z-10">
      <div class="max-w-2xl mx-auto text-center">
        <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cream/10 flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <i class="fa-solid fa-book-medical text-cream/60"></i>
        </div>

        <h2 class="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-cream mb-3 sm:mb-4">
          {{ $t('newsletter.title') }}
        </h2>
        <p class="text-sm sm:text-base text-cream/50 leading-relaxed mb-8 sm:mb-10">
          {{ $t('newsletter.subtitle') }}
        </p>

        <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            v-model="email"
            type="email"
            :placeholder="$t('newsletter.placeholder')"
            required
            class="flex-1 px-5 py-3.5 bg-white/8 border border-cream/12 rounded-full text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-cream/15 focus:border-cream/25 transition-all duration-200"
          />
          <button type="submit" class="px-7 py-3.5 bg-cream text-charcoal font-sans text-sm font-medium rounded-full hover:bg-white transition-colors duration-300 active:scale-[0.98] whitespace-nowrap flex items-center justify-center gap-2">
            <i class="fa-solid fa-paper-plane text-xs"></i>
            {{ $t('newsletter.cta') }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
const email = ref('')
const subscribe = () => { email.value = '' }
</script>
