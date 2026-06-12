<template>
  <div>
    <ClientOnly>
      <HeroPortal v-if="isLoggedIn" />
      <HeroSection v-else />
      <template #fallback>
        <HeroSection />
      </template>
    </ClientOnly>
    <WaveDivider fromColor="#F5F1EC" toColor="#2D3A24" :variant="3" />
    <TrustPillars />
    <WaveDivider fromColor="#2D3A24" toColor="#FFFFFF" :variant="4" />
    <StepsOverview />
    <WaveDivider fromColor="#FFFFFF" toColor="#FFFFFF" :variant="1" />
    <HealthConcerns />
    <WaveDivider fromColor="#FFFFFF" toColor="#EEF1EA" :variant="3" />
    <AboutPreview />
    <WaveDivider fromColor="#EEF1EA" toColor="#FFFFFF" :variant="4" />
    <FaqAccordion />
    <WaveDivider fromColor="#FFFFFF" toColor="#EEF1EA" :variant="2" />
    <FinalCTA />
  </div>
</template>

<script setup>
const { t } = useI18n()
const { isLoggedIn } = useAuth()

useHead({
  title: computed(() => t('meta.index.title')),
  meta: [
    { name: 'description', content: computed(() => t('meta.index.description')) },
    { property: 'og:title', content: computed(() => t('meta.index.og_title')) },
    { property: 'og:description', content: computed(() => t('meta.index.og_description')) },
  ],
})
</script>
