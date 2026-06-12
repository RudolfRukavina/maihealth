<template>
  <div>
    <section class="pt-32 md:pt-40 pb-16 md:pb-20">
      <div class="container-narrow">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-display-sm font-serif font-semibold text-charcoal mb-8">
            {{ $t('impressum.title') }}
          </h1>
          <div class="prose prose-body text-body leading-relaxed space-y-6">
            <div class="bg-cream-dark/40 rounded-2xl p-6 md:p-8 border border-stone/20">
              <p class="text-sm text-body/70">{{ $t('impressum.content') }}</p>
            </div>

            <div class="space-y-4">
              <h2 class="text-lg font-serif font-semibold text-charcoal">Mai Jimenez</h2>
              <p class="text-sm text-body/70">MaiHealth</p>
              <a href="mailto:Mai.jimenez@gmx.de" class="text-sm text-body/70 hover:text-sage transition-colors">Mai.jimenez@gmx.de</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()

useHead({
  title: computed(() => `${t('impressum.title')} — MaiHealth`),
})
</script>
