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
            <div class="space-y-5 text-body/80 leading-relaxed text-base">
              <p v-for="(paragraph, i) in visibleStory" :key="i">{{ paragraph }}</p>
            </div>
            <button
              v-if="story.length > previewCount"
              @click="expanded = !expanded"
              class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-charcoal transition-colors duration-150"
            >
              {{ expanded ? $t('about.read_less') : $t('about.read_more') }}
              <i
                class="fa-solid fa-chevron-down text-xs transition-transform duration-200"
                :class="{ 'rotate-180': expanded }"
              ></i>
            </button>
          </div>

          <div class="lg:sticky lg:top-32">
            <div class="relative">
              <div class="aspect-[3/4] rounded-3xl overflow-hidden">
                <picture>
                  <source media="(max-width: 639px)" srcset="/mai2-sm.webp" type="image/webp" />
                  <source media="(max-width: 1023px)" srcset="/mai2-md.webp" type="image/webp" />
                  <source srcset="/mai2.webp" type="image/webp" />
                  <img src="/mai2.png" alt="Mai Jimenez" class="w-full h-full object-cover" loading="eager" />
                </picture>
              </div>
              <div class="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-sage/8 -z-10" />
              <div class="absolute -top-3 -left-3 w-14 h-14 rounded-full bg-mauve/10 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#FFFFFF" :variant="3" />

    <!-- Education & Experience -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <!-- Education -->
          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">{{ $t('about.education_label') }}</h3>
            <div class="space-y-5">
              <div v-for="item in education" :key="item.title" class="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-sage/30">
                <h4 class="text-base font-semibold text-charcoal">{{ item.title }}</h4>
                <p class="text-sm text-body/70 mt-1 leading-relaxed">{{ item.detail }}</p>
              </div>
            </div>
          </div>

          <!-- Experience -->
          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">{{ $t('about.experience_label') }}</h3>
            <div class="space-y-5">
              <div v-for="item in experience" :key="item" class="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-sage/30">
                <p class="text-base text-body">{{ item }}</p>
              </div>
            </div>
          </div>

          <!-- Specializations -->
          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">{{ $t('about.specializations_label') }}</h3>
            <div class="space-y-5">
              <div v-for="item in specializations" :key="item" class="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-sage/30">
                <p class="text-base text-body">{{ item }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#FFFFFF" toColor="#EEF1EA" :variant="1" />

    <FinalCTA />
  </div>
</template>

<script setup>
const { t, tm, rt } = useI18n()

useHead({
  title: computed(() => t('meta.about.title')),
  meta: [
    { name: 'description', content: computed(() => t('meta.about.description')) },
    { property: 'og:title', content: computed(() => t('meta.about.og_title')) },
    { property: 'og:description', content: computed(() => t('meta.about.og_description')) },
  ],
})

const education = computed(() => tm('about.education_items').map(e => ({ title: rt(e.title), detail: rt(e.detail) })))
const story = computed(() => tm('about.story').map(e => rt(e)))
const previewCount = 2
const expanded = ref(false)
const visibleStory = computed(() => expanded.value ? story.value : story.value.slice(0, previewCount))
const experience = computed(() => tm('about.experience_items').map(e => rt(e)))
const specializations = computed(() => tm('about.specialization_items').map(e => rt(e)))
</script>
