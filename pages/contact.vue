<template>
  <div>
    <section class="pt-32 md:pt-40">
      <ContactForm fullWidth bgClass="" />
    </section>
    <WaveDivider fromColor="#F5F1EC" toColor="#2D3A24" :variant="1" :height="80" />
    <NewsletterCTA />
    <WaveDivider fromColor="#2D3A24" toColor="#FFFFFF" :variant="2" :height="70" />
    <FaqAccordion />
  </div>
</template>

<script setup>
useHead({
  title: 'Kontakt & Termin — MaiHealth | Dr. med. Mai Wald',
  meta: [
    { name: 'description', content: 'Termin vereinbaren bei Dr. med. Mai Wald — MaiHealth. Erstgespräch, Telemedizin und persönliche Beratung für funktionelle Medizin & Reizdarm.' },
    { property: 'og:title', content: 'Kontakt & Termin — MaiHealth' },
    { property: 'og:description', content: 'Termin vereinbaren bei Dr. med. Mai Wald. Erstgespräch, Telemedizin und persönliche Beratung.' },
  ],
})
</script>
