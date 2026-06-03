<template>
  <div>
    <HeroSection />
    <WaveDivider fromColor="#F5F1EC" toColor="#2D3A24" :variant="3" />
    <TrustPillars />
    <WaveDivider fromColor="#2D3A24" toColor="#FFFFFF" :variant="4" />
    <ServiceCards />
    <WaveDivider fromColor="#FFFFFF" toColor="#EEF1EA" :variant="1" />
    <BenefitsList />
    <WaveDivider fromColor="#EEF1EA" toColor="#FFFFFF" :variant="2" />
    <HealthConcerns />
    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="5" />
    <FocusGrid />
    <WaveDivider fromColor="#F5F1EC" toColor="#EEF1EA" :variant="3" />
    <AboutPreview />
    <WaveDivider fromColor="#EEF1EA" toColor="#F5F1EC" :variant="4" />
    <ContactForm bgClass="bg-cream" />
    <WaveDivider fromColor="#F5F1EC" toColor="#2D3A24" :variant="1" />
    <NewsletterCTA />
    <WaveDivider fromColor="#2D3A24" toColor="#FFFFFF" :variant="2" />
    <FaqAccordion />
    <WaveDivider fromColor="#FFFFFF" toColor="#EEF1EA" :variant="3" />
    <FinalCTA />
  </div>
</template>

<script setup>
useHead({
  title: 'MaiHealth — Dr. med. Mai Wald | Reizdarm verstehen. Leben verändern.',
  meta: [
    { name: 'description', content: 'Dr. med. Mai Wald — Spezialistin für Darmgesundheit & Reizdarm. Individuelle Darm-Diagnostik, Mikrobiom-Analyse und evidenzbasierte Therapie für nachhaltige Verdauungsgesundheit.' },
    { property: 'og:title', content: 'MaiHealth — Dr. med. Mai Wald | Reizdarm verstehen. Leben verändern.' },
    { property: 'og:description', content: 'Spezialistin für Darmgesundheit & Reizdarm. Individuelle Darm-Diagnostik, Mikrobiom-Analyse und evidenzbasierte Therapie.' },
  ],
})
</script>
