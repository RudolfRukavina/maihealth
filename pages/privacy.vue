<template>
  <div>
    <section class="pt-32 md:pt-40 pb-16 md:pb-20">
      <div class="container-narrow">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-display-sm font-serif font-semibold text-charcoal mb-3">
            {{ $t('privacy.title') }}
          </h1>
          <p class="text-sm text-muted mb-10">
            {{ $t('privacy.meta.updated') }} {{ $t('privacy.meta.version') }}
          </p>

          <p class="text-body/80 leading-relaxed mb-10">{{ $t('privacy.intro') }}</p>

          <div class="space-y-10">
            <section v-for="(s, i) in sections" :key="i">
              <h2 class="text-lg md:text-xl font-serif font-semibold text-charcoal mb-3">
                {{ i + 1 }}. {{ s.heading }}
              </h2>
              <div class="space-y-3">
                <p v-for="(p, pi) in s.body" :key="pi" class="text-sm text-body/75 leading-relaxed">{{ p }}</p>
              </div>
              <ul v-if="s.items.length" class="mt-3 space-y-1.5">
                <li
                  v-for="(item, ii) in s.items"
                  :key="ii"
                  class="text-sm text-body/75 leading-relaxed pl-5 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-sage/40"
                >
                  {{ item }}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, tm, rt } = useI18n()

const sections = computed(() =>
  tm('privacy.sections').map((s) => ({
    heading: rt(s.heading),
    body: (s.body || []).map((p) => rt(p)),
    items: (s.items || []).map((item) => rt(item)),
  }))
)

useHead({
  title: computed(() => `${t('privacy.title')} — MaiHealth`),
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>
