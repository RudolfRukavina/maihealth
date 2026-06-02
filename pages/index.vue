<template>
  <div>
    <HeroSection />
    <WaveDivider fromColor="#F5F1EC" toColor="#2D3A24" :variant="3" :height="70" />
    <TrustPillars />
    <WaveDivider fromColor="#2D3A24" toColor="#FFFFFF" :variant="4" :height="80" />
    <ServiceCards />
    <WaveDivider fromColor="#FFFFFF" toColor="#EEF1EA" :variant="1" :height="70" />
    <BenefitsList />
    <WaveDivider fromColor="#EEF1EA" toColor="#FFFFFF" :variant="2" :height="60" />
    <HealthConcerns />
    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="5" :height="70" />
    <FocusGrid />
    <WaveDivider fromColor="#F5F1EC" toColor="#EEF1EA" :variant="3" :height="60" />
    <AboutPreview />
    <WaveDivider fromColor="#EEF1EA" toColor="#F5F1EC" :variant="4" :height="70" />
    <ContactForm bgClass="bg-cream" />
    <WaveDivider fromColor="#F5F1EC" toColor="#2D3A24" :variant="1" :height="80" />
    <NewsletterCTA />
    <WaveDivider fromColor="#2D3A24" toColor="#FFFFFF" :variant="2" :height="70" />
    <FaqAccordion />
    <WaveDivider fromColor="#FFFFFF" toColor="#EEF1EA" :variant="3" :height="60" />
    <FinalCTA />
  </div>
</template>

<script setup>
useHead({
  title: 'Dr. Mai Jimenez — Functional Medicine & Longevity',
})
</script>
