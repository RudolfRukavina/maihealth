<template>
  <div>
    <section class="pt-32 md:pt-40 pb-16 md:pb-20">
      <div class="container-narrow">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-display-sm font-serif font-semibold text-charcoal mb-8">
            {{ $t('impressum.title') }}
          </h1>

          <div class="space-y-8">
            <section v-for="(s, i) in sections" :key="i">
              <h2 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-3">{{ s.heading }}</h2>
              <div class="space-y-1.5">
                <p
                  v-for="(line, li) in s.body"
                  :key="li"
                  class="text-sm text-body/80 leading-relaxed"
                  :class="{ 'text-amber-700 bg-amber-50 inline-block px-1.5 rounded': line.includes('[') }"
                >
                  {{ line }}
                </p>
              </div>
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
  tm('impressum.sections').map((s) => ({
    heading: rt(s.heading),
    body: (s.body || []).map((line) => rt(line)),
  }))
)

useHead({
  title: computed(() => `${t('impressum.title')} — MaiHealth`),
})
</script>
